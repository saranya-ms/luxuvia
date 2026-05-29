# Luxuvia Project Reference

## 📁 Complete File Structure

```
luxuvia/
├── README.md                          # Main documentation
├── SETUP_GUIDE.md                     # Step-by-step setup
├── PROJECT_REFERENCE.md               # This file
│
├── frontend/
│   ├── public/
│   │   └── index.html                # HTML entry point with Google Fonts
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ScrollToTop.js         # Scroll to top on route change
│   │   │   ├── Reveal.js             # Intersection observer for animations
│   │   │   ├── Navbar.js             # Top navigation with mobile menu
│   │   │   ├── Footer.js             # 4-column footer layout
│   │   │   ├── WhatsAppWidget.js      # Floating WhatsApp button
│   │   │   ├── InquiryForm.js        # Reusable form for inquiries
│   │   │   └── ProjectCard.js        # Project grid card component
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.js           # 7 sections: hero, stats, featured, projects, how-it-works, why-us, cta
│   │   │   ├── ProjectsPage.js       # Projects grid with filters
│   │   │   ├── ProjectDetailPage.js  # Full project details
│   │   │   ├── AboutPage.js          # About company
│   │   │   ├── ContactPage.js        # Contact form and info
│   │   │   ├── AdminLoginPage.js     # Admin authentication
│   │   │   └── AdminDashboardPage.js # Admin panel with tabs
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js                # Axios instance with interceptors
│   │   │   └── cn.js                 # Class name utilities
│   │   │
│   │   ├── App.js                    # Main routing component
│   │   ├── index.js                  # React DOM render
│   │   └── index.css                 # Tailwind & custom classes
│   │
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   ├── jsconfig.json                 # Path aliases @/
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
└── backend/
    ├── models/
    │   ├── Project.js                # Project schema with all fields
    │   ├── Inquiry.js                # Inquiry schema
    │   └── Admin.js                  # Admin schema
    │
    ├── routes/
    │   ├── projects.js               # GET/POST/PUT/DELETE projects
    │   ├── inquiries.js              # POST inquiries, GET, PUT status
    │   ├── admin.js                  # POST login
    │   └── stats.js                  # GET dashboard stats
    │
    ├── middleware/
    │   └── auth.js                   # JWT verification
    │
    ├── server.js                     # Express server setup
    ├── seed.js                       # Database seeding script
    ├── .env                          # Environment variables
    ├── .gitignore
    └── package.json
```

## 🎨 Component Usage Guide

### Reveal (Intersection Observer)
```jsx
<Reveal delay={100}>
  <div>Content fades in on scroll</div>
</Reveal>
```
Props:
- `children` - Content to reveal
- `className` - Additional CSS classes
- `delay` - Animation delay in ms

### ProjectCard
```jsx
<ProjectCard project={projectObject} />
```
Displays: thumbnail, status badge, location, name, specs, price, explore link
Has hover effect with card-lift class

### InquiryForm
```jsx
<InquiryForm 
  projectSlug="sri-laxmi-janardhana-nilayam"
  projectName="Sri Laxmi Janardhana Nilayam"
  inquiryType="project_inquiry"
  compact={false}
/>
```
Props:
- `projectSlug` - Optional project identifier
- `projectName` - Optional project name
- `inquiryType` - Type of inquiry
- `compact` - Hide email/message fields

## 🌐 Routes Reference

### Frontend Routes
| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | Home with 7 sections |
| `/projects` | ProjectsPage | All projects grid |
| `/projects/:slug` | ProjectDetailPage | Project details |
| `/about` | AboutPage | About company |
| `/contact` | ContactPage | Contact form |
| `/admin/login` | AdminLoginPage | Admin login |
| `/admin/dashboard` | AdminDashboardPage | Admin panel |

### Backend API Routes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | No | List all projects |
| GET | `/api/projects/:slug` | No | Get project by slug |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |
| POST | `/api/inquiries` | No | Create inquiry |
| GET | `/api/inquiries` | Yes | List inquiries |
| PUT | `/api/inquiries/:id/status` | Yes | Update inquiry status |
| POST | `/api/admin/login` | No | Get JWT token |
| GET | `/api/stats` | No | Get dashboard stats |
| GET | `/api/health` | No | Health check |

## 🎨 Design Classes Reference

### Button Styles
```jsx
<button className="btn-primary">Submit</button>          // Orange gradient
<button className="border-2 border-white/30">Button</button> // Outlined
```

### Text Styles
```jsx
<p className="font-heading">Heading Text</p>    // Cormorant Garamond
<p className="font-body">Body Text</p>         // Figtree
<p className="text-[#f59218]">Orange</p>
<p className="text-[#8090b0]">Muted</p>
```

