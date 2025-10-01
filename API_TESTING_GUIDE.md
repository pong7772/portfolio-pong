# API Testing Guide

## 🚀 Current API Status

Your APIs are running and accessible! Here's how to test them:

## 📡 Available APIs

### 1. **Spotify APIs** ✅ Working (with graceful error handling)
```bash
# Test Spotify Now Playing
curl http://localhost:3000/api/now-playing
# Returns: null (when not configured)

# Test Available Devices
curl http://localhost:3000/api/available-devices
# Returns: [] (when not configured)
```

### 2. **Blog API** ⚠️ Needs Configuration
```bash
# Test Blog API
curl "http://localhost:3000/api/blog?page=1&per_page=4"
# Returns: {"status":false,"error":{}} (needs BLOG_API_URL)
```

### 3. **Projects API** ⚠️ Needs Database
```bash
# Test Projects API
curl http://localhost:3000/api/projects
# Returns: PrismaClientInitializationError (needs DATABASE_URL)
```

### 4. **Views API** ⚠️ Needs Database
```bash
# Test Views API
curl http://localhost:3000/api/views
# Returns: "Failed to fetch content meta" (needs DATABASE_URL)
```

## 🔧 How to Test APIs

### Method 1: Using curl (Command Line)
```bash
# Basic test
curl http://localhost:3000/api/now-playing

# With pretty formatting (if you have jq installed)
curl -s http://localhost:3000/api/now-playing | jq .

# Test with parameters
curl "http://localhost:3000/api/blog?page=1&per_page=4"
```

### Method 2: Using Browser
Simply visit these URLs in your browser:
- http://localhost:3000/api/now-playing
- http://localhost:3000/api/available-devices
- http://localhost:3000/api/blog?page=1&per_page=4
- http://localhost:3000/api/projects

### Method 3: Using Postman or Insomnia
Create requests to test the APIs with different parameters.

### Method 4: Using JavaScript (in browser console)
```javascript
// Test APIs from browser console
fetch('/api/now-playing')
  .then(response => response.json())
  .then(data => console.log('Now Playing:', data));

fetch('/api/available-devices')
  .then(response => response.json())
  .then(data => console.log('Devices:', data));
```

## 🛠️ Configuration Steps

### 1. **Set up Database (Required for Projects & Views APIs)**
```bash
# Run the database setup script
./setup-database.sh

# Or manually:
createdb portfolio_db
psql -d portfolio_db -c "CREATE USER portfolio_user WITH PASSWORD 'portfolio123';"
psql -d portfolio_db -c "GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;"
```

### 2. **Update .env.local with Database URL**
```env
DATABASE_URL="postgresql://portfolio_user:portfolio123@localhost:5432/portfolio_db"
DIRECT_URL="postgresql://portfolio_user:portfolio123@localhost:5432/portfolio_db"
```

### 3. **Run Database Migrations**
```bash
npx prisma db push
```

### 4. **Configure Optional APIs**

#### Spotify API (for music widget)
```env
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
SPOTIFY_REFRESH_TOKEN="your_spotify_refresh_token"
```

#### GitHub API (for dashboard)
```env
GITHUB_READ_USER_TOKEN_PERSONAL="your_github_token"
```

#### Blog API (for external blog)
```env
BLOG_API_URL="https://your_blog_api_url"
```

## 🧪 Testing Different Scenarios

### Test with Database Connected
```bash
# After setting up database and running migrations
curl http://localhost:3000/api/projects
# Should return: {"status":true,"data":[...]}

curl http://localhost:3000/api/views
# Should return: {"status":true,"data":[...]}
```

### Test with Spotify Configured
```bash
# After adding Spotify credentials to .env.local
curl http://localhost:3000/api/now-playing
# Should return: {"isPlaying":true,"data":{...}} or {"isPlaying":false,"data":null}

curl http://localhost:3000/api/available-devices
# Should return: [{"name":"Device Name","is_active":true,...}]
```

### Test Error Handling
```bash
# Test with invalid parameters
curl "http://localhost:3000/api/blog?page=999&per_page=0"
# Should return appropriate error response
```

## 📊 API Response Examples

### Working Spotify API Response
```json
{
  "isPlaying": true,
  "data": {
    "title": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "albumImageUrl": "https://...",
    "songUrl": "https://open.spotify.com/track/..."
  }
}
```

### Working Projects API Response
```json
{
  "status": true,
  "data": [
    {
      "id": 1,
      "title": "Project Title",
      "slug": "project-slug",
      "description": "Project description",
      "image": "project-image.jpg",
      "stacks": "React, Next.js, TypeScript",
      "is_featured": true
    }
  ]
}
```

## 🚨 Common Issues & Solutions

### Issue: PrismaClientInitializationError
**Solution**: Set up DATABASE_URL in .env.local and run `npx prisma db push`

### Issue: 401 Unauthorized (GitHub API)
**Solution**: Add GITHUB_READ_USER_TOKEN_PERSONAL to .env.local

### Issue: Firebase duplicate app error
**Solution**: Already fixed! The Firebase initialization now handles duplicate apps gracefully.

### Issue: Spotify 400 Bad Request
**Solution**: Add proper Spotify credentials to .env.local

## 🔍 Debugging Tips

1. **Check server logs** - Look at your terminal running `yarn dev`
2. **Check environment variables** - Make sure .env.local is in the project root
3. **Restart server** - After changing .env.local, restart with `yarn dev`
4. **Test incrementally** - Start with database setup, then add other APIs

## 📝 Next Steps

1. Set up PostgreSQL database using `./setup-database.sh`
2. Update .env.local with DATABASE_URL
3. Run `npx prisma db push`
4. Test APIs again - they should work properly!
5. Optionally configure Spotify, GitHub, and other APIs for full functionality
