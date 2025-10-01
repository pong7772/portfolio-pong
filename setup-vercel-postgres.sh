#!/bin/bash

# Vercel Postgres Setup Script for Portfolio
# This script automates the setup process

echo "🚀 Vercel Postgres Setup for Portfolio"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI is not installed.${NC}"
    echo "Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Vercel CLI${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
else
    echo -e "${GREEN}✅ Vercel CLI is already installed${NC}"
fi

echo ""
echo "Step 1: Login to Vercel"
echo "-----------------------"
vercel login

echo ""
echo "Step 2: Link Project to Vercel"
echo "--------------------------------"
vercel link

echo ""
echo "Step 3: Create Vercel Postgres Database"
echo "----------------------------------------"
echo "You will be prompted to:"
echo "  - Enter a database name (e.g., portfolio-db)"
echo "  - Select a region (choose closest to your users)"
echo ""
read -p "Press Enter to continue..."
vercel postgres create

echo ""
echo "Step 4: Pull Environment Variables"
echo "-----------------------------------"
vercel env pull .env.local

if [ -f .env.local ]; then
    echo -e "${GREEN}✅ Environment variables pulled to .env.local${NC}"
    
    # Check if DATABASE_URL exists
    if grep -q "POSTGRES_PRISMA_URL" .env.local; then
        echo ""
        echo -e "${YELLOW}⚠️  Please update your .env.local file:${NC}"
        echo "Add this line (copy the value from POSTGRES_PRISMA_URL):"
        echo ""
        echo "DATABASE_URL=\${POSTGRES_PRISMA_URL}"
        echo ""
        echo "Or copy the full URL value from POSTGRES_PRISMA_URL to DATABASE_URL"
        echo ""
    fi
else
    echo -e "${RED}❌ Failed to pull environment variables${NC}"
    exit 1
fi

echo ""
echo "Step 5: Generate NEXTAUTH_SECRET"
echo "---------------------------------"
SECRET=$(openssl rand -base64 32)
echo "Generated NEXTAUTH_SECRET: $SECRET"
echo ""
echo "Add this to your .env.local:"
echo "NEXTAUTH_SECRET=\"$SECRET\""
echo ""

echo ""
echo "Step 6: Add Required Environment Variables"
echo "-------------------------------------------"
echo "Please add the following variables to your .env.local file:"
echo ""
echo "# Firebase Configuration"
echo "NEXT_PUBLIC_FIREBASE_API_KEY=\"\""
echo "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=\"\""
echo "NEXT_PUBLIC_FIREBASE_DB_URL=\"\""
echo "NEXT_PUBLIC_FIREBASE_PROJECT_ID=\"\""
echo "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=\"\""
echo "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=\"\""
echo "NEXT_PUBLIC_FIREBASE_APP_ID=\"\""
echo "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=\"\""
echo "NEXT_PUBLIC_FIREBASE_CHAT_DB=\"chat\""
echo ""
echo "# Authentication"
echo "GOOGLE_CLIENT_ID=\"\""
echo "GOOGLE_CLIENT_SECRET=\"\""
echo "GITHUB_ID=\"\""
echo "GITHUB_SECRET=\"\""
echo "NEXTAUTH_URL=\"http://localhost:3000\""
echo "NEXTAUTH_SECRET=\"$SECRET\""
echo ""
echo "# Optional API Keys"
echo "SPOTIFY_CLIENT_ID=\"\""
echo "SPOTIFY_CLIENT_SECRET=\"\""
echo "SPOTIFY_REFRESH_TOKEN=\"\""
echo "WAKATIME_API_KEY=\"\""
echo "OPENAI_API_KEY=\"\""
echo "DEVTO_KEY=\"\""
echo "CONTACT_FORM_API_KEY=\"\""
echo "GITHUB_READ_USER_TOKEN_PERSONAL=\"\""
echo "BLOG_API_URL=\"\""
echo ""

read -p "Press Enter after you've updated .env.local with your values..."

echo ""
echo "Step 7: Generate Prisma Client"
echo "-------------------------------"
npx prisma generate

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prisma client generated${NC}"
else
    echo -e "${RED}❌ Failed to generate Prisma client${NC}"
    exit 1
fi

echo ""
echo "Step 8: Push Database Schema"
echo "-----------------------------"
npx prisma db push

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database schema pushed successfully${NC}"
else
    echo -e "${RED}❌ Failed to push database schema${NC}"
    echo "Make sure DATABASE_URL is correctly set in .env.local"
    exit 1
fi

echo ""
echo "Step 9: Seed Database (Optional)"
echo "---------------------------------"
read -p "Do you want to seed the database with initial data? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run seed
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Database seeded successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Database seeding failed or no seed script available${NC}"
    fi
fi

echo ""
echo "Step 10: Test Local Development"
echo "--------------------------------"
echo "Starting development server..."
echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Test your app locally: npm run dev"
echo "2. Add remaining environment variables to Vercel dashboard"
echo "3. Deploy: vercel --prod"
echo ""
echo "Visit: http://localhost:3000"
echo ""
echo "For deployment instructions, see: VERCEL_POSTGRES_SETUP.md"
echo ""

read -p "Do you want to start the development server now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run dev
fi

