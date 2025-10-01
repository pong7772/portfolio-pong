# Vercel Postgres Setup Guide

## Step-by-Step Setup

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser for authentication.

### Step 3: Link Your Project

Navigate to your project directory and run:

```bash
cd "/Users/administrator/Documents/PXL University/web-site/final-portfolio/visothipong"
vercel link
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account/team
- **Link to existing project?** → If you already have a project, select it. Otherwise, create new.
- **What's your project's name?** → (your project name)
- **In which directory is your code located?** → ./

### Step 4: Create Vercel Postgres Database

```bash
vercel postgres create
```

Follow the prompts:
- **Database name:** → `portfolio-db` (or your preferred name)
- **Region:** → Choose closest to your users (e.g., `us-east-1`, `iad1`)

This will:
- ✅ Create a PostgreSQL database
- ✅ Automatically add `POSTGRES_*` environment variables to your project
- ✅ Set up connection pooling

### Step 5: Pull Environment Variables to Local

```bash
vercel env pull .env.local
```

This downloads all environment variables from Vercel to your local `.env.local` file.

### Step 6: Update DATABASE_URL in .env.local

After pulling env vars, open `.env.local` and you'll see Vercel Postgres variables. You need to construct your `DATABASE_URL`:

```env
# Vercel Postgres will add these:
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."

# Use POSTGRES_PRISMA_URL for Prisma
DATABASE_URL="${POSTGRES_PRISMA_URL}"
```

Or simply copy the `POSTGRES_PRISMA_URL` value to `DATABASE_URL`:

```env
DATABASE_URL="postgres://default:xxxxx@xxxxx-pooler.aws.neon.tech/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
```

### Step 7: Add Other Required Environment Variables

Add all your other API keys to `.env.local`:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_DB_URL="https://your_project.firebaseio.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef123456"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_FIREBASE_CHAT_DB="chat"

# Authentication
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_with_openssl_rand_base64_32"

# API Keys (Optional)
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
SPOTIFY_REFRESH_TOKEN="your_spotify_refresh_token"
WAKATIME_API_KEY="your_wakatime_api_key"
OPENAI_API_KEY="your_openai_api_key"
DEVTO_KEY="your_devto_key"
CONTACT_FORM_API_KEY="your_contact_form_api_key"
GITHUB_READ_USER_TOKEN_PERSONAL="your_github_token"
BLOG_API_URL="https://your_blog_api_url"
```

### Step 8: Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

### Step 9: Run Prisma Migration

Push your database schema to Vercel Postgres:

```bash
npx prisma generate
npx prisma db push
```

You should see:
```
Your database is now in sync with your schema.
✔ Generated Prisma Client
```

### Step 10: Seed Your Database (Optional)

```bash
npm run seed
```

This will populate your database with initial data from `scripts/seed.js`.

### Step 11: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and test:
- ✅ Projects page (loads from database)
- ✅ Blog views counting
- ✅ Guestbook (if configured)

### Step 12: Add Environment Variables to Vercel

For variables not automatically added (like Firebase, API keys):

**Option A: Via CLI**
```bash
# Add one by one
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY preview
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY development

# Or add from file
vercel env pull
```

