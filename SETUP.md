# Portfolio Project Setup Guide

## 1. Database Setup (PostgreSQL)

### Option A: Install PostgreSQL via Homebrew
```bash
# First, accept Xcode license (run this in Terminal manually)
sudo xcodebuild -license accept

# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database
createdb portfolio_db

# Create user (optional)
psql -d portfolio_db -c "CREATE USER portfolio_user WITH PASSWORD 'your_password';"
psql -d portfolio_db -c "GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;"
```

### Option B: Use Docker (Recommended)
```bash
# Run PostgreSQL in Docker
docker run --name portfolio-postgres \
  -e POSTGRES_DB=portfolio_db \
  -e POSTGRES_USER=portfolio_user \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15

# Connect to verify
docker exec -it portfolio-postgres psql -U portfolio_user -d portfolio_db
```

### Option C: Use Supabase (Cloud)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get the database URL from Settings > Database
4. Use the provided connection string

## 2. Environment Variables Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://portfolio_user:your_password@localhost:5432/portfolio_db"
DIRECT_URL="postgresql://portfolio_user:your_password@localhost:5432/portfolio_db"

# Firebase Configuration (Get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_DB_URL="https://your_project.firebaseio.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef123456"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_FIREBASE_CHAT_DB="chat"

# Authentication (Get from respective developer consoles)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_random_secret_key_here"

# API Keys
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
SPOTIFY_REFRESH_TOKEN="your_spotify_refresh_token"
WAKATIME_API_KEY="your_wakatime_api_key"
OPENAI_API_KEY="your_openai_api_key"
DEVTO_KEY="your_devto_key"
CONTACT_FORM_API_KEY="your_contact_form_api_key"

# GitHub
GITHUB_READ_USER_TOKEN_PERSONAL="your_github_token"

# Blog
BLOG_API_URL="https://your_blog_api_url"
```

## 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication and Firestore Database
4. Go to Project Settings > General > Your apps
5. Add a web app and copy the config values
6. Update the Firebase environment variables in `.env.local`

## 4. API Keys Setup

### Spotify API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Get Client ID and Client Secret
4. Generate a refresh token using the authorization flow

### GitHub API
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with appropriate permissions
3. For OAuth: Go to Developer settings > OAuth Apps

### OpenAI API
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an API key in the API Keys section

### WakaTime API
1. Go to [WakaTime Settings](https://wakatime.com/settings/account)
2. Copy your API key

## 5. Database Migration

After setting up the database and environment variables:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

## 6. Start Development Server

```bash
yarn dev
```

## Troubleshooting

### Spotify API Errors
The current errors are due to missing Spotify credentials. Either:
1. Configure the Spotify environment variables
2. Or disable Spotify features temporarily by commenting out the API calls

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Verify database exists and user has permissions

### Firebase Errors
- Verify Firebase project configuration
- Check if Authentication and Firestore are enabled
- Ensure environment variables match Firebase config
