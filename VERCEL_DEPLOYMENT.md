# Vercel Deployment Guide

## Database Compatibility: ✅ COMPATIBLE

Your portfolio uses PostgreSQL which is fully compatible with Vercel's serverless environment.

## Prerequisites for Deployment

### 1. Setup Cloud Database (Choose ONE)

#### Option A: Vercel Postgres (Recommended) ⭐
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Create Postgres database
vercel postgres create
```
This will automatically configure your `DATABASE_URL` environment variable.

#### Option B: Supabase (Free Tier Available)
1. Go to https://supabase.com
2. Create new project
3. Wait for database to be ready
4. Go to Settings > Database
5. Copy the connection string (Connection Pooling recommended for serverless)
6. Format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

#### Option C: Neon (Serverless Postgres)
1. Go to https://neon.tech
2. Create new project
3. Copy the connection string
4. Format: `postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require`

#### Option D: Railway
1. Go to https://railway.app
2. Create new project
3. Add PostgreSQL database
4. Copy connection string from variables tab

### 2. Configure Vercel Environment Variables

Go to your Vercel project dashboard → Settings → Environment Variables and add:

```env
# Database (REQUIRED)
DATABASE_URL=postgresql://[your-cloud-database-connection-string]

# Firebase (REQUIRED for chat/guestbook features)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DB_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FIREBASE_CHAT_DB=chat

# Authentication (REQUIRED for login features)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_random_secret_key_here

# API Keys (Optional but recommended)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
WAKATIME_API_KEY=your_wakatime_api_key
OPENAI_API_KEY=your_openai_api_key
DEVTO_KEY=your_devto_key
CONTACT_FORM_API_KEY=your_contact_form_api_key
GITHUB_READ_USER_TOKEN_PERSONAL=your_github_token
BLOG_API_URL=https://your_blog_api_url
```

**Important Notes:**
- Set environment variables for all three environments: Production, Preview, and Development
- `NEXTAUTH_URL` should be your actual deployed domain
- `NEXTAUTH_SECRET` can be generated with: `openssl rand -base64 32`

### 3. Run Database Migration

After setting up your cloud database, you need to push your schema:

```bash
# Using your cloud DATABASE_URL
DATABASE_URL="your_cloud_database_url" npx prisma db push

# Or if you set it in .env.local
npx prisma db push
```

### 4. Seed Your Database (Optional)

```bash
# Seed with your projects data
DATABASE_URL="your_cloud_database_url" npm run seed
```

### 5. Deploy to Vercel

#### Method 1: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Import repository in Vercel dashboard
3. Vercel will automatically deploy on every push

#### Method 2: Vercel CLI
```bash
# Deploy to production
vercel --prod
```

## Deployment Checklist

- [ ] Cloud database created and accessible
- [ ] `DATABASE_URL` added to Vercel environment variables
- [ ] Database schema pushed to cloud database (`prisma db push`)
- [ ] Database seeded with initial data (optional)
- [ ] All required API keys configured
- [ ] Firebase configuration added
- [ ] Authentication providers configured
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] `NEXTAUTH_SECRET` generated and set
- [ ] Code pushed to GitHub or deployed via CLI
- [ ] Deployment successful in Vercel dashboard
- [ ] Test database operations on live site

## Troubleshooting

### Build Fails with Prisma Error
**Solution:** Make sure `postinstall` script is in package.json:
```json
"postinstall": "prisma generate"
```

### Database Connection Error
**Possible causes:**
1. `DATABASE_URL` not set in Vercel environment variables
2. Database not accessible from public internet
3. Wrong connection string format
4. Database credentials expired (some services rotate credentials)

**Solution:** 
- Verify environment variables in Vercel dashboard
- Test connection string locally first
- Check if database allows connections from anywhere (0.0.0.0/0)

### API Routes Timeout
**Solution:** 
- Use connection pooling (Supabase Pooler, Neon, etc.)
- Add `?connection_limit=1` to DATABASE_URL if using regular PostgreSQL
- Consider using Prisma Data Proxy for better connection management

### Prisma Client Not Found
**Solution:** Ensure your `vercel.json` includes the build command:
```json
{
  "buildCommand": "prisma generate && next build"
}
```

## Database Migration Strategy

### For Production Updates:
1. Test migrations locally first
2. Use Prisma Migrate for production:
   ```bash
   npx prisma migrate dev --name your_migration_name
   npx prisma migrate deploy
   ```
3. Or use `prisma db push` for prototyping (careful in production!)

## Performance Optimization

### Connection Pooling
For better performance with serverless functions, use connection pooling:

- **Supabase:** Use the pooler connection string (port 6543)
- **Neon:** Pooling enabled by default
- **Vercel Postgres:** Built-in connection pooling
- **Others:** Consider using PgBouncer or Prisma Data Proxy

### Prisma Connection
Your current setup is already optimized for serverless:
```typescript
// src/common/libs/prisma.ts
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Reuse connection in development
}
```

## Security Checklist

- [ ] Never commit `.env` or `.env.local` to git
- [ ] Use strong passwords for database
- [ ] Enable SSL for database connections
- [ ] Restrict database access to necessary IPs (if possible)
- [ ] Rotate API keys regularly
- [ ] Use different credentials for production vs development

## Cost Considerations

### Free Tiers Available:
- **Vercel Postgres:** 256 MB storage, 256 MB compute time
- **Supabase:** 500 MB database, 2 CPU hours
- **Neon:** 3 GB storage, 1 project
- **Railway:** $5 free credit monthly

Choose based on your expected traffic and storage needs.

## Next Steps After Deployment

1. Set up monitoring (Vercel Analytics)
2. Configure custom domain
3. Set up automated backups for database
4. Monitor serverless function execution times
5. Set up error tracking (Sentry, etc.)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Vercel function logs in dashboard
3. Test API routes individually
4. Verify database connection from Vercel IP

---

**Your database is ready for Vercel! 🚀**

