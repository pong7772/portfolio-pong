# Dev.to Blog Integration Setup

Your portfolio has been updated to use Dev.to instead of WordPress for blog posts!

## Step 1: Create Dev.to Account

1. Go to [https://dev.to](https://dev.to)
2. Sign up or log in
3. Write and publish articles on Dev.to

## Step 2: Get Your Dev.to API Key

1. Go to [https://dev.to/settings/extensions](https://dev.to/settings/extensions)
2. Scroll down to "DEV Community API Keys"
3. Click "Generate API Key"
4. Give it a name (e.g., "Portfolio Integration")
5. Copy the API key

## Step 3: Update Environment Variables

Add these to your `.env.local` file:

```env
# ==================================
# DEV.TO BLOG CONFIGURATION
# ==================================
DEVTO_USERNAME="your_devto_username"
DEVTO_API_KEY="your_api_key_here"
```

**Example:**
```env
DEVTO_USERNAME="johnsmith"
DEVTO_API_KEY="AbCdEfGhIjKlMnOpQrStUvWxYz123456"
```

## Step 4: Update Vercel Environment Variables

Add the same variables to your Vercel project:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `DEVTO_USERNAME` = your Dev.to username
   - `DEVTO_API_KEY` = your Dev.to API key
5. Deploy

## How It Works

- **Fetching Articles**: Your portfolio automatically fetches all published articles from your Dev.to profile
- **No Database Needed**: Articles are fetched directly from Dev.to's API
- **Real-time Updates**: When you publish on Dev.to, it appears on your portfolio (may have caching delay)

## How to Post Articles

### Method 1: Dev.to Web Interface
1. Go to [https://dev.to/new](https://dev.to/new)
2. Write your article using Markdown
3. Add a cover image
4. Add tags
5. Click "Publish"

### Method 2: Dev.to Editor
1. Click "Write a post" on Dev.to
2. Use their rich editor or Markdown mode
3. Preview and publish

## Article Structure

Your articles will automatically include:
- **Title**: Article title
- **Cover Image**: Featured image
- **Content**: Full markdown content
- **Tags**: Categories/tags
- **Stats**: Reactions count (shown as views)
- **Published Date**: When you published on Dev.to

## Testing

After setting up:

1. Add your `DEVTO_USERNAME` and `DEVTO_API_KEY` to `.env.local`
2. Restart your dev server: `yarn dev`
3. Visit `http://localhost:3000/blog`
4. Your Dev.to articles should appear!

## Tips

- **Public Articles Only**: Only published public articles will show
- **API Rate Limits**: Dev.to has rate limits (be mindful with frequent requests)
- **Caching**: Your portfolio caches responses for 60 seconds
- **No API Key Needed for Public**: If you only set `DEVTO_USERNAME` (without API key), it will still work for public articles

## Troubleshooting

**No articles showing?**
- Check your username is correct
- Ensure you have published articles on Dev.to
- Check browser console for errors

**API errors?**
- Verify API key is correct
- Check Vercel environment variables are set
- Ensure API key hasn't expired

## What Changed?

The blog service (`src/services/blog.ts`) now:
- Fetches from `https://dev.to/api/articles`
- Transforms Dev.to article format to match your portfolio's structure
- Supports pagination, search (by tags), and filtering

Enjoy your new Dev.to integration! 🎉