**Option B: Via Dashboard** (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add each variable for all environments (Production, Preview, Development)

Required variables to add:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_DB_URL
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
NEXT_PUBLIC_FIREBASE_CHAT_DB
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_ID
GITHUB_SECRET
NEXTAUTH_URL (use your production URL: https://yourdomain.vercel.app)
NEXTAUTH_SECRET
SPOTIFY_CLIENT_ID (optional)
SPOTIFY_CLIENT_SECRET (optional)
SPOTIFY_REFRESH_TOKEN (optional)
WAKATIME_API_KEY (optional)
OPENAI_API_KEY (optional)
DEVTO_KEY (optional)
CONTACT_FORM_API_KEY (optional)
GITHUB_READ_USER_TOKEN_PERSONAL (optional)
BLOG_API_URL (optional)
```

### Step 13: Deploy to Vercel

```bash
vercel --prod
```

Or push to your GitHub repository if you have GitHub integration enabled.

## Vercel Postgres Management

### View Database Info
```bash
vercel postgres ls
```

### Connect to Database via CLI
```bash
vercel postgres connect
```

This opens a psql session where you can run SQL queries:
```sql
-- View tables
\dt

-- View projects
SELECT * FROM projects;

-- View content meta
SELECT * FROM contentmeta;

-- Exit
\q
```

### View Database Metrics
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Storage** tab
4. Click on your Postgres database
5. View metrics, logs, and settings

## Connection Pooling

Vercel Postgres automatically provides connection pooling via PgBouncer. Three connection strings are available:

1. **POSTGRES_PRISMA_URL** - Use this for Prisma (recommended)
   - Includes `?pgbouncer=true` parameter
   - Optimized for Prisma connection pooling

2. **POSTGRES_URL** - Standard pooled connection
   - For general use

3. **POSTGRES_URL_NON_POOLING** - Direct connection
   - For migrations and admin tasks
   - Use when you need transactions or specific PostgreSQL features

## Troubleshooting

### Issue: "Error: P1001: Can't reach database server"
**Solution:** Check if DATABASE_URL is correctly set in .env.local

### Issue: Prisma Client not generating
**Solution:**
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

### Issue: Schema push fails
**Solution:** Use the non-pooling URL for migrations:
```bash
DATABASE_URL="${POSTGRES_URL_NON_POOLING}" npx prisma db push
```

### Issue: Environment variables not updating
**Solution:**
```bash
# Clear cache and pull again
rm .env.local
vercel env pull .env.local
```

### Issue: Build fails on Vercel
**Solution:** Make sure Prisma generates during build. Your `package.json` should have:
```json
"postinstall": "prisma generate"
```

### Issue: Connection timeout
**Solution:** Vercel Postgres is optimized for serverless. Make sure you're using `POSTGRES_PRISMA_URL` and not creating too many connections.

## Database Limits (Vercel Postgres)

### Hobby (Free) Plan:
- 256 MB storage
- 256 MB compute time per month
- 60 hours of compute time
- Automatic backups
- Connection pooling included

### Pro Plan:
- 512 MB - 512 GB storage
- Higher compute time
- Point-in-time recovery
- Better performance

## Best Practices

1. **Always use POSTGRES_PRISMA_URL for Prisma** - It's optimized for connection pooling
2. **Close connections properly** - Your Prisma setup already handles this
3. **Use connection pooling** - Enabled by default
4. **Monitor usage** - Check Storage tab in Vercel dashboard
5. **Backup regularly** - Vercel handles this automatically, but export important data

## Backup Your Database

### Export data:
```bash
# Connect to database
vercel postgres connect

# Export to SQL (in psql)
\copy projects TO '/tmp/projects.csv' CSV HEADER;
\copy contentmeta TO '/tmp/contentmeta.csv' CSV HEADER;
```

### Or use pg_dump if you have the connection string:
```bash
pg_dump "${POSTGRES_URL_NON_POOLING}" > backup.sql
```

## Quick Reference Commands

```bash
# Setup
vercel login
vercel link
vercel postgres create
vercel env pull .env.local

# Database
npx prisma generate
npx prisma db push
npm run seed

# Deploy
vercel --prod

# Manage
vercel postgres ls
vercel postgres connect
vercel logs --follow
```

## Next Steps

After successful setup:
1. ✅ Test all features locally
2. ✅ Deploy to Vercel
3. ✅ Update NEXTAUTH_URL to production domain
4. ✅ Test production deployment
5. ✅ Set up custom domain (optional)
6. ✅ Enable Vercel Analytics (optional)
7. ✅ Set up monitoring/error tracking

---

**You're all set! 🚀**

Need help? Check:
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma + Vercel Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

