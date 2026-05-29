# Luxuvia Real Estate Website — Full Stack Build

A premium real estate website for Luxuvia Constructions and Developers Pvt. Ltd., built with React and Node.js.

## 🏗️ Project Structure

```
luxuvia/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.js          # Main app routing
│   │   ├── index.js        # Entry point
│   │   └── index.css       # Global styles
│   ├── public/             # Static files
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env
│
└── backend/                 # Node.js + Express API
    ├── models/             # MongoDB schemas
    ├── routes/             # API routes
    ├── middleware/         # Auth middleware
    ├── server.js           # Main server file
    ├── seed.js             # Database seeding script
    ├── package.json
    └── .env
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🚀 Quick Start

### 1. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# macOS: brew install mongodb-community
# Windows: Download from https://www.mongodb.com/try/download/community

# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and update `MONGODB_URI` in `backend/.env`

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Seed database with sample projects
npm run seed

# Start development server
npm run dev

# Or start production server
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

## 🔐 Admin Credentials

**Default credentials** (set in `.env`):
- Username: `admin`
- Password: `luxuvia@2024`

**Login URL**: `http://localhost:3000/admin/login`

## 🌐 API Endpoints

### Projects
- `GET /api/projects` — List all projects
- `GET /api/projects/:slug` — Get single project
- `POST /api/projects` — Create project (admin)
- `PUT /api/projects/:id` — Update project (admin)
- `DELETE /api/projects/:id` — Delete project (admin)

### Inquiries
- `POST /api/inquiries` — Submit inquiry (public)
- `GET /api/inquiries` — List inquiries (admin)
- `PUT /api/inquiries/:id/status` — Update status (admin)

### Admin
- `POST /api/admin/login` — Login and get JWT token

### Stats
- `GET /api/stats` — Get dashboard statistics

## 🎨 Design System

### Colors
- Dark Base: `#0a0e1a`
- Dark Card: `#0f1628`
- Navy: `#1e3a8a`
- Orange (Primary): `#f59218`
- Text White: `#eef1f6`
- Text Muted: `#8090b0`

### Typography
- Headings: Cormorant Garamond
- Body: Figtree

### Features
- Responsive design (mobile, tablet, desktop)
- Dark theme with premium feel
- Smooth animations and transitions
- Intersection observer for reveal effects
- Toast notifications with Sonner
- Radix UI tabs for admin dashboard

## 📱 Pages

### Public Pages
- **Home** (`/`) — Hero, stats, featured project, all projects, how it works, why us, CTA
- **Projects** (`/projects`) — Project grid with filters
- **Project Detail** (`/projects/:slug`) — Full project information
- **About** (`/about`) — Company information
- **Contact** (`/contact`) — Contact form and info

### Admin Pages
- **Login** (`/admin/login`) — Admin authentication
- **Dashboard** (`/admin/dashboard`) — Analytics, inquiries, projects management

## 🔧 Environment Variables

### Frontend (`.env`)
```
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Backend (`.env`)
```
MONGODB_URI=mongodb://localhost:27017/luxuvia
JWT_SECRET=your_jwt_secret_key_change_in_production
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=luxuvia@2024
NODE_ENV=development
```

## 📦 Dependencies

### Frontend
- react: ^18.2.0
- react-router-dom: ^6.20.0
- axios: ^1.6.0
- tailwindcss: ^3.3.0
- lucide-react: ^0.383.0
- sonner: ^1.2.0
- @radix-ui/react-tabs: ^1.0.4

### Backend
- express: ^4.18.2
- mongoose: ^7.5.0
- jsonwebtoken: ^9.0.2
- cors: ^2.8.5
- dotenv: ^16.3.1
- bcryptjs: ^2.4.3

## 🎯 Key Features

✅ **Premium Design**
- Luxury aesthetic with dark theme
- Smooth animations and hover effects
- Responsive grid layouts

✅ **Functional Admin Panel**
- JWT authentication
- Inquiry management with status tracking
- Project management (view, delete)
- Real-time statistics

✅ **SEO-Friendly**
- Clean routing structure
- Semantic HTML
- Meta tags ready

✅ **Real-time Updates**
- Axios interceptors for auth
- Error handling with toast notifications
- Loading states

## 🚢 Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy the `build/` directory
3. Set environment variables in dashboard

### Backend (Heroku/Railway)
1. Set `NODE_ENV=production`
2. Update `MONGODB_URI` to production database
3. Change `JWT_SECRET` to a strong key
4. Update `REACT_APP_BACKEND_URL` in frontend

## 📞 Contact Information

- **Phone**: +91 8877 555 999
- **Email**: support@luxuvia.in
- **Location**: Peerzadiguda, East Hyderabad, Telangana

---

**© 2026 Luxuvia Constructions and Developers Pvt. Ltd.**
TS RERA Approved Developer

