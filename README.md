# 🏔️ The Mountain Whisper

A full-stack Nepal travel platform built with modern technologies. Plan your perfect trip to Nepal with comprehensive tour packages, destination guides, and seamless booking experience.

## 🚀 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **ShadCN UI** for component library
- **React Router** for navigation
- **React Query** for data fetching
- **React Hook Form** with Zod validation

### Backend

- **NestJS** framework with TypeScript
- **Prisma** ORM with PostgreSQL
- **JWT** authentication
- **Swagger** API documentation
- **Stripe** for payments
- **Nodemailer** for emails
- **Redis** for caching (optional)

### Infrastructure

- **Docker** & Docker Compose
- **PostgreSQL** database
- **Redis** for caching
- **Nginx** for production (optional)

## 📁 Project Structure

```
the-mountain-whisper/
├── apps/
│   ├── frontend/          # React frontend application
│   └── backend/           # NestJS backend API
├── packages/
│   └── shared/            # Shared types, schemas, and utilities
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
└── package.json           # Root package.json with workspace scripts
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+
- **Docker** and Docker Compose (recommended)
- **PostgreSQL** 15+ (if not using Docker)

### Option 1: Quick Start with Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd the-mountain-whisper
   ```

2. **Start development environment**

   ```bash
   # Start PostgreSQL and Redis
   npm run docker:dev

   # Install dependencies
   npm install

   # Generate Prisma client and run migrations
   cd apps/backend
   npm run prisma:generate
   npm run prisma:migrate
   npm run seed

   # Start development servers
   cd ../..
   npm run dev
   ```

3. **Access the applications**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api/v1
   - API Documentation: http://localhost:3001/api/docs
   - Database UI (Adminer): http://localhost:8080

### Option 2: Manual Setup

1. **Clone and install dependencies**

   ```bash
   git clone <repository-url>
   cd the-mountain-whisper
   npm install
   ```

2. **Set up PostgreSQL database**

   ```bash
   # Create database
   createdb mountain_whisper_dev
   ```

3. **Configure environment variables**

   ```bash
   # Backend
   cd apps/backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Set up database**

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run seed
   ```

5. **Start development servers**
   ```bash
   cd ../..
   npm run dev
   ```

## 📝 Available Scripts

### Root Level

```bash
npm run dev              # Start both frontend and backend in development
npm run build            # Build all applications
npm run lint             # Lint all applications
npm run test             # Run all tests
npm run clean            # Clean all node_modules
npm run docker:dev       # Start development Docker services
npm run docker:build     # Build production Docker images
npm run docker:prod      # Start production environment
```

### Frontend (apps/frontend)

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking
```

### Backend (apps/backend)

```bash
npm run start:dev        # Start in development mode
npm run start:prod       # Start in production mode
npm run build            # Build the application
npm run lint             # Run ESLint
npm run test             # Run unit tests
npm run test:e2e         # Run end-to-end tests
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run seed             # Seed database with sample data
```

### Shared Package (packages/shared)

```bash
npm run build            # Build shared package
npm run dev              # Watch mode for development
npm run lint             # Run ESLint
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users** - User accounts and authentication
- **Tours** - Tour packages and details
- **Destinations** - Travel destinations
- **Bookings** - Tour bookings and reservations
- **Payments** - Payment processing and history
- **Reviews** - User reviews and ratings
- **Newsletter** - Email subscriptions
- **Contact Messages** - Contact form submissions

## 🔐 Authentication

The application uses JWT-based authentication with:

- Access tokens (15 minutes)
- Refresh tokens (7 days)
- Role-based authorization (User, Guide, Admin, Super Admin)
- Password hashing with bcrypt

## 💳 Payment Integration

Integrated with Stripe for secure payment processing:

- Credit/debit card payments
- Webhook handling for payment events
- Refund support
- Multi-currency support

## 📧 Email System

Email functionality using Nodemailer:

- Welcome emails
- Booking confirmations
- Payment receipts
- Password reset
- Newsletter campaigns

## 🔧 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mountain_whisper_db"

# JWT
JWT_SECRET="your-secret-key"
JWT_REFRESH_SECRET="your-refresh-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### Frontend (.env)

```env
VITE_API_URL="http://localhost:3001/api/v1"
```

## 🚀 Deployment

### Docker Production Deployment

1. **Build and start production containers**

   ```bash
   npm run docker:build
   npm run docker:prod
   ```

2. **Set up environment variables**
   - Create `.env` files for production
   - Configure database, JWT secrets, Stripe keys, etc.

3. **Run database migrations**
   ```bash
   docker exec -it mountain-whisper-backend npm run prisma:migrate
   ```

### Manual Production Deployment

1. **Build applications**

   ```bash
   npm run build
   ```

2. **Set up production database**

   ```bash
   cd apps/backend
   npm run prisma:migrate
   ```

3. **Start production servers**

   ```bash
   # Backend
   cd apps/backend
   npm run start:prod

   # Frontend (serve with nginx or similar)
   cd apps/frontend
   # Serve dist/ directory
   ```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Backend tests
cd apps/backend
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e

# Frontend tests
cd apps/frontend
npm run test
```

## 📚 API Documentation

When running in development mode, Swagger documentation is available at:
http://localhost:3001/api/docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@themountainwhisper.com or create an issue in the repository.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing backend framework
- [React](https://reactjs.org/) for the frontend library
- [Prisma](https://prisma.io/) for the excellent ORM
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com/) for the beautiful component library
