#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏔️  Setting up The Mountain Whisper Full-Stack Application${NC}"
echo "=================================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker is not installed. You'll need to set up PostgreSQL manually.${NC}"
    DOCKER_AVAILABLE=false
else
    DOCKER_AVAILABLE=true
fi

# Install root dependencies
echo -e "${BLUE}📦 Installing root dependencies...${NC}"
npm install

# Build shared package
echo -e "${BLUE}🔧 Building shared package...${NC}"
cd packages/shared
npm run build
cd ../..

# Install and build frontend
echo -e "${BLUE}🎨 Setting up frontend...${NC}"
cd apps/frontend
npm install
cd ../..

# Install backend dependencies
echo -e "${BLUE}⚙️  Setting up backend...${NC}"
cd apps/backend
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}📝 Creating backend environment file...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit apps/backend/.env with your configuration${NC}"
fi

# Start database if Docker is available
if [ "$DOCKER_AVAILABLE" = true ]; then
    echo -e "${BLUE}🐳 Starting development database...${NC}"
    cd ../..
    docker-compose -f docker-compose.dev.yml up -d postgres redis
    
    # Wait for database to be ready
    echo -e "${BLUE}⏳ Waiting for database to be ready...${NC}"
    sleep 10
    
    # Generate Prisma client and run migrations
    cd apps/backend
    echo -e "${BLUE}🗄️  Setting up database schema...${NC}"
    npm run prisma:generate
    npm run prisma:migrate
    npm run seed
    
    echo -e "${GREEN}✅ Database setup complete!${NC}"
else
    echo -e "${YELLOW}⚠️  Please set up PostgreSQL manually and update the DATABASE_URL in apps/backend/.env${NC}"
    echo -e "${YELLOW}   Then run: cd apps/backend && npm run prisma:generate && npm run prisma:migrate && npm run seed${NC}"
fi

cd ../..

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo -e "${BLUE}To start development:${NC}"
echo -e "  ${YELLOW}npm run dev${NC}                 # Start both frontend and backend"
echo ""
echo -e "${BLUE}Individual commands:${NC}"
echo -e "  ${YELLOW}npm run dev:frontend${NC}        # Start frontend only (http://localhost:5173)"
echo -e "  ${YELLOW}npm run dev:backend${NC}         # Start backend only (http://localhost:3001)"
echo ""
echo -e "${BLUE}Useful URLs:${NC}"
echo -e "  Frontend:      ${YELLOW}http://localhost:5173${NC}"
echo -e "  Backend API:   ${YELLOW}http://localhost:3001/api/v1${NC}"
echo -e "  API Docs:      ${YELLOW}http://localhost:3001/api/docs${NC}"
if [ "$DOCKER_AVAILABLE" = true ]; then
    echo -e "  Database UI:   ${YELLOW}http://localhost:8080${NC} (Adminer)"
fi
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}" 