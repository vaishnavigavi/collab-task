# Collab Task - Real-time Kanban Board

A modern, real-time collaborative Kanban board built with Angular 17 and NestJS 10.

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
- **Real-time:** Socket.IO client
- **PWA:** Service Worker for offline support

### Backend (NestJS 10)
- **Framework:** NestJS 10
- **Real-time:** Socket.IO server
- **Validation:** class-validator
- **Documentation:** Swagger/OpenAPI
- **CORS:** Configured for production domains

### Shared Libraries
- **shared-models:** TypeScript interfaces and enums
- **shared-ui:** Reusable UI components

## 🚀 Deployment

### Prerequisites
- [Vercel CLI](https://vercel.com/cli) (for frontend)
- [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/) (for backend)

### Deploy Backend (Fly.io)

1. **Install Fly.io CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io:**
   ```bash
   fly auth login
   ```

3. **Deploy the API:**
   ```bash
   npm run deploy:api
   ```

### Deploy Frontend (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy the UI:**
   ```bash
   npm run deploy:ui
   ```

### Deploy Both (One Command)
```bash
npm run deploy
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env):**
```env
API_URL=https://your-api-domain.fly.dev
```

**Backend (.env):**
```env
PORT=3333
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run e2e

# Linting
npm run lint
```

## 📚 API Documentation

Once deployed, visit:
- **Development:** http://localhost:3333/api
- **Production:** https://your-api-domain.fly.dev/api

## 🎯 Features

- ✅ **Real-time Updates:** WebSocket-powered live collaboration
- ✅ **Drag & Drop:** Smooth Kanban card movement
- ✅ **Task Management:** Create, edit, delete, and move tasks
- ✅ **Responsive Design:** Works on desktop and mobile
- ✅ **PWA Support:** Offline capabilities
- ✅ **Modern UI:** Material Design + Tailwind CSS
- ✅ **Type Safety:** Full TypeScript implementation

## 🛠️ Development

### Project Structure
```
collab-task/
├── apps/
│   ├── board-ui/          # Angular frontend
│   └── board-api/         # NestJS backend
├── libs/
│   ├── shared-models/     # TypeScript interfaces
│   └── shared-ui/         # Reusable components
└── .github/workflows/     # CI/CD pipelines
```

### Key Commands
```bash
# Development
npm run serve:board-ui     # Start frontend
npm run serve:board-api    # Start backend

# Building
npm run build:board-ui     # Build frontend
npm run build:board-api    # Build backend

# Testing
npm run test               # Run all tests
npm run e2e               # Run E2E tests

# Deployment
npm run deploy:api        # Deploy backend
npm run deploy:ui         # Deploy frontend
npm run deploy            # Deploy both
```

## 📈 Roadmap

- [ ] **Database Integration:** PostgreSQL with Prisma
- [ ] **User Authentication:** Firebase Auth integration
- [ ] **File Uploads:** Image attachments for tasks
- [ ] **Advanced Permissions:** Role-based access control
- [ ] **Analytics Dashboard:** Task completion metrics
- [ ] **Mobile App:** React Native companion app
- [ ] **Real-time Comments:** Inline task discussions
- [ ] **Templates:** Pre-built board templates
- [ ] **Integrations:** Slack, GitHub, Jira webhooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using Angular 17 + NestJS 10** 