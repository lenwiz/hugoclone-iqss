# IQSS Blog Bot

A Slack bot that publishes messages from `#iqss-cool-ideas-blog` to the IQSS Hugo blog when approved with a ✅ emoji.

## How It Works

1. IQSS members post in `#iqss-cool-ideas-blog` (private channel)
2. The original poster OR a designated moderator reacts with ✅
3. The bot creates a blog post file in the repo via GitHub API
4. GitHub Actions deploys the updated site (~2 minutes)
5. Removing ✅ removes the post from the blog

## Message Format

- **First line** = Blog post title
- **Remaining lines** = Blog post content

## Setup

### 1. Create Slack App

1. Go to https://api.slack.com/apps and create a new app
2. Enable **Socket Mode** (Settings > Socket Mode > Enable)
3. Add **Event Subscriptions** with these bot events:
   - `reaction_added`
   - `reaction_removed`
4. Add **OAuth Scopes** (OAuth & Permissions):
   - `channels:history`
   - `groups:history`
   - `reactions:read`
   - `users:read`
   - `chat:write`
5. Install the app to your workspace
6. Copy the Bot Token (`xoxb-...`), Signing Secret, and App Token (`xapp-...`)

### 2. Create GitHub Token

Create a Fine-Grained Personal Access Token or GitHub App with:
- Repository access: `lenwiz/hugoclone-iqss`
- Permissions: Contents (Read & Write)

### 3. Configure Environment

Copy `.env.example` to `.env` and fill in:
- `SLACK_BOT_TOKEN` - Bot User OAuth Token
- `SLACK_SIGNING_SECRET` - From app Basic Information
- `SLACK_APP_TOKEN` - App-Level Token (with `connections:write` scope)
- `SLACK_CHANNEL_ID` - The private channel ID
- `GITHUB_TOKEN` - GitHub token with repo contents write access
- `MODERATORS` - Comma-separated Slack user IDs of moderators

### 4. Deploy

```bash
cd slack-blog-bot
npm install
npm start
```

Deploy to Railway, Render, Fly.io, or any Node.js host (free tier works).

### 5. Invite Bot to Channel

In Slack: `/invite @iqss-blog-bot` in `#iqss-cool-ideas-blog`

## Access Control

- **Who can post in channel:** Anyone invited to the private channel
- **Who can publish to blog:** Original poster + designated moderators
- **Who can unpublish:** Same as publish (remove ✅ to remove post)

## Moderators

Add Slack user IDs to the `MODERATORS` env var. Find user IDs by clicking a user's profile > "..." > "Copy member ID".
