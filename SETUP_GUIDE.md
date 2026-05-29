# Luxuvia Development Setup Guide

## 📝 Step-by-Step Setup

### Step 1: Verify Node.js Installation
```bash
node --version
npm --version
```
Required: Node.js v16+

### Step 2: MongoDB Setup

#### Using MongoDB Locally
1. **Download & Install** from https://www.mongodb.com/try/download/community
2. **Start MongoDB**:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Windows
   # MongoDB Community Server will start as a service
   
   # Linux
   sudo systemctl start mongod
   ```
3. **Verify** it's running:
   ```bash
   mongosh
   # Should connect successfully
   ```

#### Using MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Go to "Database" > "Connect"
5. Choose "Drivers"
6. Copy the connection string
7. Update in `backend/.env`: `MONGODB_URI=<your-connection-string>`

### Step 3: Backend Installation

```bash
cd backend

# Install dependencies
npm install

# Check if Node modules installed correctly
ls node_modules
```

### Step 4: Seed Database

```bash
# From backend directory
npm run seed

# You should see:
# ✓ MongoDB connected for seeding
# ✓ Cleared existing projects
# ✓ Seeded 3 projects successfully
```

### Step 5: Start Backend Server

```bash
# From backend directory
npm run dev

# You should see:
# ✓ MongoDB connected successfully
# ✓ Server running on http://localhost:5000
# ✓ API Base URL: http://localhost:5000/api
```

**Keep this terminal open!**

### Step 6: Frontend Installation (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Check if Node modules installed correctly
ls node_modules
```

### Step 7: Start Frontend Server

```bash
# From frontend directory
npm start

# Browser will automatically open http://localhost:3000
```

### Step 8: Verify Everything Works

**Frontend URLs to Check**:
- Home: http://localhost:3000
- Projects: http://localhost:3000/projects
- Admin Login: http://localhost:3000/admin/login

**Admin Login**:
- Username: `admin`
- Password: `luxuvia@2024`

**Backend Health Check**:
- http://localhost:5000/api/health

## 🛠️ Common Issues & Solutions

### Issue: "MongoDB connection error"
**Solution**:
1. Verify MongoDB is running: `mongosh`
2. Check `MONGODB_URI` in `backend/.env`
3. For Atlas, ensure IP whitelist includes your IP

### Issue: "EADDRINUSE: address already in use :::5000"
**Solution**:
```bash
# Kill process using port 5000
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "npm: command not found"
**Solution**:
1. Verify Node.js is installed: `node --version`
2. Reinstall Node.js from https://nodejs.org
3. Restart terminal

### Issue: Modules not found
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📝 Development Commands

### Backend
```bash
npm run dev       # Start with nodemon (auto-reload)
npm start         # Start production server
npm run seed      # Seed database
```

### Frontend
```bash
npm start         # Start dev server
npm run build     # Build for production
npm test          # Run tests
```

## 🔗 API Testing

### Using cURL

**Get all projects**:
```bash
curl http://localhost:5000/api/projects
```

**Create inquiry**:
```bash
curl -X POST http://localhost:5000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+91 9999999999",
    "email": "john@example.com",
    "project_slug": "sri-laxmi-janardhana-nilayam"
  }'
```

### Using Postman
1. Import API requests from backend
2. Set base URL to `http://localhost:5000/api`
3. Use auth token from login for protected routes

## 📚 File Structure Reference

### Frontend Important Files
- `src/App.js` — Main routing
- `src/components/Navbar.js` — Navigation
- `src/pages/HomePage.js` — Home page with all sections
- `src/pages/AdminDashboardPage.js` — Admin dashboard
- `src/index.css` — Global styles and Tailwind

### Backend Important Files
- `server.js` — Express server setup
- `models/` — MongoDB schemas
- `routes/` — API endpoints
- `middleware/auth.js` — JWT authentication
- `seed.js` — Database seeding

## ✅ Success Checklist

- [ ] Node.js v16+ installed
- [ ] MongoDB running locally or Atlas configured
- [ ] Backend dependencies installed (`npm install`)
- [ ] Database seeded (`npm run seed`)
- [ ] Backend server running on port 5000
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Frontend server running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can login to admin panel (admin/luxuvia@2024)
- [ ] Can see 3 projects on home page

## 🚀 Next Steps

1. **Customize Projects**: Edit projects in `backend/seed.js` or via admin panel
2. **Update Contact Info**: Change phone number in components
3. **Add Company Images**: Replace image URLs
4. **Deploy**: Follow deployment guide in main README

---

**Need Help?**
- Check browser console for frontend errors
- Check terminal for backend errors
- Verify all .env files are set correctly