### Container Styles
```jsx
<div className="bg-[#0f1628] border border-[#1e2d50] rounded-md">
  {/* Card styling */}
</div>

<div className="glass-dark">
  {/* Glassmorphism effect */}
</div>

<div className="card-lift">
  {/* Hover lift animation */}
</div>
```

### Section Backgrounds
```jsx
// Alternating pattern:
// 1. bg-dark-base (#0a0e1a)
// 2. bg-[#1e3a8a]
// 3. bg-dark-mid (#0d1220)
// 4. bg-[#1e3a8a]
// 5. bg-dark-base (#0a0e1a)
// 6. bg-dark-mid (#0d1220)
```

## 📊 Database Schema Examples

### Project Document
```javascript
{
  _id: ObjectId,
  name: "Sri Laxmi Janardhana Nilayam",
  slug: "sri-laxmi-janardhana-nilayam",
  location: "Peerzadiguda",
  status: "in_progress",
  rera_id: "P02400007368",
  configurations: "2 BHK, 2.5 BHK, 3 BHK",
  size_range: "1100 - 1650 SFT",
  total_units: 40,
  price_range: "₹45 Lakhs - ₹85 Lakhs",
  images: ["url1", "url2"],
  amenities: [
    { name: "Swimming Pool", icon: "Droplet" },
    { name: "Gym", icon: "Dumbbell" }
  ],
  // ... more fields
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Inquiry Document
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  phone: "+91 9999999999",
  email: "john@example.com",
  message: "Interested in 2 BHK",
  project_slug: "sri-laxmi-janardhana-nilayam",
  project_name: "Sri Laxmi Janardhana Nilayam",
  inquiry_type: "project_inquiry",
  status: "new", // new, contacted, converted, closed
  createdAt: ISODate
}
```

## 🔐 Authentication Flow

1. **Login**: POST `/api/admin/login` with username/password
2. **Response**: `{ token: "jwt_token_here" }`
3. **Storage**: Save token to `localStorage.admin_token`
4. **API Calls**: Token auto-added via Axios interceptor
5. **Header**: `Authorization: Bearer <token>`
6. **Logout**: Remove token from localStorage

## 🚀 Key Features Implementation

### Homepage 7 Sections
1. **Hero** - Full viewport with gradient background
2. **Stats Bar** - Navy background with 4 statistics
3. **Featured Project** - Project spotlight section
4. **All Projects** - 3-column grid with filters
5. **How It Works** - 3-step process
6. **Why Choose Us** - 2-column with image and features
7. **Get In Touch** - CTA with contact form

### Admin Dashboard Tabs
1. **Inquiries** - List with status updates and filters
2. **Projects** - List with view/delete actions

### WhatsApp Integration
- Pulsing green button in bottom-right
- Click to expand chat preview
- Direct WhatsApp link: `https://wa.me/918877555999`

### Project Filtering
- All Projects
- Completed
- In Progress
- Upcoming

## 📱 Responsive Breakpoints

```
Mobile:   < 768px (md)
Tablet:   768px - 1024px
Desktop:  > 1024px
```

Key responsive classes used:
- `hidden md:flex` - Hide on mobile, show on tablet+
- `grid-cols-1 md:grid-cols-2` - 1 column mobile, 2 on tablet+
- `text-2xl md:text-4xl` - Smaller font on mobile

## 🎯 Performance Optimizations

1. **Lazy Loading** - Images via Reveal component
2. **Code Splitting** - React Router lazy loading ready
3. **CSS** - Tailwind purges unused styles
4. **API** - Axios cache interceptors available
5. **Images** - External CDN hosted (framerusercontent)

## 🔄 Data Flow

### Frontend → Backend
```
User fills form → InquiryForm component 
→ Axios POST to /api/inquiries 
→ Express route handler 
→ Mongoose save 
→ Response to frontend 
→ Toast notification
```

### Backend → Frontend
```
Axios GET /api/projects 
→ Express route handler 
→ MongoDB query 
→ Return array of projects 
→ Component renders ProjectCard for each
```

## 🛠️ Development Workflow

1. **Make changes** to code
2. **Frontend**: Hot reload via React dev server
3. **Backend**: Auto-reload via nodemon
4. **Test**: Use browser DevTools or Postman
5. **Commit**: Follow git conventions

## 📦 Tailwind Configuration

Custom colors defined in `tailwind.config.js`:
- `dark-base`, `dark-card`, `dark-mid`
- `navy`, `navy-border`
- `orange`, `orange-dark`
- `text-white`, `text-muted`, `text-dim`, `text-faint`

## 🎓 Learning Resources

- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Radix UI Tabs](https://www.radix-ui.com/docs/primitives/components/tabs)

---

**Last Updated**: 2026
