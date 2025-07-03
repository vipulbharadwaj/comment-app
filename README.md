# 🗨️ MERN Comment App (Dockerized)

A full-stack **commenting system** built using the **MERN stack** (MongoDB, Express, React, Node.js), containerized with Docker for easy deployment and scaling.

---

## 🔧 Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Express.js + Node.js
- **Database**: MongoDB Atlas
- **Auth**: JWT-based authentication
- **Containerization**: Docker & Docker Compose

---

## 📁 Folder Structure

```
.
├── comment-app-backend/
│   └── .env
├── comment-app-frontend/
│   └── .env
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Setup

### 🔐 Backend (`comment-app-backend/.env`)

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

### 🌐 Frontend (`comment-app-frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started (Dockerized)

> 🐳 Ensure Docker is installed: https://docs.docker.com/get-docker/

### 🔨 Build & Run the App

```bash
docker-compose up --build
```

### 📍 URLs

- Frontend → `http://localhost:5173`
- Backend  → `http://localhost:5000`

---

## 🔐 Features

- User authentication (JWT)
- Register / Login
- Post comments
- View all comments
- Protected routes
- Dockerized setup (no local installation needed)

---

## 📦 API Endpoints

| Method | Route                | Description        |
|--------|----------------------|--------------------|
| POST   | `/api/auth/register` | Register user      |
| POST   | `/api/auth/login`    | Login user         |
| GET    | `/api/comments`      | Fetch all comments |
| POST   | `/api/comments`      | Post a comment     |

---

## 🧼 .dockerignore (Example)

Ensure `.dockerignore` includes:

```
node_modules
npm-debug.log
Dockerfile
.dockerignore
.env
```

> This prevents local system artifacts from being copied into containers.

---

## 🐙 How to Push to GitHub

```bash
# Initialize and push
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin master
```

---

## 📌 Optional Deployment (Render or Netlify)

- You can deploy:
  - **Frontend** to Netlify or Vercel
  - **Backend** to Render or Railway
- Make sure to update `VITE_API_BASE_URL` in frontend `.env` with the deployed backend URL.

---

## 📝 License

This project is open-sourced for learning purposes.

---

## 🙋‍♂️ Author

Made with ❤️ by **Vipul Bharadwaj**
