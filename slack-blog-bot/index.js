require('dotenv').config();
const { App } = require('@slack/bolt');
const { Octokit } = require('octokit');

// Configuration
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID; // #iqss-cool-ideas-blog channel ID
const PUBLISH_EMOJI = 'white_check_mark'; // ✅
const MODERATORS = (process.env.MODERATORS || '').split(',').map(s => s.trim());
const GITHUB_REPO_OWNER = 'lenwiz';
const GITHUB_REPO_NAME = 'hugoclone-iqss';

// Queue to serialize GitHub operations (prevents SHA conflicts)
const operationQueue = [];
let processing = false;

async function enqueue(fn) {
  return new Promise((resolve, reject) => {
    operationQueue.push({ fn, resolve, reject });
    processQueue();
  });
}

async function processQueue() {
  if (processing) return;
  processing = true;
  while (operationQueue.length > 0) {
    const { fn, resolve, reject } = operationQueue.shift();
    try {
      const result = await fn();
      resolve(result);
    } catch (err) {
      reject(err);
    }
    // Small delay between operations to let GitHub propagate
    await new Promise(r => setTimeout(r, 2000));
  }
  processing = false;
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// Helper: Check if user is authorized to publish (OP or moderator)
async function isAuthorized(userId, messageUserId) {
  if (userId === messageUserId) return true; // Original poster
  if (MODERATORS.includes(userId)) return true; // Designated moderator
  return false;
}

// Helper: Generate slug from text
function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/-$/, '');
}

// Helper: Get user display name
async function getUserName(userId) {
  try {
    const result = await app.client.users.info({ user: userId });
    return result.user.real_name || result.user.name;
  } catch { return 'IQSS Staff'; }
}

// Helper: Format date with time
function formatDate(ts) {
  const date = new Date(parseFloat(ts) * 1000);
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${hours}:${minutes} ${ampm}`;
}

// Helper: Create or update blog post file via GitHub API
async function createBlogPost(title, content, author, date, slug, isoDate) {
  const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${isoDate || new Date().toISOString()}
draft: false
layout: "blog-post"
post_date: "${date}"
author: "${author}"
comment_count: 0
---

${content}
`;

  const path = `content/blog-posts/${slug}.md`;

  // Check if file exists
  let sha;
  try {
    const existing = await octokit.rest.repos.getContent({
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      path,
    });
    sha = existing.data.sha;
  } catch { /* file doesn't exist */ }

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: GITHUB_REPO_OWNER,
    repo: GITHUB_REPO_NAME,
    path,
    message: `Blog post: ${title}`,
    content: Buffer.from(fileContent).toString('base64'),
    sha,
  });
}

// Helper: Delete blog post file
async function deleteBlogPost(slug) {
  const path = `content/blog-posts/${slug}.md`;
  try {
    const existing = await octokit.rest.repos.getContent({
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      path,
    });
    await octokit.rest.repos.deleteFile({
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      path,
      message: `Remove blog post: ${slug}`,
      sha: existing.data.sha,
    });
  } catch { /* file doesn't exist */ }
}

