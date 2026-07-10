# Sampath Naik — Portfolio Management System

A full-stack personal portfolio website with a custom-built admin panel (CMS) for managing all content — no code changes needed to update academics, certifications, projects, experience, or skills.

**Live Site:** [sampath-naik-portfolio.vercel.app](https://sampath-naik-portfolio.vercel.app)

---

## Overview

This project consists of two independent applications sharing one database:

1. **Public Portfolio** — a black-and-white themed, animated portfolio website that dynamically displays content
2. **Admin Panel** — a password-protected dashboard where the owner can add, edit, and delete every piece of content shown on the public site, including image/file uploads

All content (photos, resume, certificates, project screenshots) is stored on Cloudinary for permanent, reliable delivery.

---

## Tech Stack

### Frontend
- **React.js** (Vite) — component-based UI
- **Tailwind CSS v4** — utility-first styling with custom theme tokens
- **Framer Motion** — scroll-reveal and micro-interaction animations
- **React Router** — client-side routing (public site + protected admin routes)
- **Axios** — API communication with JWT token interceptor

### Backend
- **FastAPI** (Python) — REST API framework
- **SQLAlchemy** — ORM for MySQL
- **MySQL** — relational database
- **JWT (python-jose)** — admin authentication
- **Passlib / Bcrypt** — password handling
- **Cloudinary** — persistent cloud file storage for images, PDFs, and documents

### Infrastructure
- **Vercel** — frontend hosting
- **Render** — backend hosting
- **Railway** — MySQL database hosting
- **Cloudinary** — media/file storage

---

## Features

### Public Site
- Fully responsive, black-and-white design with a mint accent color
- Animated dark/light mode toggle (persists via localStorage)
- Scroll-reveal animations throughout
- Sections: Hero, Stats, About/Skills, Academics (with auto-fetched institution logos), Certifications, Projects (multi-image slider), Experience, Contact
- Dynamic institution logo autocomplete (Hipolabs Universities API + Clearbit)

### Admin Panel
- Secure JWT-based login
- Full CRUD for: Academics, Certifications, Projects, Experience, Skills
- Profile management (photo, resume, About text)
- Multi-file image uploads per project
- Company/issuer logo uploads

---

## Project Structure
portfolio-management-system/
├── backend/
│   ├── app/
│   │   ├── core/          # config, security, JWT dependencies
│   │   ├── db/             # database connection, models
│   │   ├── schemas/        # Pydantic request/response models
│   │   ├── routers/        # API route handlers
│   │   ├── crud/           # database operations
│   │   └── main.py         # FastAPI app entrypoint
│   ├── requirements.txt
│   └── .env                # local environment variables (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── admin/           # admin panel pages
│   │   ├── components/
│   │   │   ├── public/      # public site sections
│   │   ├── context/         # Auth & Theme context providers
│   │   ├── pages/           # route-level pages
│   │   ├── services/        # API client (axios)
│   │   └── App.jsx
│   ├── .env.development
│   ├── .env.production
│   └── vercel.json          # SPA routing config
│
└── README.md
---

## Local Development Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
```

Create `backend/.env`:

DATABASE_URL=mysql+pymysql://root:<password>@localhost:3306/portfolio_db
SECRET_KEY=<your_secret_key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
ADMIN_USERNAME=<username>
ADMIN_PASSWORD=<password>
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

Run the server:
```bash
uvicorn app.main:app --reload
```
API docs available at `http://127.0.0.1:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`

---

## Deployment

| Service | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Root directory: `frontend`, auto-deploys on push to `main` |
| Backend | Render | Root directory: `backend`, auto-deploys on push to `main` |
| Database | Railway | MySQL instance |
| File Storage | Cloudinary | Handles all uploads (images, PDFs) |

Environment variables must be set separately on Render (backend) and Vercel (`VITE_API_URL`).

---

## Author

**Sampath Naik Mudavath**
- GitHub: [@Sampath2905](https://github.com/Sampath2905)
- LinkedIn: [mudavath-sampathnaik](https://www.linkedin.com/in/mudavath-sampathnaik-1884b62a8)
- Email: sampathnaikmudavath@gmail.com

---

## License

This project is personal and proprietary. Not licensed for reuse or redistribution.