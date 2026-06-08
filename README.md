# 🌸 She Can Foundation

A full-stack web application for **She Can Foundation** — empowering women through opportunities. This app includes a public contact form and a secure admin dashboard to manage submissions.

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🎨 Frontend | https://she-can-foundation-five-delta.vercel.app |
| ⚙️ Backend API | https://she-can-foundation-biit.onrender.com |

---

## 🔐 Admin Access

| Field | Value |
|---|---|
| 👤 Username | `admin` |
| 🔑 Password | `mohit123` |

> Go to `/admin` route and login with the credentials above.

---

## ✨ Features

- 📬 **Contact Form** — Public users can send messages to the foundation
- 🔐 **Admin Login** — JWT-based secure authentication
- 📊 **Admin Dashboard** — View all form submissions with stats
- 🔍 **Search** — Filter submissions by name or email
- 🗑️ **Delete** — Remove any submission from the dashboard
- 📱 **Responsive** — Works on mobile, tablet, and desktop
- 🎨 **Beautiful UI** — Glassmorphism design with pink/rose theme

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router v6 | Navigation |
| Axios | API Calls |
| React Hook Form | Form Handling |
| Yup | Form Validation |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| CORS | Cross-Origin Requests |
| dotenv | Environment Variables |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Cloud Database |

---


## ⚙️ API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Public | Health check |
| POST | `/api/submit` | Public | Submit contact form |
| POST | `/api/login` | Public | Admin login |
| GET | `/api/submissions` | 🔒 Protected | Get all submissions |
| DELETE | `/api/submissions/:id` | 🔒 Protected | Delete a submission |

---

## 🚀 Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/mohittiwari98/she_can_foundation.git
cd she_can_foundation
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT token signing |
| `PORT` | Server port (default: 5000) |

---

## 👨‍💻 Developer

**Mohit Tiwari**

- GitHub: [@mohittiwari98](https://github.com/mohittiwari98)

---

## 📄 License

This project is built for **She Can Foundation** 🌸  
All rights reserved © 2026
