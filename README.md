# 🚀 Visothipong Portfolio

A modern, full-featured portfolio website built with Next.js, showcasing my work as a Full-Stack Developer and EdTech Innovator. This portfolio includes a blog system, project showcase, photo stories, community chat, and an admin dashboard for content management.

## ✨ Features

### 🎨 Core Features
- **Responsive Design** - Fully responsive across all devices
- **Dark/Light Mode** - Modern theme toggle with smooth animations
- **Blog System** - Full-featured blog with rich text editor, categories, and tags
- **Project Showcase** - Display projects with images, tech stacks, and links
- **Photo Stories** - Instagram-style story viewer with image galleries
- **Community Chat** - Interactive guestbook/chat system
- **Admin Dashboard** - Content management system for blogs, stories, and projects
- **SEO Optimized** - Comprehensive SEO with Open Graph and Twitter Cards
- **Background Music** - Optional background music with user preference

### 🛠️ Technical Features
- **Rich Text Editor** - GitHub-style markdown shortcuts support
- **Image Galleries** - Multiple image uploads with gallery navigation
- **Comment System** - Backend comment system with moderation
- **Visitor Tracking** - Analytics and visitor location tracking
- **Telegram Integration** - Real-time notifications via Telegram bot
- **Contact Form** - Self-hosted contact form with dashboard replies
- **Search Functionality** - Full-text search across blog posts
- **Category Filtering** - Filter blogs by tags and subjects

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with SSR/SSG
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Quill** - Rich text editor
- **SWR** - Data fetching and caching

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Database
- **NextAuth.js** - Authentication

### Additional Libraries
- **React Icons** - Icon library
- **Sonner** - Toast notifications
- **NProgress** - Progress bar
- **React Markdown** - Markdown rendering
- **Zustand** - State management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pong7772/portfolio-pong.git
cd portfolio-pong
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Telegram Bot (optional)
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
TELEGRAM_CHAT_ID="your-telegram-chat-id"
```

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
yarn seed
```

### 5. Run the development server

```bash
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   ├── images/                # Static images
│   └── favicon/               # Favicon files
├── src/
│   ├── common/
│   │   ├── components/        # Reusable components
│   │   ├── constant/          # Constants and configs
│   │   ├── context/           # React contexts
│   │   ├── helpers/           # Utility functions
│   │   ├── hooks/             # Custom hooks
│   │   ├── libs/              # Library configurations
│   │   ├── styles/            # Global styles
│   │   └── types/             # TypeScript types
│   ├── modules/
│   │   ├── blog/              # Blog module
│   │   ├── chat/              # Community chat module
│   │   ├── dashboard/         # Admin dashboard
│   │   ├── home/              # Homepage components
│   │   └── projects/          # Projects module
│   ├── pages/
│   │   ├── api/               # API routes
│   │   ├── blog/              # Blog pages
│   │   ├── dashboard/         # Dashboard pages
│   │   └── ...                # Other pages
│   └── services/              # API service functions
└── ...config files
```

## 🎯 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn typecheck` - Run TypeScript type checking
- `yarn format` - Format code with Prettier
- `yarn test` - Run tests

## 🌐 Live Demo

Visit the live portfolio: [https://visothipongroth.vercel.app](https://visothipongroth.vercel.app)


<!-- Add screenshots of your portfolio here -->

## 🔐 Dashboard Access

The admin dashboard is available at `/dashboard` and requires authentication. You can manage:
- Blog posts
- Photo stories
- Projects
- Contact messages
- Comments
- Visitor analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Roth Visothipong**

- Portfolio: [https://visothipongroth.vercel.app](https://visothipongroth.vercel.app)
- GitHub: [@pong7772](https://github.com/pong7772)
- Email: visothipong7772@gmail.com
- LinkedIn: [Roth Visothipong](https://www.linkedin.com/in/roth-samnangvisothipong-3333ab1aa/)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

⭐ If you like this project, please give it a star!

