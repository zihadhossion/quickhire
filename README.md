# QuickHire — Simple Job Board Application

> **Fully AI-Native Development**
> This entire project — including all backend APIs, frontend UI, database schema, Redux state management, validation logic, and component architecture — was built exclusively using **Claude Code (AI)** without any manual code written by the developer. Zero lines of code were typed by hand.

A full-stack job board application built with React.js (frontend) and NestJS (backend), allowing users to browse job listings, apply for jobs, and manage listings via an admin panel.

---

## Tech Stack

**Frontend**
- React 19 + React Router 7
- Redux Toolkit (state management)
- Tailwind CSS 4 (styling)
- React Hook Form + Zod (form validation)
- Axios (HTTP client)

**Backend**
- NestJS 11 (Node.js framework)
- TypeORM + PostgreSQL (database)
- JWT (authentication via httpOnly cookies)
- class-validator (input validation)

---

## Features

- Browse and search job listings
- Filter jobs by category and location
- View full job details
- Submit job applications (name, email, resume link, cover note)
- Admin panel: create, edit, and delete job listings
- Admin panel: view and manage all applications with status updates
- Role-based access control (Admin / User)
- Responsive UI matching Figma design

---

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd quickhire
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and JWT secrets (see [Environment Variables](#environment-variables) below).

Run database migrations:

```bash
npm run migration:run
```

Start the backend server:

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000/api`.

Swagger API docs: `http://localhost:3000/api/docs`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Copy the example environment file:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MODE` | Environment mode | `DEV` |
| `ALLOW_ORIGINS` | Comma-separated allowed origins | `http://localhost:5173` |
| `FRONTEND_URL` | Frontend URL | `http://localhost:5173` |
| `POSTGRES_HOST` | PostgreSQL host | `localhost` |
| `POSTGRES_PORT` | PostgreSQL port | `5432` |
| `POSTGRES_USER` | PostgreSQL username | `postgres` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `yourpassword` |
| `POSTGRES_DATABASE` | PostgreSQL database name | `quickhire` |
| `AUTH_JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `AUTH_TOKEN_COOKIE_NAME` | Cookie name for access token | `access_token` |
| `AUTH_TOKEN_EXPIRED_TIME` | Access token TTL (seconds) | `3600` |
| `AUTH_REFRESH_TOKEN_COOKIE_NAME` | Cookie name for refresh token | `refresh_token` |
| `AUTH_REFRESH_TOKEN_EXPIRED_TIME` | Refresh token TTL (seconds) | `604800` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` |

---

## API Endpoints

### Jobs
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/jobs` | List jobs (search, category, location filters) | Public |
| `GET` | `/api/jobs/:id` | Get single job | Public |
| `POST` | `/api/jobs` | Create job | Admin |
| `PATCH` | `/api/jobs/:id` | Update job | Admin |
| `DELETE` | `/api/jobs/:id` | Delete job | Admin |

### Applications
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/applications` | Submit application | Public |
| `GET` | `/api/applications` | List all applications | Admin |
| `PATCH` | `/api/applications/:id/status` | Update status | Admin |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login |
| `GET` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/check-login` | Verify session |

---

## Default Admin Credentials

After running the database seeder:

```
Email:    admin@quickhire.com
Password: Admin@123
```

To run seeders:

```bash
cd backend
npm run seed
```

---

## Project Structure

```
quickhire/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── modules/  # Feature modules (auth, jobs, applications, users)
│   │   ├── core/     # Guards, decorators, interceptors
│   │   ├── shared/   # DTOs, enums, interfaces
│   │   └── database/ # Migrations, seeders
│   └── .env.example
├── frontend/         # React application
│   ├── app/
│   │   ├── pages/    # Route components (home, jobs, apply, admin/*)
│   │   ├── components/  # Reusable UI components
│   │   ├── redux/    # Store, slices
│   │   ├── services/ # API service layer
│   │   └── types/    # TypeScript type definitions
│   └── .env.example
└── README.md
```
