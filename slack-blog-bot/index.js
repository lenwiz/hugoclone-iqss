require('dotenv').config();
const { App } = require('@slack/bolt');
const { Octokit } = require('octokit');

// Configuration
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID; // #iqss-cool-ideas-blog channel ID
const PUBLISH_EMOJI = 'white_check_mark'; // ✅
const MODERATORS = (process.env.MODERATORS || '').split(',').map(s => s.trim());
const GITHUB_REPO_OWNER = 'lenwiz';
const GITHUB_REPO_NAME = 'hugoclone-iqss';

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

// Helper: Format date
function formatDate(ts) {
  const date = new Date(parseFloat(ts) * 1000);
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Helper: Create or update blog post file via GitHub API
async function createBlogPost(title, content, author, date, slug) {
  const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${new Date().toISOString().split('T')[0]}
draft: false
layout: "blog-post"
post_date: "${date}"
author: "${author}"
category: "Uncategorized"
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

// Handle ✅ reaction added
app.event('reaction_added', async ({ event }) => {
  if (event.reaction !== PUBLISH_EMOJI) return;
  if (event.item.channel !== CHANNEL_ID) return;

  try {
    // Get the message that was reacted to
    const result = await app.client.conversations.history({
      channel: event.item.channel,
      latest: event.item.ts,
      inclusive: true,
      limit: 1,
    });

    const message = result.messages[0];
    if (!message) return;

    // Check authorization
    const authorized = await isAuthorized(event.user, message.user);
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

    // Use first line as title, rest as content
    const lines = text.split('\n');
    const title = lines[0].slice(0, 100) || 'Untitled Post';
    const content = lines.slice(1).join('\n').trim() || title;
    const slug = slugify(title) || `post-${Date.now()}`;

    // Check if this is a thread reply
    if (message.thread_ts && event.item.ts !== message.thread_ts) {
      // This is a reply - get parent message to find the post slug
      const parentResult = await app.client.conversations.history({
        channel: event.item.channel,
        latest: message.thread_ts,
        inclusive: true,
        limit: 1,
      });
      const parentMessage = parentResult.messages[0];
      if (!parentMessage) return;

      const parentTitle = (parentMessage.text || '').split('\n')[0].slice(0, 100) || 'Untitled Post';
      const parentSlug = slugify(parentTitle) || `post-${message.thread_ts}`;
      const path = `content/blog-posts/${parentSlug}.md`;

      // Get existing file content
      try {
        const existing = await octokit.rest.repos.getContent({
          owner: GITHUB_REPO_OWNER,
          repo: GITHUB_REPO_NAME,
          path,
        });

        const currentContent = Buffer.from(existing.data.content, 'base64').toString('utf8');

        // Append the reply as a comment
        const replyAuthor = await getUserName(message.user);
        const replyDate = formatDate(message.ts);
        const replyText = text;
        const commentBlock = `\n\n---\n\n**${replyAuthor}** · ${replyDate}\n\n${replyText}\n`;

        const updatedContent = currentContent + commentBlock;

        // Update comment count in frontmatter
        const countMatch = updatedContent.match(/comment_count: (\d+)/);
        const currentCount = countMatch ? parseInt(countMatch[1]) : 0;
        const finalContent = updatedContent.replace(/comment_count: \d+/, `comment_count: ${currentCount + 1}`);

        await octokit.rest.repos.createOrUpdateFileContents({
          owner: GITHUB_REPO_OWNER,
          repo: GITHUB_REPO_NAME,
          path,
          message: `Reply by ${replyAuthor} on: ${parentTitle}`,
          content: Buffer.from(finalContent).toString('base64'),
          sha: existing.data.sha,
        });

        await app.client.chat.postEphemeral({
          channel: event.item.channel,
          user: event.user,
          text: `✅ Reply published to blog post "${parentTitle}"`,
        });
      } catch (err) {
        console.error('Error appending reply:', err);
        await app.client.chat.postEphemeral({
          channel: event.item.channel,
          user: event.user,
          text: `⚠️ Could not find parent blog post to add reply to.`,
        });
      }
      return;
    }

    await createBlogPost(title, content, author, date, slug);

    await app.client.chat.postEphemeral({
      channel: event.item.channel,
      user: event.user,
      text: `✅ Published to blog: "${title}"\nIt will appear on the site in ~2 minutes after deploy.`,
    });

  } catch (error) {
    console.error('Error publishing post:', error);
  }
});

// Handle ✅ reaction removed (unpublish)
app.event('reaction_removed', async ({ event }) => {
  if (event.reaction !== PUBLISH_EMOJI) return;
  if (event.item.channel !== CHANNEL_ID) return;

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
});

// Start the app
(async () => {
  await app.start();
  console.log('⚡️ IQSS Blog Bot is running!');
})();
