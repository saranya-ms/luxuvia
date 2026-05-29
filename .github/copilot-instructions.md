# GitHub Copilot Prompt — Luxuvia Web App (VS Code)

> Paste this entire prompt into GitHub Copilot Chat (`Ctrl+Shift+I`) or use it as a `.github/copilot-instructions.md` file in your repo root so Copilot picks it up automatically on every session.

---

## 🏗️ Project Overview

You are helping build **Luxuvia** — a premium real estate web app for **Luxuvia Constructions and Developers Pvt. Ltd.**, a TS RERA-approved developer based in **Hyderabad, Telangana, India**. The app is a **React SPA** bootstrapped with Create React App, styled with **Tailwind CSS v3**, and uses **React Router** for client-side navigation.

The brand aesthetic is **luxury dark** — deep navy/charcoal backgrounds (`#0a0e1a`, `#0f1628`), **orange-gold accents** (`#f59218`), and refined typography using:
- **Cormorant Garamond** (headings — class `font-heading`)
- **Figtree** (body text — class `font-body`)

---

## 📁 Project File Structure

```
/app/frontend/src/
├── App.js                  # Root component, sets up Router + global layout
├── App.css                 # Global custom CSS (animations, brand utilities)
├── pages/
│   ├── ProjectsPage.js     # /projects route
│   ├── AboutPage.js        # /about route
│   └── ContactPage.js      # /contact route
├── components/
│   ├── Navbar.js           # Fixed top nav, shared across all pages
│   ├── Footer.js           # Bottom footer, shared across all pages
│   ├── ProjectCard.js      # Reusable card used in ProjectsPage
│   └── WhatsAppWidget.js   # Fixed floating WhatsApp button (bottom-right)
```

---

## 🎨 Design System & CSS Tokens

### CSS Custom Properties (defined in `App.css` / `:root`)
```css
--background: 222 40% 7%      /* #0a0e1a */
--foreground: 220 30% 95%
--primary: 32 90% 52%         /* #f59218 orange-gold */
--primary-foreground: 222 40% 7%
--secondary: 222 30% 12%
--border: 222 25% 16%         /* #1e2d50 */
--muted-foreground: 220 15% 55%
--radius: 0.5rem
```

### Key Utility Classes (from `App.css`)
```css
.font-heading   /* Cormorant Garamond */
.font-body      /* Figtree */
.btn-primary    /* Orange gradient button: linear-gradient(135deg, #f59218, #e88510) */
.btn-navy       /* Navy accent button: #1e3a8a */
.card-lift      /* Hover: translateY(-6px) + orange border glow */
.card-img       /* Image inside card that scales on hover */
.glass-dark     /* backdrop-filter: blur(20px), dark bg */
.accent-line    /* 48px × 2px orange gradient divider */
.hero-gradient  /* Dark overlay gradient for hero sections */
.noise          /* Subtle noise texture via ::before pseudo */
.anim-fade-up   /* fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) */
.anim-fade-in   /* fadeIn 0.5s ease */
.anim-slide-right
.anim-float
.delay-1 through .delay-5   /* animation-delay helpers */
.wa-pulse       /* WhatsApp pulsing ring animation */
```

---

## 🧩 Component Specifications

### `Navbar.js`
**Route:** All pages (fixed top)
**data-testid:** `navbar`

```
- Fixed, z-50, transparent by default; adds glass-dark on scroll
- Logo: <img alt="Luxuvia"> linking to /
  - data-testid="logo-link"
  - src: https://customer-assets.emergentagent.com/job_luxuvia-dev/artifacts/gjc6gs38_luxuvia%20icon.png
  - className: h-12 sm:h-14 object-contain
- Desktop nav links (hidden md:flex, gap-9):
  - Home         → /       data-testid="nav-home"
  - Projects     → /projects  data-testid="nav-projects"
  - About        → /about  data-testid="nav-about"
  - Contact      → /contact data-testid="nav-contact"
  - Active link color: text-[#f59218]
  - Inactive: text-[#8090b0] hover:text-[#eef1f6]
  - Font: font-body text-[13px] uppercase tracking-[0.22em]
- Desktop right-side CTAs:
  - Phone link: href="tel:+918877555999" data-testid="nav-phone"
    - Icon: <Phone> (lucide-react), w-3.5 h-3.5
    - text-[#8090b0] hover:text-[#f59218]
  - "Book a Visit" button → /contact data-testid="nav-book-visit"
    - className: btn-primary px-6 py-2.5 font-semibold uppercase tracking-[0.2em] text-[11px] font-body rounded-sm
- Mobile: hamburger button data-testid="mobile-menu-toggle" (md:hidden)
  - Icon: <Menu> w-6 h-6, text-[#eef1f6]
  - Toggles a mobile dropdown menu
```

---

### `Footer.js`
**data-testid:** `footer`

```
- bg-[#070b15] border-t border-[#1a2440] noise class
- 4-column grid (1→2→4 cols at md→lg):
  Col 1 — Brand: Logo + tagline text
  Col 2 — Quick Links: Home, Projects, About Us, Contact
  Col 3 — Our Projects:
    - Sri Laxmi Janardhana Nilayam → /projects/sri-laxmi-janardhana-nilayam
    - Padmavati Residency          → /projects/padmavati-residency
    - Venkataramana Residency      → /projects/venkataramana-residency
  Col 4 — Contact:
    - Phone: +91 8877 555 999 (tel link)
    - Email: support@luxuvia.in (mailto link)
    - Address: Peerzadiguda, East Hyderabad, Telangana
    - Icons from lucide-react: <Phone>, <Mail>, <MapPin>
- Bottom bar: copyright + "TS RERA Approved Developer"
- Link hover color: text-[#f59218], default: text-[#5a6a8a]
```

