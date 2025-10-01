# 🚀 Quick Start: Deploy to Vercel with Postgres

## Automated Setup (Recommended)

Run the automated setup script:

```bash
./setup-vercel-postgres.sh
```

This script will:
- ✅ Install Vercel CLI (if needed)
- ✅ Login to Vercel
- ✅ Link your project
- ✅ Create Postgres database
- ✅ Pull environment variables
- ✅ Generate NEXTAUTH_SECRET
- ✅ Setup Prisma and database schema
- ✅ Optional database seeding

---

## Manual Setup (Alternative)

### 1. Install and Login (2 minutes)

```bash
npm install -g vercel
vercel login
```

### 2. Link Project and Create Database (3 minutes)

```bash
vercel link
vercel postgres create
```

Choose a database name (e.g., `portfolio-db`) and select your preferred region.

### 3. Pull Environment Variables (1 minute)

```bash
vercel env pull .env.local
```

### 4. Configure DATABASE_URL

Open `.env.local` and add/update:

```env
DATABASE_URL="${POSTGRES_PRISMA_URL}"
```

Or copy the full value from `POSTGRES_PRISMA_URL` to `DATABASE_URL`.

### 5. Add Required Environment Variables

Copy from `env.example` to `.env.local` and fill in your values:

**Minimum Required:**
```env
NEXTAUTH_SECRET="generate_with_openssl_rand_base64_32"
NEXTAUTH_URL="http://localhost:3000"
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

**For Full Functionality:**
- Firebase config (chat/guestbook)
- Google OAuth (authentication)
- GitHub OAuth (authentication)
- Other API keys as needed

See `env.example` for all options.

### 6. Setup Database (2 minutes)

```bash
npx prisma generate
npx prisma db push
npm run seed  # Optional: seed with initial data
```

### 7. Test Locally (1 minute)

```bash
npm run dev
```

Visit http://localhost:3000 and verify everything works.

### 8. Deploy to Vercel (2 minutes)

```bash
vercel --prod
```

Or push to GitHub if you have automatic deployments enabled.

---

## Post-Deployment Checklist

After deploying, add environment variables to Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables for all environments:

**Critical:**
- `NEXTAUTH_SECRET` - Same value from local
- `NEXTAUTH_URL` - Your production URL (https://yourdomain.vercel.app)
- `NEXT_PUBLIC_FIREBASE_*` - All Firebase config variables
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID` & `GITHUB_SECRET`

**Optional:**
- Spotify, WakaTime, OpenAI, etc. (for those features)

---

## Verify Database Connection

Check if your database is working:

```bash
# Connect via CLI
vercel postgres connect

# In psql, run:
\dt  # List tables
SELECT * FROM projects;  # View projects
\q  # Exit
```

Or visit your deployed site and test:
- Projects page
- Blog views counter
- Guestbook (if configured)

---

## Common Issues & Quick Fixes

### Database Connection Error
```bash
# Make sure DATABASE_URL is set
cat .env.local | grep DATABASE_URL

# Try pulling env vars again
vercel env pull .env.local
```

### Prisma Client Issues
```bash
# Regenerate client
rm -rf node_modules/.prisma
npx prisma generate
```

### Build Fails on Vercel
- Ensure `postinstall` script exists in `package.json` ✅ (already there)
- Check environment variables in Vercel dashboard
- Review build logs in Vercel

### Schema Changes Not Applying
```bash
# Use non-pooling URL for migrations
DATABASE_URL="${POSTGRES_URL_NON_POOLING}" npx prisma db push
```

---

## Useful Commands

```bash
# View databases
vercel postgres ls

# Connect to database
vercel postgres connect

# View logs
vercel logs --follow

# Pull latest env vars
vercel env pull

# Deploy
vercel --prod

# Redeploy (force new deployment)
vercel --prod --force
```

---

## Next Steps

1. ✅ Test all features on production
2. ✅ Set up custom domain (optional)
3. ✅ Enable Vercel Analytics
4. ✅ Configure OAuth redirect URLs for production domain
5. ✅ Update Firebase authorized domains
6. ✅ Set up monitoring/error tracking

---

## Need More Help?

- **Detailed Guide:** See `VERCEL_POSTGRES_SETUP.md`
- **Full Deployment Guide:** See `VERCEL_DEPLOYMENT.md`
- **Vercel Docs:** https://vercel.com/docs/storage/vercel-postgres
- **Prisma Docs:** https://www.prisma.io/docs

---

## Time Estimate

- **Automated Setup:** ~10 minutes
- **Manual Setup:** ~15 minutes
- **Full Deployment with Configuration:** ~30 minutes

**You're ready to deploy! 🎉**

