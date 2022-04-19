# Hacker News Owl

<img src="https://i.ibb.co/W0gCz21/hn-owl-avatar.png" height="90" width="90">

## Description

Share popular stories from Hacker News to Slack

## Build

You have to have nodejs installed before running following commands.

```bash
npm install
npm run build
```

The distribution packages will be stored in dist folder.

## Running application

Create and populate `.env` file with corresponding example values from `.env.example` file

```bash
# Node environment
NODE_ENV=production

# Storage type for holding current top news
# Available options: "memory" | "redis"
STORAGE_TYPE=redis

# Redis connection url
REDIS_URL=redis://127.0.0.1:6379

# Upvote treshold after which the story will be posted to slack channel
UPVOTE_TRESHOLD=500

# Refresh interval in minutes after which new stories will be fetched
REFRESH_INTERVAL_MINUTES=10

# Your hook url obtained from app registered in dedicated Slack workspace
# Stories will be posted to channel associated with this hook
HOOK_URL=https://hooks.slack.com/services/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
```

Run application with:

```bash
npm start
```