// Handle ALL reactions for debugging
app.event('reaction_added', async ({ event }) => {
  console.log(`[DEBUG] reaction_added: emoji=${event.reaction}, channel=${event.item.channel}, expected_channel=${CHANNEL_ID}, expected_emoji=${PUBLISH_EMOJI}`);
  if (event.reaction !== PUBLISH_EMOJI) return;
  if (event.item.channel !== CHANNEL_ID) return;
  console.log('[DEBUG] Passed filters - queuing operation');

  await enqueue(async () => {
  console.log('[DEBUG] Processing reaction (from queue)');

  try {
    // Get the message that was reacted to
    console.log('[DEBUG] Fetching message at ts:', event.item.ts);

    let message;

    // First try conversations.history (works for top-level messages)
    const result = await app.client.conversations.history({
      channel: event.item.channel,
      latest: event.item.ts,
      inclusive: true,
      limit: 1,
    });

    if (result.messages[0] && result.messages[0].ts === event.item.ts) {
      // Direct hit - this is a top-level message
      message = result.messages[0];
    } else {
      // Not found in channel history - must be a thread reply
      // Get recent messages to find which thread this reply belongs to
      const recentMessages = await app.client.conversations.history({
        channel: event.item.channel,
        limit: 20,
      });

      // Search each thread for the reacted message
      for (const msg of recentMessages.messages) {
        if (msg.reply_count > 0 || msg.thread_ts) {
          const threadResult = await app.client.conversations.replies({
            channel: event.item.channel,
            ts: msg.ts,
          });
          const found = threadResult.messages.find(m => m.ts === event.item.ts);
          if (found) {
            message = found;
            break;
          }
        }
      }
    }

    console.log('[DEBUG] Message found:', !!message, 'text:', message?.text?.slice(0, 50), 'ts:', message?.ts, 'thread_ts:', message?.thread_ts);
    if (!message) return;

    // Check authorization
    console.log('[DEBUG] Checking auth: reactor=', event.user, 'message_author=', message.user);
    const authorized = await isAuthorized(event.user, message.user);
    console.log('[DEBUG] Authorized:', authorized);
    if (!authorized) {
      await app.client.chat.postEphemeral({
        channel: event.item.channel,
        user: event.user,
        text: '⚠️ Only the original poster or a moderator can publish posts to the blog.',
      });
      return;
    }

    const author = await getUserName(message.user);
    const date = formatDate(message.ts);
    const text = message.text || '';

    // Use first line as title (brief synopsis), rest as content
    // If the message is short (one line), use it as both title and content
    const lines = text.split('\n');
    const title = lines[0].slice(0, 100) || 'Untitled Post';
    const content = lines.length > 1 ? lines.slice(1).join('\n').trim() : text;
    const slug = slugify(title) || `post-${Date.now()}`;
    const isoDate = new Date(parseFloat(message.ts) * 1000).toISOString();

    console.log('[DEBUG] title:', title, 'slug:', slug, 'thread_ts:', message.thread_ts, 'item.ts:', event.item.ts);

    // Check if this is a thread reply
    if (message.thread_ts && event.item.ts !== message.thread_ts) {
      console.log('[DEBUG] This is a thread reply');
      // This is a reply - get parent message to find the post slug
      const parentResult = await app.client.conversations.history({
        channel: event.item.channel,
        latest: message.thread_ts,
        inclusive: true,
        limit: 1,
      });
      const parentMessage = parentResult.messages[0];
      console.log('[DEBUG] Parent message text:', parentMessage?.text?.slice(0, 50));
      if (!parentMessage) return;

      const parentTitle = (parentMessage.text || '').split('\n')[0].slice(0, 100) || 'Untitled Post';
      const parentSlug = slugify(parentTitle) || `post-${message.thread_ts}`;
      const path = `content/blog-posts/${parentSlug}.md`;
      console.log('[DEBUG] Parent title:', parentTitle, 'slug:', parentSlug, 'path:', path);

      // Get existing file content
      console.log('[DEBUG] Looking for parent post file:', path);
      try {
        const existing = await octokit.rest.repos.getContent({
          owner: GITHUB_REPO_OWNER,
          repo: GITHUB_REPO_NAME,
          path,
        });
        console.log('[DEBUG] Found parent file, appending reply');

        const currentContent = Buffer.from(existing.data.content, 'base64').toString('utf8');

        // Append the reply as a comment
        const replyAuthor = await getUserName(message.user);
        const replyDate = formatDate(message.ts);
        const replyText = text;
        const commentBlock = `\n\n---\n\n<div class="blog-post-meta">${replyDate} · ${replyAuthor}</div>\n\n${replyText}\n`;

        const updatedContent = currentContent + commentBlock;

        // Update comment count in frontmatter
        const countMatch = updatedContent.match(/comment_count: (\d+)/);
        const currentCount = countMatch ? parseInt(countMatch[1]) : 0;
        let finalContent = updatedContent.replace(/comment_count: \d+/, `comment_count: ${currentCount + 1}`);

        // Retry with fresh SHA if conflict (handles rapid successive reactions)
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            if (attempt > 0) {
              // Re-fetch to get fresh SHA and content
              const fresh = await octokit.rest.repos.getContent({
                owner: GITHUB_REPO_OWNER,
                repo: GITHUB_REPO_NAME,
                path,
              });
              const freshContent = Buffer.from(fresh.data.content, 'base64').toString('utf8');
              const freshUpdated = freshContent + commentBlock;
              const freshCount = (freshUpdated.match(/comment_count: (\d+)/) || [, '0'])[1];
              finalContent = freshUpdated.replace(/comment_count: \d+/, `comment_count: ${parseInt(freshCount) + 1}`);
              existing = fresh;
            }
            await octokit.rest.repos.createOrUpdateFileContents({
              owner: GITHUB_REPO_OWNER,
              repo: GITHUB_REPO_NAME,
              path,
              message: `Reply by ${replyAuthor} on: ${parentTitle}`,
              content: Buffer.from(finalContent).toString('base64'),
              sha: existing.data.sha,
            });
            console.log('[DEBUG] Reply committed successfully');
            break;
          } catch (commitErr) {
            if (commitErr.status === 409 && attempt < 2) {
              console.log('[DEBUG] SHA conflict, retrying...');
              await new Promise(r => setTimeout(r, 1000));
            } else {
              console.error('[DEBUG] Commit failed:', commitErr.message, commitErr.status);
              break;
            }
          }
        }

        await app.client.chat.postEphemeral({
          channel: event.item.channel,
          user: event.user,
          text: `✅ Reply published to blog post "${parentTitle}"`,
        });
      } catch (err) {
        console.error('Error appending reply:', err.message, err.status);
        await app.client.chat.postEphemeral({
          channel: event.item.channel,
          user: event.user,
          text: `⚠️ Could not add reply. Make sure the parent post has ✅ first. (Error: ${err.message})`,
        });
      }
      return;
    }

    console.log('[DEBUG] Creating blog post:', slug);
    await createBlogPost(title, content, author, date, slug, isoDate);
    console.log('[DEBUG] Blog post created successfully');

    await app.client.chat.postEphemeral({
      channel: event.item.channel,
      user: event.user,
      text: `✅ Published to blog: "${title}"\nIt will appear on the site in ~2 minutes after deploy.`,
    });

  } catch (error) {
    console.error('Error publishing post:', error);
  }
  }); // end enqueue
});

