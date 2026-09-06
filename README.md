# SK TOURS & TRAVELS — Salem

[![Vite](https://img.shields.io/badge/Vite-8.2-blue?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47a248?logo=mongodb)](https://www.mongodb.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Ready-00c7b7?logo=netlify)](https://www.netlify.com/)

> **Salem's Premier Luxury Holidays, Group Departures & Private Custom Tours Partner.**  
> Official HQ: **L_4, Staff Quaters, Periyar University, Salem - 636011**  
> 24/7 Hotline: **+91 99946 44744** | Email: **sktoursandtravelsalem@gmail.com**

---

## 🌟 Key Features

### 🎬 1. 100% Fullscreen Video Intro Experience
- **Cinematic Edge-to-Edge Video**: Plays `sk_intro.mp4` full fit screen across both mobile and desktop screens.
- **Touch / Click to Enter**: Tap anywhere on the screen to seamlessly enter the website.
- **Auto-Enter**: Automatically transitions into the website upon video completion.
- **Mute / Unmute**: Audio toggle for high-definition sound.
- **Instant Replay**: Re-trigger anytime from the Navbar or Footer.

### ✈️ 2. Official Brochure Tour Catalog
- Complete authentic packages from the official brochure catalog:
  - **Kashmir**: Srinagar Paradise 4N/5D, Jammu-Kashmir Classic 5N/6D, Gurez Valley 6N/7D, Beyond Kashmir Trek 4N/5D
  - **Himachal**: Manali & Kasol 4N/5D, Manali-Kasol-Atal Tunnel 5N/6D
  - **Kerala**: Wayanad 2N/3D, Munnar 2N/3D, Munnar-Thekkady 3N/4D, Munnar-Alleppey Houseboat 4N/5D, South India Tapestry 10N/11D
  - **Leh – Ladakh**: Pangong 4N/5D, Nubra Valley & Pangong Tso 5N/6D
  - **Rajasthan**: Jaipur-Jodhpur-Jaisalmer 4N/5D, Jaipur-Jodhpur-Udaipur 4N/5D, Grand Circuit 6N/7D
  - **Delhi & Agra**: Delhi-Agra 2N/3D, Golden Triangle 3N/4D
  - **Hyderabad**: Ramoji Film City 2N/3D, Extended Heritage 3N/4D
  - **Meghalaya**: Living Root Bridges & Dawki 3N/4D, Adventure Mawlyngbna 4N/5D
  - **Additional Destinations**: Gujarat & Rann of Kutch, Sikkim & Darjeeling, Uttar Pradesh & Varanasi

### 📊 3. Transparent Brochure Pricing Matrix
- Detailed Pax-based tariff matrix:
  - **2 Pax**: 1 Room, Sedan
  - **4 Pax**: 2 Rooms, Sedan
  - **6 Pax**: 3 Rooms, XUV
  - **8 Pax**: 4 Rooms, Tempo Traveller
  - **10 Pax**: 5 Rooms, Tempo Traveller
- Tiered rates for **Standard**, **Deluxe**, **Super Deluxe**, and **Luxury 5-Star** stays.

### 📱 4. 100% Mobile-Friendly & Responsive Layout
- Optimized for iPhone, Android, tablets, and widescreen laptops.
- 1-column mobile search panel without horizontal overflow or squishing.
- Touch-friendly filter chips, sticky tabs, and smooth bottom drawer navigation.

### 🛡️ 5. Admin CRM Operations (`/admin`)
- Accessible at `/admin` with secure credentials.
- **Dashboard**: Live metrics, revenue trends, and operational breakdown.
- **Leads & Enquiries**: Stage tracking (New, Quoted, Negotiating, Won, Lost).
- **Tour Packages**: Full CRUD management with pricing tables.
- **Destinations & Reviews**: Manage showcased destinations and customer feedback.
- **MongoDB Atlas Sync**: Dual-layer architecture with automated cloud synchronization and resilient zero-downtime local store fallback.

---

## 🚀 Quick Start (Local Development)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/sktoursandtravelsalem/sk-tours-and-travels-salem.git
cd sk-tours-and-travels-salem
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/sk_tours?retryWrites=true&w=majority
```

### 3. Run Development Server
```bash
# Runs both Frontend (Vite on :5173) and Backend (Express on :5000) concurrently
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Netlify Deployment

This repository is pre-configured for instant **Netlify** deployment:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **SPA Redirects**: Included in `netlify.toml` and `public/_redirects` (`/*  /index.html  200`).

### Deploy via Netlify CLI:
```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

---

## 🏢 Contact & Official Details

- **Company**: SK Tours & Travels
- **Salem HQ**: L_4, Staff Quaters, Periyar University, Salem - 636011, Tamil Nadu, India
- **Phone**: [+91 99946 44744](tel:+919994644744)
- **WhatsApp**: [+91 99946 44744](https://wa.me/919994644744)
- **Email**: sktoursandtravelsalem@gmail.com

---

© 2026 SK TOURS & TRAVELS SALEM. All rights reserved.
