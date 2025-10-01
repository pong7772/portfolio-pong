# Prisma Accelerate Setup Guide

Perfect! You've created a Prisma Accelerate database. This is an excellent choice for Vercel deployment as it provides:
- ✅ Connection pooling (essential for serverless)
- ✅ Global caching
- ✅ Better performance
- ✅ Works perfectly with Vercel

## ✅ What I've Updated

1. **`prisma/schema.prisma`** - Added `directUrl` configuration

## 🔧 Environment Variables Setup

Create a `.env.local` file in your project root with these values:

```env
# ==================================
# PRISMA ACCELERATE DATABASE
# ==================================

# Accelerate URL (for queries - with connection pooling and caching)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19JMVFTYUlvNG9sMVE3RUdkcWdxVUIiLCJhcGlfa2V5IjoiMDFLNkZOTlBWNTIxVlRFNzNaVFoxOE5FODAiLCJ0ZW5hbnRfaWQiOiJhNjZkZjkwNDQ3YzhkOWNiNTMxYjFmMmNmYjYzN2UxMjdjMDg4NzM4ZjVkNmJkMjRhYjAwZWI3ZTllYjA0MmJmIiwiaW50ZXJuYWxfc2VjcmV0IjoiMDE0ODM0ZDctMWNlOC00N2Q5LTk2YzgtNzg5YWY1YzYzYWI5In0.M9-k8y6W8sD2b9DBlfxlGO-qiVQ0I8VcGIVMzr7x_aI"

# Direct URL (for migrations and schema changes)
DIRECT_URL="postgres://a66df90447c8d9cb531b1f2cfb637e127c088738f5d6bd24ab00eb7e9eb042bf:sk_I1QSaIo4ol1Q7EGdqgqUB@db.prisma.io:5432/postgres?sslmode=require"

# ==================================
# AUTHENTICATION (Required)
# ==================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<generate-with-command-below>"

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# GitHub OAuth
GITHUB_ID=""
GITHUB_SECRET=""

# ==================================
# FIREBASE (Required for chat/guestbook)
# ==================================
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_DB_URL=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""
NEXT_PUBLIC_FIREBASE_CHAT_DB="chat"

# ==================================
# OPTIONAL API KEYS
# ==================================
SPOTIFY_CLIENT_ID=""
SPOTIFY_CLIENT_SECRET=""
SPOTIFY_REFRESH_TOKEN=""
WAKATIME_API_KEY=""
OPENAI_API_KEY=""
DEVTO_KEY=""
CONTACT_FORM_API_KEY=""
GITHUB_READ_USER_TOKEN_PERSONAL=""
BLOG_API_URL=""
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET` value.

## 🚀 Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Push Database Schema

This uses the `DIRECT_URL` for migrations:

```bash
npx prisma db push
```

You should see:
```
✔ Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client
```

### 4. Seed Database (Optional)

```bash
npm run seed
```

### 5. Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- Projects page
- Blog views
- Database operations

## 📤 Deploy to Vercel

### Step 1: Push to GitHub (if not already done)

```bash
git add .
git commit -m "Configure Prisma Accelerate"
git push
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import your GitHub repository
4. Don't deploy yet - add environment variables first

### Step 3: Add Environment Variables to Vercel

Go to **Settings** → **Environment Variables** and add:

**Database (Required):**
```
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19JMVFTYUlvNG9sMVE3RUdkcWdxVUIiLCJhcGlfa2V5IjoiMDFLNkZOTlBWNTIxVlRFNzNaVFoxOE5FODAiLCJ0ZW5hbnRfaWQiOiJhNjZkZjkwNDQ3YzhkOWNiNTMxYjFmMmNmYjYzN2UxMjdjMDg4NzM4ZjVkNmJkMjRhYjAwZWI3ZTllYjA0MmJmIiwiaW50ZXJuYWxfc2VjcmV0IjoiMDE0ODM0ZDctMWNlOC00N2Q5LTk2YzgtNzg5YWY1YzYzYWI5In0.M9-k8y6W8sD2b9DBlfxlGO-qiVQ0I8VcGIVMzr7x_aI