---

### `WhatsAppWidget.js`
**data-testid:** `whatsapp-widget`

```
- Fixed bottom-6 right-6 z-50
- Toggle button: data-testid="whatsapp-toggle"
  - w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20bd5a]
  - wa-pulse animation class
  - Icon: <MessageCircle> w-6 h-6 text-white
- On open: shows a popup panel above the button with:
  - WhatsApp link: data-testid="whatsapp-link"
  - Pre-filled message: "Hi, I'm interested in Luxuvia projects"
  - href: https://wa.me/918877555999?text=...
  - "Connect with us instantly on WhatsApp for quick responses."
```

---

### `ProjectCard.js`
**Props:** `{ project }` where project has: `slug`, `title`, `location`, `type`, `area`, `price`, `status`, `image`

```jsx
// Status badge colors:
// "In Progress" → bg-[#f59218]/15 border border-[#f59218]/30 text-[#f5a848]
// "Completed"   → bg-emerald-600/20 border-emerald-500/30 text-emerald-300
// "Upcoming"    → bg-blue-600/20 border-blue-500/30 text-blue-300

<a
  href={`/projects/${project.slug}`}
  data-testid={`project-card-${project.slug}`}
  className="card-lift bg-[#0f1628] border border-[#1e2d50] group block overflow-hidden rounded-md"
>
  {/* Image area: relative h-52 overflow-hidden */}
  {/* Status badge: absolute top-3 left-3 */}
  {/* Content: p-5 */}
  {/* Location: MapPin icon + text-[#6b7fa0] */}
  {/* Title: font-heading text-xl text-white group-hover:text-[#f59218] */}
  {/* Type · Area: font-body text-xs text-[#4a5a7a] */}
  {/* Price: font-body text-sm font-semibold text-[#f59218] */}
  {/* "Explore" CTA: ArrowUpRight icon, gap increases on hover */}
</a>
```

---

### `ProjectsPage.js`
**Route:** `/projects`
**data-testid:** `projects-page`

