# Marketplace Frontend

A responsive real estate marketplace built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**. The application allows users to browse, search, and manage property listings through a modern, intuitive interface.

## ✨ Features

- User authentication
- Secure JWT cookie authentication
- Property search and filtering
- View detailed property information
- Create, edit, and delete listings
- User profile management
- Responsive design
- Toast notifications
- Loading skeletons
- Protected routes

---

## 🛠 Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Axios
- TailwindCSS
- DaisyUI
- React Hot Toast
- React Icons

---

## Folder Structure

```
src/
├── api/
├── assets/
├── components/
├── pages/
├── store/
├── utils/
├── App.tsx
└── main.tsx
```

---

## Prerequisites

Before running this project, make sure you have installed:

- Node.js 20+
- npm

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

Navigate into the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_BASE_URL=(eg:-http://localhost:3000)
```

Replace the URL with your deployed backend when running in production.

---

## Running the Project

Development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## Production Build

Create an optimized production build.

```bash
npm run build
```

Preview the production build locally.

```bash
npm run preview
```

---

## Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Build production version |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

---

## Backend

This frontend requires the Marketplace Backend API.

Make sure the backend server is running before starting the frontend.

---
