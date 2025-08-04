# 🚀 Collab Task - Real-time Kanban Board

A beautiful, real-time Kanban board built with **Angular 17** + **NestJS 10** in an Nx monorepo.

## 🌐 Live Demo

**🎯 Frontend:** https://board-ui-sage.vercel.app  
**🔧 Backend API:** https://web-production-b6c94.up.railway.app  
**📚 API Documentation:** https://web-production-b6c94.up.railway.app/api  
**📖 GitHub Repository:** https://github.com/vaishnavigavi/collab-task

## ✨ Features

### 🎯 Core Features
- **Real-time Kanban Board** - Drag & drop tasks between columns
- **WebSocket Integration** - Live updates across multiple browser tabs
- **Task Management** - Create, edit, delete, and move tasks
- **Priority System** - High, Medium, Low priority levels
- **User Authentication** - Mock Firebase integration
- **Responsive Design** - Works on desktop and mobile

### 🎨 UI/UX Features
- **Beautiful Design** - Modern, clean interface with smooth animations
- **Dark/Light Mode** - Toggle between themes
- **Material Design** - Angular Material components
- **Tailwind CSS** - Utility-first styling
- **Drag & Drop** - Smooth card interactions
- **Toast Notifications** - User feedback for actions

### 🔧 Technical Features
- **Nx Monorepo** - Scalable project structure
- **TypeScript** - Full type safety
- **Real-time Sync** - WebSocket communication
- **REST API** - Fallback for initial data loading
- **PWA Ready** - Service worker integration
- **Testing** - Jest unit tests and Cypress E2E

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone https://github.com/vaishnavigavi/collab-task.git
cd collab-task

# Install dependencies
npm install

# Start development servers
npm run serve:board-ui    # Frontend on http://localhost:4200
npm run serve:board-api   # Backend on http://localhost:3333
```

### Available Scripts
```bash
# Development
npm run serve:board-ui    # Start Angular frontend
npm run serve:board-api   # Start NestJS backend

# Building
npm run build:board-ui    # Build frontend for production
npm run build:board-api   # Build backend for production

# Testing
npm run test              # Run all tests
npm run test:board-ui     # Frontend tests
npm run test:board-api    # Backend tests

# Linting
npm run lint              # Lint all projects
npm run format            # Format code with Prettier
```

## 📁 Project Structure

```
collab-task/
├── apps/
│   ├── board-ui/          # Angular 17 frontend
│   └── board-api/         # NestJS 10 backend
├── libs/
│   ├── shared-models/     # TypeScript interfaces
│   └── shared-ui/         # Reusable UI components
├── .github/workflows/     # CI/CD pipelines
└── README.md
```

## 🌍 Deployment Status

### ✅ Frontend (Vercel)
- **URL:** https://board-ui-sage.vercel.app
- **Status:** ✅ Deployed and working
- **Features:** Full functionality with Railway backend

### ✅ Backend (Railway)
- **URL:** https://web-production-b6c94.up.railway.app
- **Status:** ✅ Deployed and working
- **API Docs:** https://web-production-b6c94.up.railway.app/api
- **Health Check:** https://web-production-b6c94.up.railway.app/health

## 🔌 API Endpoints

### REST API
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `PATCH /tasks/:id/column` - Move task to different column
- `DELETE /tasks/:id` - Delete task
- `POST /tasks/:taskId/comments` - Add comment to task

### WebSocket Events
- `taskCreated` - New task created
- `taskMoved` - Task moved between columns
- `taskUpdated` - Task updated
- `taskDeleted` - Task deleted
- `commentAdded` - Comment added to task

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests (Cypress)
npm run e2e

# Test coverage
npm run test:coverage
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build:board-ui
cd dist/apps/board-ui
vercel --prod
```

### Backend (Railway)
```bash
# Railway automatically detects and deploys from GitHub
# Configuration files: railway.json, nixpacks.toml, Procfile
```

## 🔧 Environment Variables

### Frontend
```env
API_URL=https://web-production-b6c94.up.railway.app
```

### Backend
```env
PORT=3333
NODE_ENV=production
FRONTEND_URL=https://board-ui-sage.vercel.app
```

## 📈 Performance

- **Lighthouse Score:** Performance ≥ 90, Accessibility ≥ 90
- **Bundle Size:** Optimized with tree-shaking
- **Real-time Updates:** WebSocket with fallback to REST
- **Caching:** Service worker for offline support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Roadmap

- [ ] **Database Integration** - PostgreSQL with Prisma
- [ ] **User Authentication** - Real Firebase integration
- [ ] **File Uploads** - Image attachments for tasks
- [ ] **Advanced Features** - Task templates, time tracking
- [ ] **Mobile App** - React Native companion app
- [ ] **Analytics** - Usage tracking and insights
- [ ] **Team Features** - User roles and permissions
- [ ] **Advanced UI** - Custom themes, animations

---

**Built with ❤️ using Angular 17 + NestJS 10 + Nx** 