**Sections:**
1. **Hero banner** — `bg-[#0d1220] border-b border-[#1e2d50] py-16 lg:py-20`
   - Eyebrow: "Our Portfolio" (text-[#f59218], tracking-[0.35em])
   - `<div className="accent-line mb-5">`
   - H1: "Projects"
   - Subtitle: "From thoughtfully designed apartments..."

2. **Filter Bar** — `flex flex-wrap gap-2.5 mb-8`
   - Filters: `["All", "Completed", "In Progress", "Upcoming"]`
   - Active: `btn-primary` class
   - Inactive: `border border-[#1e2d50] text-[#6b7fa0] hover:border-[#f59218] hover:text-[#f59218]`
   - `data-testid={filter-${f.toLowerCase().replace(' ', '_')}}`

3. **Project Grid** — `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
   - Renders filtered `<ProjectCard>` components

**Projects data array:**
```js
const projects = [
  {
    slug: "sri-laxmi-janardhana-nilayam",
    title: "Luxuvia Sri Laxmi Janardhana Nilayam",
    location: "Narapally, Hyderabad",
    type: "2 & 3 BHK Apartments",
    area: "1,235 - 1,995 sq.ft.",
    price: "Price on Request",
    status: "In Progress",
    image: "https://framerusercontent.com/images/TIkUKiWQjk1Ln9nR4qbFAMymVWM.png"
  },
  {
    slug: "padmavati-residency",
    title: "Luxuvia Padmavati Residency",
    location: "Peerzadiguda, East Hyderabad",
    type: "2 & 3 BHK Apartments",
    area: "1,214 - 1,455 sq.ft.",
    price: "65.56 L - 78.57 L",
    status: "Completed",
    image: "https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    slug: "venkataramana-residency",
    title: "Luxuvia Venkataramana Residency",
    location: "Peerzadiguda, East Hyderabad",
    type: "2 & 3 BHK Apartments",
    area: "1,206 - 1,453 sq.ft.",
    price: "Price on Request",
    status: "In Progress",
    image: "https://images.pexels.com/photos/18435276/pexels-photo-18435276.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];
```

**Filter logic:**
```js
const [activeFilter, setActiveFilter] = useState("All");
const filtered = activeFilter === "All"
  ? projects
  : projects.filter(p => p.status === activeFilter);
```

---

### `AboutPage.js`
**Route:** `/about`
**data-testid:** `about-page`

**Sections (in order) — pixel-accurate from screenshots:**

---

#### 1. Hero Banner — `bg-[#0d1220] border-b border-[#1e2d50] py-16 lg:py-20`
```
- Eyebrow label: "ABOUT US"
  className: font-body text-[11px] uppercase tracking-[0.35em] text-[#f59218] mb-2
- Accent line: <div className="accent-line mb-5">
- H1: "Our Story"
  className: font-heading text-4xl sm:text-5xl text-white mb-3
- Subtitle: "Building dream homes in Hyderabad with uncompromising quality, transparency, and customer satisfaction."
  className: font-body text-sm text-[#6b7fa0] max-w-2xl
```

---

#### 2. Story Section — `py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
**Layout:** `grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`

**Left column — text:**
```
- H2: "Luxuvia Constructions & Developers Pvt. Ltd."
  className: font-heading text-3xl font-semibold text-white mb-1
- Accent line: <div className="accent-line mb-5">  (immediately under h2)
- 3 body paragraphs (className: space-y-4 font-body text-[#8090b0] leading-relaxed text-sm):
  P1: "Luxuvia Constructions and Developers Pvt. Ltd. is a reputed real estate developer
       based in Hyderabad, Telangana. Since our inception, we have been dedicated to
       creating premium residential spaces that combine modern architecture with thoughtful design."
  P2: "Our projects in East Hyderabad — spanning Peerzadiguda, Narapally, and Pocharam —
       are strategically located near IT hubs, metro stations, and essential amenities.
       Each project is RERA approved, ensuring complete transparency and trust."
  P3: "We believe that a home is more than just walls and a roof. It's where families grow,
       memories are made, and dreams take shape. That's why every Luxuvia home is built with
       premium materials — from teak wood doors to vitrified tiles — and features modern
       amenities for comfortable living."
```

**Right column — image with stat overlay:**
```
- Outer div: className="relative"
- Image: src="https://framerusercontent.com/images/Zg7BtvLfz3jIjRBcMTxccPa3mE.jpg"
  className: w-full rounded-md object-cover h-[420px]
  (shows a real estate agent presenting to a couple in a modern interior)

- Stat badge overlay (bottom-left of image, partially overlapping):
  className: "absolute -bottom-5 -left-5 bg-[#f59218] text-white px-6 py-4 rounded-sm shadow-xl"
  Content:
    <p className="font-heading text-3xl sm:text-4xl font-semibold text-white">5+</p>
    <p className="font-body text-sm text-white/80 uppercase tracking-wider">YEARS OF TRUST</p>
```

---

#### 3. Mission & Vision Cards — full-width section with `bg-[#1e3a8a]` (royal blue background)
**This section has a DISTINCT royal-blue background — NOT the dark navy.**
```
bg-[#1e3a8a] py-16
```
**Layout:** `grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

**Card style:**
```
className: "bg-[#162d7a] border border-[#2a4aaa] rounded-lg p-8"
(slightly darker blue card on the royal blue background)
```

**Card 1 — Our Mission:**
```
- Icon: <Target> (lucide-react), className: w-8 h-8 text-[#f59218] mb-4
- Title: "Our Mission"
  className: font-heading text-2xl text-white mb-3
- Body: "To deliver premium quality homes at the most competitive prices, with complete
         transparency and adherence to RERA guidelines."
  className: font-body text-white/70 leading-relaxed
```

**Card 2 — Our Vision:**
```
- Icon: <Heart> (lucide-react), className: w-8 h-8 text-[#f59218] mb-4
- Title: "Our Vision"
  className: font-heading text-2xl text-white mb-3
- Body: "To become East Hyderabad's most trusted residential developer, known for
         architectural excellence and timely delivery."
  className: font-body text-white/70 leading-relaxed
```

---

#### 4. Values Section — `bg-[#0a0e1a] py-16 lg:py-20`
```
- Eyebrow: "OUR VALUES"
  className: font-body text-[11px] uppercase tracking-[0.35em] text-[#f59218] mb-2 text-center
- Accent line: <div className="accent-line mx-auto mb-5">
- H2: "What Drives Us"
  className: font-heading text-3xl text-white text-center mb-12
```

**Values grid:** `grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto`
Each value is a centered column (icon → title → description):

```js
const values = [
  {
    icon: "Shield",       // lucide-react Shield icon
    title: "Transparency",
    description: "100% RERA compliant with clear documentation."
  },
  {
    icon: "Award",        // lucide-react Award icon
    title: "Quality",
    description: "Premium materials that stand the test of time."
  },
  {
    icon: "Users",        // lucide-react Users icon
    title: "Customer First",
    description: "Personalized service from visit to possession."
  },
  {
    icon: "LayoutTemplate", // lucide-react LayoutTemplate icon
    title: "Innovation",
    description: "Modern designs optimized for Indian families."
  }
];
```

**Each value item:**
```
- Icon container: className="w-14 h-14 rounded-full bg-[#0f1e3d] flex items-center
                             justify-center mx-auto mb-4"
  Icon inside: className="w-6 h-6 text-[#f59218]"
- Title: className="font-heading text-lg text-white mb-2 text-center"
- Description: className="font-body text-xs text-[#6b7fa0] text-center leading-relaxed"
```

---

**Animation pattern** (used throughout AboutPage):
```js
// Each section/card uses staggered reveal with transition-delay
style={{ transitionDelay: `${index * 100}ms` }}
// Combined with .anim-fade-up on mount via IntersectionObserver or useEffect
```

**Additional lucide-react icons needed for AboutPage:**
`Target`, `Heart`, `Shield`, `Award`, `Users`, `LayoutTemplate`

---

### `ContactPage.js`
**Route:** `/contact`
**data-testid:** `contact-page`

**Sections — pixel-accurate from screenshots:**

---

#### 1. Hero Banner — `bg-[#0d1220] border-b border-[#1e2d50] py-16 lg:py-20`
```
- Eyebrow label: "CONTACT US"
  className: font-body text-[11px] uppercase tracking-[0.35em] text-[#f59218] mb-2
- Accent line: <div className="accent-line mb-5">
- H1: "Get in Touch"
  className: font-heading text-4xl sm:text-5xl text-white mb-3
- Subtitle: "Ready to find your dream home? Book a free site visit or request a callback.
             Our team is here to help."
  className: font-body text-sm text-[#6b7fa0] max-w-2xl
```

---

#### 2. Main Content — `py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
**Layout:** `grid grid-cols-1 lg:grid-cols-2 gap-12`

---

**LEFT COLUMN — "Our Office" + WhatsApp CTA**

**Office heading:**
```
- H2: "Our Office"
  className: font-heading text-3xl text-white mb-1
- Accent line: <div className="accent-line mb-8">
```

**Contact info list** — 4 stacked items (`data-testid="contact-info-{0-3}"`):
Each item layout: `flex items-start gap-4 mb-6`

```
Icon container: className="w-10 h-10 rounded-full bg-[#0f1e3d] flex items-center
                            justify-center shrink-0"
  Icon inside: className="w-4 h-4 text-[#f59218]"

Item 0 — Phone:
  Icon: <Phone> (lucide-react)
  Label: "PHONE" (text-[10px] uppercase tracking-widest text-[#6b7fa0] mb-0.5)
  Value: "+91 8877 555 999" (font-heading text-lg text-white)
  Wrapper: <a href="tel:+918877555999">

Item 1 — Email:
  Icon: <Mail>
  Label: "EMAIL"
  Value: "support@luxuvia.in"
  Wrapper: <a href="mailto:support@luxuvia.in">

Item 2 — Address:
  Icon: <MapPin>
  Label: "ADDRESS"
  Value: "Peerzadiguda, East Hyderabad, Telangana 500039"
  (no link wrapper — plain div)

Item 3 — Working Hours:
  Icon: <Clock> (lucide-react)
  Label: "WORKING HOURS"
  Value: "Mon - Sat: 9:00 AM - 7:00 PM"
  (no link wrapper — plain div)
```

**WhatsApp CTA card** (below contact items):
```
className: "mt-8 border border-[#1e2d50] rounded-lg p-6 bg-[#0f1628]"

- H3: "WhatsApp Us"
  className: font-heading text-xl text-white mb-2
- Subtext: "Connect with us instantly on WhatsApp for quick responses."
  className: font-body text-sm text-[#6b7fa0] mb-5
- Button: data-testid="whatsapp-link"
  href: "https://wa.me/918877555999?text=Hi%2C%20I'm%20interested%20in%20Luxuvia%20projects"
  className: "inline-flex items-center gap-2.5 bg-[#25d366] hover:bg-[#20bd5a]
              text-white font-body font-semibold text-sm px-6 py-3 rounded-md
              transition-colors"
  Icon: <Phone> w-4 h-4 (or a WhatsApp SVG)
  Label: "CHAT ON WHATSAPP"
  (Button is green #25d366, NOT the orange btn-primary)
```

---

**RIGHT COLUMN — Inquiry Form**
```
Outer card: className="bg-[#0f1628] border border-[#1e2d50] rounded-lg p-8"
data-testid="inquiry-form"

Form header:
  H3: "Book a Site Visit"
    className: font-heading text-2xl text-white mb-1
  Subtext: "Fill in your details and we'll arrange a free visit."
    className: font-body text-sm text-[#6b7fa0] mb-8

Fields — all inputs:
  Base input style:
    className: "w-full bg-transparent border-b border-[#1e2d50] text-white
                font-body text-sm py-3 placeholder-[#3a4a6a] focus:outline-none
                focus:border-[#f59218] transition-colors"
  (Bottom-border only style — NO box/card border on inputs, just an underline)

  Field 1 — Full Name (full width):
    <input type="text" placeholder="Full Name *"
           data-testid="inquiry-name" />

  Field 2 & 3 — side by side on md+ (grid grid-cols-1 md:grid-cols-2 gap-4):
    <input type="tel"   placeholder="Phone Number"
           data-testid="inquiry-phone" />
    <input type="email" placeholder="Email Address"
           data-testid="inquiry-email" />

  Field 4 — Message (full width):
    <textarea placeholder="Your Message (optional)" rows={3}
              data-testid="inquiry-message"
              className="... resize-none" />

Submit button (full width, mt-8):
  data-testid="inquiry-submit"
  className: "btn-primary w-full py-4 font-body font-semibold uppercase
              tracking-[0.2em] text-sm rounded-sm"
  Label: "SUBMIT"

Below button:
  <p className="font-body text-xs text-[#6b7fa0] text-center mt-4">
    or call <a href="tel:+918877555999"
               className="text-[#f59218] hover:underline">+91 8877 555 999</a>
  </p>
```

---

**Additional lucide-react icons needed for ContactPage:**
`Phone`, `Mail`, `MapPin`, `Clock`

---

## 🔗 Routing (`App.js`)

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/"         element={<HomePage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="/about"    element={<AboutPage />} />
    <Route path="/contact"  element={<ContactPage />} />
    {/* Project detail pages */}
    <Route path="/projects/:slug" element={<ProjectDetailPage />} />
  </Routes>
  <Footer />
  <WhatsAppWidget />
</BrowserRouter>
```

---

## 📦 Dependencies

```json
{
  "react": "^18",
  "react-router-dom": "^6",
  "tailwindcss": "^3",
  "lucide-react": "latest",
  "sonner": "latest"
}
```

**Lucide icons used:**
`Phone`, `Mail`, `MapPin`, `Menu`, `X`, `MessageCircle`, `ArrowUpRight`, `ChevronRight`,
`Clock`, `Target`, `Heart`, `Shield`, `Award`, `Users`, `LayoutTemplate`

---

## ✅ Copilot Task Instructions

When I ask you to implement or extend a component, follow these rules:

1. **Always use `data-testid` attributes** exactly as specified above — they are used for testing and visual editing.
2. **Never use inline styles** unless absolutely necessary — prefer Tailwind utility classes.
3. **Use `font-heading` for all headings, `font-body` for all body/nav/button text** — these classes come from `App.css`.
4. **Colors must match the design system** — use `text-[#f59218]` for orange accents, `text-[#6b7fa0]` for muted text, `text-[#eef1f6]` for bright white, `bg-[#0a0e1a]` or `bg-[#0f1628]` for surfaces.
5. **Reuse shared components** — `<Navbar>`, `<Footer>`, `<WhatsAppWidget>`, and `<ProjectCard>` are already built; do not recreate them inline.
6. **Maintain the stagger animation pattern** on list/grid renders using `transition-delay`.
7. **Use `lucide-react` for all icons** — no other icon libraries.
8. **The `btn-primary` class** already handles the gradient, color, transition, and hover state — just add it as a `className` without overriding.
9. **Form submissions** on `ContactPage` should call a POST to `/api/inquiries` with `{ name, phone, email, message }` and show a success toast via `sonner`.
10. **Mobile-first**: all layouts start at `grid-cols-1` and expand at `md:` / `lg:` breakpoints.

---

---

### `ProjectDetailPage.js`
**Route:** `/projects/:slug`
**data-testid:** `project-detail-page`

**Dependencies (beyond base stack):**
```js
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import InquiryForm from "@/components/InquiryForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
```

**API call:**
```js
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
axios.get(`${API}/projects/${slug}`)
// project object shape — see "API Data Shape" below
```

---

#### `Reveal` helper component (defined at top of file)
```jsx
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVis(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      className={`${className} transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
```

---

#### Icon map (amenities use string keys from API → lucide-react components)
```js
import {
  MapPin, ArrowLeft, Building2, Calendar, BadgeCheck, Phone, ExternalLink,
  Car, Droplets, Dumbbell, Heart, BedDouble, Baby, Leaf, Shield, ArrowUpDown,
  BatteryCharging, Factory, Sun, Zap, CloudDrizzle, Camera, Compass, Footprints,
  CheckCircle, Bed, Bath, Maximize, ChevronRight
} from "lucide-react";

const iconMap = {
  Car, Droplets, Dumbbell, Heart, BedDouble, Baby, Leaf, Shield,
  ArrowUpDown, BatteryCharging, Factory, Sun, Zap, CloudDrizzle,
  Camera, Compass, Footprints, Building2, CheckCircle,
  Theater: Building2, Trees: Leaf
};
```

---

#### Status badge map
```js
const st = {
  completed:   { bg: "bg-emerald-600/20", text: "text-emerald-300",  label: "Completed"   },
  in_progress: { bg: "bg-[#f59218]/15",   text: "text-[#f5a848]",    label: "In Progress" },
  upcoming:    { bg: "bg-[#1e3a8a]/40",   text: "text-[#6b8fd4]",    label: "Upcoming"    },
}[project.status] || { bg: "bg-[#1e3a8a]/40", text: "text-[#6b8fd4]", label: "Upcoming" };
```

---

#### Loading & error states
```jsx
// Loading spinner
if (loading) return (
  <div className="pt-24 min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#f59218] border-t-transparent rounded-full animate-spin" />
  </div>
);

// Not found
if (!project) return (
  <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-3">
    <p className="font-heading text-2xl text-white">Project not found</p>
    <Link to="/projects" className="text-[#f59218] font-body text-sm hover:underline">
      Back to Projects
    </Link>
  </div>
);
```

---

#### Section 1 — Hero (`relative h-[50vh] min-h-[380px]`)
```
- Full-bleed building image (object-cover w-full h-full)
- heroImg logic:
    slug === "sri-laxmi-janardhana-nilayam"
      → project.building_images?.[0] || framerusercontent fallback
    else
      → project.images?.[0] || project.building_images?.[0] || pexels fallback
- Gradient overlay: bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/50 to-transparent

Bottom-left overlay content (pb-8):
  - Back link: data-testid="back-to-projects"
    <Link to="/projects"> ← All Projects </Link>
    className: inline-flex items-center gap-1.5 text-[#6b7fa0] hover:text-[#f59218]
               font-body text-sm mb-3 transition-colors
    Icon: <ArrowLeft className="w-4 h-4">

  - Status badge + RERA badge (flex items-center gap-3 mb-2):
    Status: ${st.bg} ${st.text} px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-wider rounded-sm
    RERA (if project.rera_id):
      className: flex items-center gap-1 text-emerald-400 text-[11px] font-body
      Icon: <BadgeCheck className="w-3.5 h-3.5">
      Text: "RERA: {project.rera_id}"

  - H1: project.name
    className: font-heading text-3xl sm:text-4xl lg:text-5xl text-white mb-1

  - Address row:
    <MapPin className="w-4 h-4 text-[#f59218]">
    <span className="font-body text-sm">{project.address || project.location}</span>
    If project.map_link: <ExternalLink> link "Map" → opens in new tab
```

---

#### Section 2 — Quick Info Bar (`bg-[#1e3a8a]`)
```
grid grid-cols-2 md:grid-cols-5 gap-5, py-5

5 items rendered from array:
  { icon: Building2, l: "Configuration", v: project.configurations   }
  { icon: Maximize,  l: "Sizes",         v: project.size_range       }
  { icon: Building2, l: "Total Units",   v: `${project.total_units} Units` }
  { icon: Calendar,  l: "Possession",    v: project.possession_date  }
  { icon: BadgeCheck,l: "Price",         v: project.price_range || "On Request" }

Each item: flex items-start gap-2.5
  Icon: w-4 h-4 text-[#f59218] mt-0.5 shrink-0
  Label: font-body text-[10px] text-white/50 uppercase tracking-wider
  Value: font-body text-sm text-white
```

---

#### Section 3 — Tabs
```
<Tabs defaultValue="overview">
  <TabsList className="bg-[#0f1628] border border-[#1e2d50] p-1 w-full
                       flex flex-wrap justify-start gap-0 h-auto rounded-md">

Tabs: ["Overview", "Apartments", "Floor Plans", "Amenities",
       "Specifications", "Location", "Contact"]

Each <TabsTrigger>:
  value={tab.toLowerCase().replace(" ", "-")}
  data-testid={`tab-${tab.toLowerCase().replace(" ", "-")}`}
  className: font-body text-[11px] uppercase tracking-wider px-4 py-2.5
             data-[state=active]:bg-[#f59218] data-[state=active]:text-white rounded-sm
```

---

#### Tab — OVERVIEW (`value="overview"`)
**Layout:** `grid grid-cols-1 lg:grid-cols-3 gap-10`

**Left (lg:col-span-2):**
```
1. <Reveal>
   H2: "About This Project" — font-heading text-2xl text-white mb-3
   <div className="accent-line mb-5">
   <p>{project.description}</p> — font-body text-[#8090b0] leading-relaxed mb-8

2. <Reveal delay={100}> — if project.highlights?.length > 0
   H3: "Key Highlights" — font-heading text-lg text-white mb-4
   grid grid-cols-1 sm:grid-cols-2 gap-3
   Each highlight card: bg-[#0f1628] border border-[#1e2d50] p-4 rounded-md
     <CheckCircle className="w-4 h-4 text-[#f59218] mt-0.5 shrink-0">
     <span className="font-body text-sm text-[#8090b0]">{h}</span>

3. <Reveal delay={200}> — if project.building_images?.length > 0
   H3: "Gallery" — font-heading text-lg text-white mb-4
   grid grid-cols-3 gap-3
   Each image: aspect-[4/3] overflow-hidden border border-[#1e2d50] rounded-md
     <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
```

**Right (sticky sidebar):**
```
className: bg-[#0f1628] border border-[#1e2d50] p-5 sticky top-28 rounded-md

H3: "Project Overview" — font-heading text-lg text-white mb-2
<div className="accent-line mb-4">

Table rows (space-y-3):
  { l: "Project Size", v: `${project.buildings} Building(s) - ${project.total_units} Units` }
  { l: "Floors",       v: project.floors ? `${project.floors} Floors` : "—"                 }
  { l: "Area",         v: project.project_area || "—"                                        }
  { l: "Launch",       v: project.launch_date || "—"                                         }
  { l: "Possession",   v: project.possession_date                                             }
  { l: "Avg. Price",   v: project.avg_price || "On Request"                                  }
  { l: "RERA",         v: project.rera_id || "—"                                             }

Row style: flex justify-between items-center border-b border-[#1e2d50] pb-2.5 last:border-0
  Label: font-body text-[11px] text-[#4a5a7a] uppercase tracking-wider
  Value: font-body text-sm text-white

"Enquire Now" button (mt-5):
  <Link to="/contact" className="block w-full btn-primary py-3 font-semibold uppercase
                                  tracking-[0.2em] text-[11px] font-body text-center rounded-sm">
    Enquire Now
  </Link>
```

---

#### Tab — APARTMENTS (`value="apartments"`)
```
H2: "Browse Apartments" — font-heading text-2xl text-white mb-3
<div className="accent-line mb-6">

grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4

Each apartment card:
  <Link to={`/projects/${slug}/apartment/${apt.num}`} 
        data-testid={`apt-card-${apt.num}`} 
        className="card-lift bg-[#0f1628] border border-[#1e2d50] overflow-hidden group block rounded-md">

  Image area (relative h-40 overflow-hidden):
    <img src={apt.thumbnail} className="card-img w-full h-full object-cover transition-transform duration-500">
    BHK badge: absolute top-2 left-2
      className: bg-[#f59218] text-white px-2 py-0.5 text-[10px] font-body font-bold rounded-sm

  Content (p-4):
    H4: "Apartment {apt.num}" — font-heading text-lg text-white group-hover:text-[#f59218] mb-1
    Subtitle: "{apt.facing} · {apt.area} SFT" — font-body text-xs text-[#6b7fa0] mb-2.5
    Icons row (flex items-center gap-4 text-[#4a5a7a] font-body text-[11px]):
      <Bed> {apt.beds}   |  <Bath> {apt.baths}  |  <Maximize> {apt.area}
    "View Details →" row (mt-3, text-[#f59218] text-[11px] font-body uppercase tracking-wider):
      gap increases on group-hover
      <ChevronRight className="w-3.5 h-3.5">

Fallback if no apartments:
  <p className="text-[#4a5a7a] font-body text-sm py-8 text-center">
    Apartment details coming soon for this project.
  </p>
```

---

#### Tab — FLOOR PLANS (`value="floor-plans"`)
```
H2: "Floor Plans"
<p>: "Select a floor plan & explore every room in 3D/360"
  className: font-body text-sm text-[#6b7fa0] mb-6
<div className="accent-line mb-8">

For each fp in project.floor_plans (Reveal, delay={i*100}, mb-8):
  Wrapper: bg-[#0f1628] border border-[#1e2d50] p-6 rounded-md
  Title: "{fp.group} — {fp.range}"
    className: font-heading text-xl text-[#f59218] mb-1
  Image (if fp.image): w-full max-w-lg mt-4 mb-4 border border-[#1e2d50] rounded

  Variants list (space-y-2 mt-4):
    Each: flex items-center justify-between bg-[#0a0e1a] border border-[#1e2d50] p-3 rounded-sm
      Left:  font-body text-sm text-[#8090b0] — "{v.desc}"
      Right: font-body text-xs text-[#4a5a7a] — "{v.units} unit(s)"
```

---

#### Tab — AMENITIES (`value="amenities"`)
```
H2: "Amenities Included"
<div className="accent-line mb-8">

grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4

Each amenity (Reveal, delay={i*60}):
  className: bg-[#0f1628] border border-[#1e2d50] p-5 text-center
             hover:border-[#f59218]/30 transition-all group rounded-md

  Icon container (w-11 h-11, rounded-full, mx-auto mb-3):
    default: bg-[#1e3a8a]/30 border border-[#3b5fc0]/30
    hover:   bg-[#f59218]/15 border-[#f59218]/40
    Icon: const Icon = iconMap[a.icon] || CheckCircle
          className: w-5 h-5 text-[#f59218]

  Name: font-body text-sm text-[#8090b0] — {a.name}
```

---

#### Tab — SPECIFICATIONS (`value="specifications"`)
```
H2: "Specifications"
<div className="accent-line mb-8">

grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5

Each spec category card (Reveal, delay={i*100}):
  className: bg-[#0f1628] border border-[#1e2d50] p-5 rounded-md
  H3: {spec.category} — font-heading text-lg text-[#f59218] mb-3
  <ul className="space-y-2.5">
    Each item: flex items-start gap-2
      <CheckCircle className="w-3.5 h-3.5 text-[#3b5fc0] mt-0.5 shrink-0">
      <span className="font-body text-sm text-[#8090b0]">{item}</span>

Data for Sri Laxmi Janardhana Nilayam:
  { category: "Floor & Counter", items: [
      "Living/Dining: Vitrified Tiles", "Bedrooms: Vitrified Tiles",
      "Kitchen: Vitrified Tiles", "Toilets: Anti Skid Ceramic Tiles" ] },
  { category: "Fittings", items: [
      "Electrical: Finolex Cables", "Kitchen: Granite Platform with SS Sink",
      "Doors: Teak Wood Frame & Shutter", "Windows: Aluminium Powder Coated Glazed" ] },
  { category: "Wall & Ceiling", items: [
      "Interior: Asian Paints", "Exterior: Asian Paints" ] }
```

---

#### Tab — LOCATION (`value="location"`)
```
H2: "Location & Nearby"
<div className="accent-line mb-8">

grid grid-cols-1 lg:grid-cols-2 gap-8

LEFT:
  Address card (bg-[#0f1628] border border-[#1e2d50] p-5 mb-5 rounded-md):
    H3: "Address" — font-heading text-lg text-white mb-2
    <p>{project.address}</p> — font-body text-sm text-[#8090b0]
    "Open in Google Maps" link (if project.map_link):
      className: inline-flex items-center gap-1.5 text-[#f59218] text-sm font-body mt-3
      Icon: <ExternalLink className="w-3.5 h-3.5">

  H3: "Nearby Landmarks" — font-heading text-lg text-white mb-3
  space-y-2.5 list:
    Each: flex items-center gap-3 bg-[#0f1628] border border-[#1e2d50] p-3.5 rounded-md
      <MapPin className="w-4 h-4 text-[#3b5fc0] shrink-0">
      Left: p.name (font-body text-sm text-white) + p.type (font-body text-[11px] text-[#4a5a7a])
      Right: p.distance (font-body text-sm text-[#f59218] shrink-0)

  Data for Sri Laxmi Janardhana Nilayam:
    { name: "Infosys SEZ Pocharam",       type: "workplace",  distance: "5 mins"  }
    { name: "Uppal Metro Station",        type: "transport",  distance: "15 mins" }
    { name: "Inner Ring Road",                type: "transport",  distance: "15 mins" }
    { name: "Rockwoods International School", type: "school",    distance: "Nearby"  }
    { name: "Alroyce Multi Speciality Hospital", type: "hospital", distance: "11 mins" }

RIGHT:
  Google Maps iframe (if project.map_link):
    src: `https://maps.google.com/maps?q=${encodeURIComponent(project.address)}&output=embed`
    className: w-full h-full min-h-[300px]
    Wrapper: bg-[#0f1628] border border-[#1e2d50] min-h-[300px] rounded-md overflow-hidden

  Fallback (no map_link): centered MapPin icon + location name
```

---

#### Tab — CONTACT (`value="contact"`)
```
grid grid-cols-1 lg:grid-cols-2 gap-10

LEFT:
  H2: "Interested in {project.name}?"
      className: font-heading text-2xl text-white mb-3
  <div className="accent-line mb-5">
  <p>: "Fill in the form and our team will get back to you..."
      className: font-body text-[#6b7fa0] mb-5 leading-relaxed
  Phone link: flex items-center gap-2.5 text-[#8090b0] hover:text-[#f59218] transition-colors
    <Phone className="w-5 h-5 text-[#f59218]">
    <span className="font-body text-lg">+91 8877 555 999</span>

RIGHT:
  Card: bg-[#0f1628] border border-[#1e2d50] p-7 rounded-md
  H3: "Request Details" — font-heading text-lg text-white mb-5
  <InquiryForm projectSlug={project.slug} projectName={project.name}
               inquiryType="project_inquiry" />
```

---

#### `InquiryForm` component (`src/components/InquiryForm.js`)
```jsx
// Props: { projectSlug, projectName, inquiryType }
// Submits POST to `${API}/inquiries` with { name, phone, email, message, project_slug, inquiry_type }
// Shows sonner toast on success/error
// Same underline-only input style as ContactPage form
// Submit button: btn-primary w-full, label "Send Enquiry"
```

---

#### API Data Shape — `project` object
```js
{
  slug: "sri-laxmi-janardhana-nilayam",
  name: "Luxuvia Sri Laxmi Janardhana Nilayam",
  status: "in_progress",           // "completed" | "in_progress" | "upcoming"
  rera_id: "P02200007285",
  address: "Survey No. 45, 49 & 51, Plot No. 33/A & 33/B, Narapally, Pocharam, East Hyderabad",
  location: "Narapally, Hyderabad",
  map_link: "https://maps.google.com/?q=...",
  description: "Luxuvia presents luxurious 2 BHK and 3 BHK homes along the Warangal-Hyderabad Highway...",
  configurations: "2 & 3 BHK Apartments",
  size_range: "1,235 - 1,995 sq.ft.",
  total_units: 80,
  possession_date: "2026",
  price_range: null,                // null → shows "On Request"
  buildings: 1,
  floors: 7,
  project_area: "0.96 Acres",
  launch_date: "2023",
  avg_price: null,
  building_images: ["https://..."],
  images: [],
  highlights: [
    "80 Luxurious Apartments within a secured society",
    "Highway facing on Warangal-Hyderabad Highway",
    "5 mins from Infosys SEZ Pocharam",
    "15 mins from Uppal and Inner Ring Road",
    "5 Unique Floor Plans from 1,235 to 1,995 sq.ft.",
    "RERA Approved - P02200007285"
  ],
  apartments: [
    { num: 1, bhk: "3 BHK", facing: "Corner Facing | WEST", area: 1995, beds: 3, baths: 3, thumbnail: "https://..." },
    { num: 2, bhk: "3 BHK", facing: "WEST",  area: 1680, beds: 3, baths: 3, thumbnail: "https://..." },
    { num: 3, bhk: "2 BHK", facing: "EAST",  area: 1235, beds: 2, baths: 2, thumbnail: "https://..." },
    { num: 4, bhk: "2 BHK", facing: "NORTH", area: 1240, beds: 2, baths: 2, thumbnail: "https://..." },
    { num: 5, bhk: "2 BHK", facing: "EAST",  area: 1235, beds: 2, baths: 2, thumbnail: "https://..." },
    { num: 6, bhk: "2 BHK", facing: "NORTH", area: 1240, beds: 2, baths: 2, thumbnail: "https://..." },
    { num: 7, bhk: "3 BHK", facing: "EAST & WEST", area: 1530, beds: 3, baths: 3, thumbnail: "https://..." },
    { num: 8, bhk: "3 BHK", facing: "NORTH", area: 1535, beds: 3, baths: 3, thumbnail: "https://..." }
  ],
  floor_plans: [
    { group: "2 BHK", range: "1235-1240 SFT", image: "https://...",
      variants: [
        { desc: "1235 SFT / East Facing",  units: 2 },
        { desc: "1235 SFT / West Facing",  units: 2 },
        { desc: "1240 SFT / North Facing", units: 4 }
      ]
    },
    { group: "3 BHK", range: "1530-1995 SFT", image: "https://...",
      variants: [
        { desc: "1680 SFT / West Facing",         units: 2 },
        { desc: "1530 SFT / East & West Facing",  units: 2 },
        { desc: "1535 SFT / North Facing",        units: 2 },
        { desc: "1995 SFT / Corner West Facing",  units: 1 }
      ]
    }
  ],
  amenities: [
    { name: "Amphitheatre",          icon: "Theater"         },
    { name: "Children's Play Area",  icon: "Baby"            },
    { name: "Guest Rooms",           icon: "BedDouble"       },
    { name: "Multipurpose Hall",     icon: "Building2"       },
    { name: "Outdoor Gym",           icon: "Dumbbell"        },
    { name: "Aerobics/Yoga Station", icon: "Heart"           },
    { name: "Drivers Waiting Rooms", icon: "Car"             },
    { name: "Jogging Track",         icon: "Footprints"      },
    { name: "Organic Plantation",    icon: "Leaf"            },
    { name: "Peripheral Tree Planting", icon: "Trees"        },
    { name: "24x7 Security",         icon: "Shield"          },
    { name: "Power Backup",          icon: "BatteryCharging" },
    { name: "Lift(s)",               icon: "ArrowUpDown"     },
    { name: "Rain Water Harvesting", icon: "CloudDrizzle"    },
    { name: "Solar Energy",          icon: "Sun"             },
    { name: "Sewage Treatment Plant",icon: "Factory"         }
  ],
  specifications: [
    { category: "Floor & Counter", items: [
        "Living/Dining: Vitrified Tiles", "Bedrooms: Vitrified Tiles",
        "Kitchen: Vitrified Tiles", "Toilets: Anti Skid Ceramic Tiles" ]},
    { category: "Fittings", items: [
        "Electrical: Finolex Cables", "Kitchen: Granite Platform with SS Sink",
        "Doors: Teak Wood Frame & Shutter", "Windows: Aluminium Powder Coated Glazed" ]},
    { category: "Wall & Ceiling", items: [
        "Interior: Asian Paints", "Exterior: Asian Paints" ]}
  ],
  nearby_places: [
    { name: "Infosys SEZ Pocharam",           type: "workplace", distance: "5 mins"  },
    { name: "Uppal Metro Station",            type: "transport", distance: "15 mins" },
    { name: "Inner Ring Road",                type: "transport", distance: "15 mins" },
    { name: "Rockwoods International School", type: "school",    distance: "Nearby"  },
    { name: "Alroyce Multi Speciality Hospital", type: "hospital", distance: "11 mins" }
  ]
}
```

---

## 🚀 Next Features to Build

Suggest and implement these features when asked:

- **`HomePage.js`** improvements — hero section with `hero-gradient`, featured projects carousel, stats bar, testimonials.
- **Scroll-aware Navbar** — add `glass-dark` class when `scrollY > 50` using `useEffect` + `window.addEventListener('scroll', ...)`.
- **Form validation** on `ContactPage` — validate required fields, phone format (10-digit Indian), and email before submit.
- **Active route detection** in `Navbar` — use `useLocation()` from react-router-dom to apply `text-[#f59218]` to the current route's nav link.
- **Filter animation** on `ProjectsPage` — animate cards out/in when filter changes using CSS transitions.
- **WhatsApp popup panel** — expand `WhatsAppWidget` to show a chat-style popup with a pre-filled message input before opening WhatsApp.