// Handle ✅ reaction removed (unpublish)
app.event('reaction_removed', async ({ event }) => {
  console.log(`[DEBUG] reaction_removed: emoji=${event.reaction}, channel=${event.item.channel}`);
  if (event.reaction !== PUBLISH_EMOJI) return;
  if (event.item.channel !== CHANNEL_ID) return;
  console.log('[DEBUG] Queuing reaction removal');

  await enqueue(async () => {
  console.log('[DEBUG] Processing reaction removal (from queue)');

  try {
    const result = await app.client.conversations.history({
      channel: event.item.channel,
      latest: event.item.ts,
      inclusive: true,
      limit: 1,
    });

    const message = result.messages[0];
    if (!message) return;

    const authorized = await isAuthorized(event.user, message.user);
    if (!authorized) return;

    const text = message.text || '';
    const title = text.split('\n')[0].slice(0, 100) || 'Untitled Post';
    const slug = slugify(title) || `post-${Date.now()}`;

    await deleteBlogPost(slug);

    await app.client.chat.postEphemeral({
      channel: event.item.channel,
      user: event.user,
      text: `🗑️ Removed from blog: "${title}"`,
    });

  } catch (error) {
    console.error('Error removing post:', error);
  }
  }); // end enqueue
});

// Start the app
(async () => {
  await app.start();
  console.log('⚡️ IQSS Blog Bot is running!');
})();
