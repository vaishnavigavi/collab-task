# Collab Task - Real-time Kanban Board

A modern, real-time collaborative Kanban board built with Angular 17 and NestJS 10.

## 🚀 Live Demo

**🌐 Frontend:** https://board-ui-sage.vercel.app

**📚 GitHub Repository:** https://github.com/vaishnavigavi/collab-task

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Local Development

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd collab-task
   npm install
   ```

2. **Start the development servers:**
   ```bash
   # Start API server (port 3333)
   npm run serve:board-api
   
   # Start UI server (port 4201)
   npm run serve:board-ui
   ```

3. **Open your browser:**
   - Frontend: http://localhost:4201
   - API: http://localhost:3333
   - API Docs: http://localhost:3333/api

## 🏗️ Architecture

### Frontend (Angular 17)
- **Framework:** Angular 17 with standalone components
- **UI Library:** Angular Material + Tailwind CSS
- **State Management:** RxJS BehaviorSubject
- **Real-time:** Socket.IO client for WebSocket communication
- **PWA:** Service Worker for offline functionality

### Backend (NestJS 10)
- **Framework:** NestJS 10 with TypeScript
- **WebSockets:** Socket.IO for real-time communication
- **Validation:** class-validator for DTO validation
- **Documentation:** Swagger/OpenAPI

### Shared Libraries
- **shared-models:** TypeScript interfaces and enums
- **shared-ui:** Reusable Angular components

## ✨ Features

### 🎯 Core Functionality
- **Real-time Kanban Board:** Drag & drop tasks between columns
- **Task Management:** Create, edit, delete, and move tasks
- **Priority System:** High, Medium, Low priority badges
- **User Authentication:** Mock Firebase authentication
- **Responsive Design:** Works on desktop and mobile

### 🎨 UI/UX Features
- **Beautiful Design:** "Calm Productivity" theme
- **Dark/Light Mode:** Toggle between themes
- **Smooth Animations:** Angular animations for interactions
- **Material Design:** Angular Material components
- **Tailwind CSS:** Utility-first styling

### 🔄 Real-time Features
- **Live Updates:** WebSocket communication
- **Multi-user:** See changes from other users instantly
- **Task Comments:** Add comments to tasks
- **Real-time Sync:** Changes appear across all connected clients

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run serve:board-ui      # Start Angular dev server
npm run serve:board-api     # Start NestJS dev server

# Building
npm run build:board-ui      # Build Angular app
npm run build:board-api     # Build NestJS app

# Testing
npm run test                # Run all tests
npm run test:board-ui       # Test Angular app
npm run test:board-api      # Test NestJS app

# Linting
npm run lint                # Lint all projects
npm run format              # Format code with Prettier
```

### Project Structure

```
collab-task/
├── apps/
│   ├── board-ui/          # Angular 17 frontend
│   └── board-api/         # NestJS 10 backend
├── libs/
│   ├── shared-models/     # TypeScript interfaces
│   └── shared-ui/         # Reusable components
├── .github/workflows/     # CI/CD pipelines
└── README.md
```

## 🚀 Deployment

### Frontend (Vercel)
- **URL:** https://board-ui-sage.vercel.app
- **Status:** ✅ Deployed and Live
- **Framework:** Angular 17
- **Build:** Automatic on Git push

### Backend (Local Development)
- **Status:** ⚠️ Needs deployment
- **Options:** Railway, Render, Heroku (free tiers available)
- **Note:** Fly.io requires payment information

## 🔧 Environment Variables

### Frontend (.env)
```env
API_URL=http://localhost:3333
```

### Backend (.env)
```env
PORT=3333
NODE_ENV=development
```

## 📊 API Endpoints

### REST API
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `PATCH /tasks/:id/column` - Move task to column
- `DELETE /tasks/:id` - Delete task
- `POST /tasks/:id/comments` - Add comment

### WebSocket Events
- `taskCreated` - New task created
- `taskMoved` - Task moved between columns
- `commentAdded` - Comment added to task

## 🧪 Testing

### Unit Tests
- **Frontend:** Jest + Angular Testing Utilities
- **Backend:** Jest + NestJS Testing Utilities

### E2E Tests
- **Framework:** Cypress
- **Status:** Stubbed for demo

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Real-time Kanban board
- ✅ Task management
- ✅ User authentication
- ✅ Responsive design

### Phase 2 (Future)
- 🔄 Database integration (PostgreSQL)
- 🔄 User roles and permissions
- 🔄 Advanced task features
- 🔄 Team collaboration
- 🔄 Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Angular Team** for the amazing framework
- **NestJS Team** for the robust backend framework
- **Vercel** for hosting the frontend
- **Tailwind CSS** for the utility-first CSS framework

---

**Built with ❤️ using Angular 17 + NestJS 10** 