DIRECT_URL=postgres://a66df90447c8d9cb531b1f2cfb637e127c088738f5d6bd24ab00eb7e9eb042bf:sk_I1QSaIo4ol1Q7EGdqgqUB@db.prisma.io:5432/postgres?sslmode=require
```

**Authentication (Required):**
```
NEXTAUTH_URL=https://yourdomain.vercel.app
NEXTAUTH_SECRET=<your-generated-secret>
GOOGLE_CLIENT_ID=<your-value>
GOOGLE_CLIENT_SECRET=<your-value>
GITHUB_ID=<your-value>
GITHUB_SECRET=<your-value>
```

**Firebase (Required for chat/guestbook):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=<your-value>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-value>
NEXT_PUBLIC_FIREBASE_DB_URL=<your-value>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-value>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-value>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-value>
NEXT_PUBLIC_FIREBASE_APP_ID=<your-value>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<your-value>
NEXT_PUBLIC_FIREBASE_CHAT_DB=chat
```

**Optional API Keys:**
Add Spotify, WakaTime, OpenAI, etc. as needed

**Important:** Select all environments (Production, Preview, Development) for each variable.

### Step 4: Deploy

Click "Deploy" in Vercel dashboard or push to GitHub to trigger deployment.

## ✅ Verification Checklist

- [ ] `.env.local` file created with all required variables
- [ ] `NEXTAUTH_SECRET` generated and added
- [ ] `npx prisma generate` completed successfully
- [ ] `npx prisma db push` completed successfully
- [ ] Database seeded (optional)
- [ ] Local development works (`npm run dev`)
- [ ] All environment variables added to Vercel
- [ ] Deployed to Vercel
- [ ] Production site is live
- [ ] Database operations work on production

## 🔍 Understanding Your Setup

### DATABASE_URL (Prisma Accelerate)
```
prisma+postgres://accelerate.prisma-data.net/?api_key=...
```
- Used for all queries and mutations
- Goes through Prisma Accelerate for connection pooling
- Includes caching for better performance
- Perfect for serverless functions

### DIRECT_URL (Direct Database)
```
postgres://...@db.prisma.io:5432/postgres?sslmode=require
```
- Used only for migrations and schema changes
- Direct connection to your database
- Required for `prisma db push` and `prisma migrate`

## 🎯 Why Prisma Accelerate is Great for Vercel

1. **Connection Pooling** - Prevents "too many connections" errors in serverless
2. **Global Edge Caching** - Faster queries worldwide
3. **Automatic Scaling** - Handles traffic spikes
4. **No Cold Starts** - Always-on connection pool
5. **Works with Vercel** - Optimized for serverless deployments

## 🛠️ Common Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes
npx prisma db push

# View database in Prisma Studio
npx prisma studio

# Check schema for issues
npx prisma validate

# Format schema
npx prisma format
```

## 🚨 Troubleshooting

### Error: "Can't reach database server"
**Solution:** Check that `DIRECT_URL` is set correctly in `.env.local`

### Error: "API key is invalid"
**Solution:** Make sure your `DATABASE_URL` includes the correct Prisma Accelerate API key

### Migrations not working
**Solution:** Migrations require `DIRECT_URL`. Make sure it's set:
```bash
npx prisma db push
```

### Build fails on Vercel
**Solution:** Ensure both `DATABASE_URL` and `DIRECT_URL` are in Vercel environment variables

### Slow queries
**Solution:** Prisma Accelerate caches queries. First query might be slower, subsequent ones are fast.

## 📊 Monitoring Your Database

1. **Prisma Data Platform:** https://console.prisma.io
   - View query performance
   - Check cache hit rates
   - Monitor connection usage
   - View logs

2. **Vercel Logs:**
   ```bash
   vercel logs --follow
   ```

## 🔐 Security Notes

- ✅ Never commit `.env.local` to Git (already in `.gitignore`)
- ✅ Keep your API keys secure
- ✅ Rotate API keys if compromised
- ✅ Use different credentials for production vs development
- ✅ Review Prisma Data Platform logs regularly

## 💰 Pricing

**Prisma Accelerate Free Tier:**
- 1 GB of data transfer per month
- 10,000 cache hits per month
- Perfect for personal projects and testing

**Vercel Free Tier:**
- Serverless Functions
- Edge Network
- Automatic deployments

## 🎉 Next Steps

1. Add remaining API keys (Firebase, OAuth, etc.)
2. Test all features locally
3. Deploy to Vercel
4. Configure OAuth redirect URLs for production
5. Add custom domain (optional)
6. Enable analytics and monitoring

---

**Your database is ready for production! 🚀**

You're using Prisma Accelerate which is perfect for Vercel's serverless architecture.

