#!/bin/bash

# Portfolio Database Setup Script

echo "🚀 Setting up PostgreSQL database for Portfolio project..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed."
    echo "Please install PostgreSQL first:"
    echo "  brew install postgresql@15"
    echo "  brew services start postgresql@15"
    exit 1
fi

# Check if PostgreSQL service is running
if ! pgrep -x "postgres" > /dev/null; then
    echo "⚠️  PostgreSQL service is not running."
    echo "Starting PostgreSQL service..."
    brew services start postgresql@15
    sleep 3
fi

# Create database
echo "📦 Creating database 'portfolio_db'..."
createdb portfolio_db 2>/dev/null || echo "Database 'portfolio_db' already exists or creation failed."

# Create user (optional)
echo "👤 Creating user 'portfolio_user'..."
psql -d portfolio_db -c "CREATE USER portfolio_user WITH PASSWORD 'portfolio123';" 2>/dev/null || echo "User 'portfolio_user' already exists or creation failed."

# Grant permissions
echo "🔐 Granting permissions..."
psql -d portfolio_db -c "GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;" 2>/dev/null || echo "Permission grant failed or already exists."

echo "✅ Database setup complete!"
echo ""
echo "📝 Add these environment variables to your .env.local file:"
echo "DATABASE_URL=\"postgresql://portfolio_user:portfolio123@localhost:5432/portfolio_db\""
echo "DIRECT_URL=\"postgresql://portfolio_user:portfolio123@localhost:5432/portfolio_db\""
echo ""
echo "🔄 Run database migrations:"
echo "npx prisma db push"
