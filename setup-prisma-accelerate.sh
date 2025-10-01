#!/bin/bash

# Prisma Accelerate Setup Script
echo "🚀 Setting up Prisma Accelerate for Portfolio"
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    echo ""
    echo "Creating .env.local template..."
    
    cat > .env.local << 'EOF'
# ==================================
# PRISMA ACCELERATE DATABASE
# ==================================

# Accelerate URL (for queries)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19JMVFTYUlvNG9sMVE3RUdkcWdxVUIiLCJhcGlfa2V5IjoiMDFLNkZOTlBWNTIxVlRFNzNaVFoxOE5FODAiLCJ0ZW5hbnRfaWQiOiJhNjZkZjkwNDQ3YzhkOWNiNTMxYjFmMmNmYjYzN2UxMjdjMDg4NzM4ZjVkNmJkMjRhYjAwZWI3ZTllYjA0MmJmIiwiaW50ZXJuYWxfc2VjcmV0IjoiMDE0ODM0ZDctMWNlOC00N2Q5LTk2YzgtNzg5YWY1YzYzYWI5In0.M9-k8y6W8sD2b9DBlfxlGO-qiVQ0I8VcGIVMzr7x_aI"

# Direct URL (for migrations)
DIRECT_URL="postgres://a66df90447c8d9cb531b1f2cfb637e127c088738f5d6bd24ab00eb7e9eb042bf:sk_I1QSaIo4ol1Q7EGdqgqUB@db.prisma.io:5432/postgres?sslmode=require"

# ==================================
# AUTHENTICATION
# ==================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""

# ==================================
# FIREBASE
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
EOF

    echo -e "${GREEN}✅ Created .env.local${NC}"
    echo ""
else
    echo -e "${GREEN}✅ .env.local already exists${NC}"
    echo ""
fi

# Generate NEXTAUTH_SECRET
echo "Step 1: Generate NEXTAUTH_SECRET"
echo "---------------------------------"
SECRET=$(openssl rand -base64 32)
echo "Generated: $SECRET"
echo ""
echo "Add this to your .env.local:"
echo "NEXTAUTH_SECRET=\"$SECRET\""
echo ""
read -p "Press Enter to continue..."

# Check environment variables
echo ""
echo "Step 2: Verify Environment Variables"
echo "-------------------------------------"
if grep -q "DATABASE_URL.*prisma+postgres" .env.local && grep -q "DIRECT_URL.*postgres://" .env.local; then
    echo -e "${GREEN}✅ Database URLs configured${NC}"
else
    echo -e "${RED}❌ Database URLs not properly configured${NC}"
    echo "Please update DATABASE_URL and DIRECT_URL in .env.local"
    exit 1
fi

# Install dependencies
echo ""
echo "Step 3: Install Dependencies"
echo "-----------------------------"
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
else
    echo "Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Dependencies installed${NC}"
    else
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
fi

# Generate Prisma Client
echo ""
echo "Step 4: Generate Prisma Client"
echo "-------------------------------"
npx prisma generate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prisma client generated${NC}"
else
    echo -e "${RED}❌ Failed to generate Prisma client${NC}"
    exit 1
fi

# Push database schema
echo ""
echo "Step 5: Push Database Schema"
echo "-----------------------------"
npx prisma db push
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database schema pushed${NC}"
else
    echo -e "${RED}❌ Failed to push database schema${NC}"
    echo "Make sure DATABASE_URL and DIRECT_URL are correct in .env.local"
    exit 1
fi

# Seed database
echo ""
echo "Step 6: Seed Database (Optional)"
echo "---------------------------------"
read -p "Do you want to seed the database? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run seed
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database seeded${NC}"
    else
        echo -e "${YELLOW}⚠️  Seeding failed or no seed script${NC}"
    fi
fi

# Summary
echo ""
echo "=============================================="
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=============================================="
echo ""
echo "✅ Prisma Accelerate configured"
echo "✅ Database schema created"
echo "✅ Ready for development"
echo ""
echo "Next steps:"
echo "1. Add remaining API keys to .env.local"
echo "2. Start dev server: npm run dev"
echo "3. Visit: http://localhost:3000"
echo ""
echo "For deployment to Vercel, see: PRISMA_ACCELERATE_SETUP.md"
echo ""

read -p "Do you want to start the development server? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run dev
fi

