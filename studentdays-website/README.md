# StudentDays.co — Official Platform Website & REST API

India's first student experience platform — curated collegiate journeys, youth communities, and adventure travel built for university students.

---

## 1. Project Overview & Architecture

The StudentDays website and booking backend are architected as an isolated, modern full-stack application inside `studentdays-website/`:

- **Frontend (`studentdays-website/frontend`)**:
  - React 19 + TypeScript + Vite + React Router v7.
  - Authentic reference recreation reproducing colors (`--ink`, `--blue`, `--yellow`, `--deep`), typography (`Bricolage Grotesque`, `DM Sans`, `Dancing Script`), `.glass` blurred buttons, polaroid memory wall, review marquee, and college chapters.
  - **Intro & Hero Visual**: Powered strictly by the supplied lake photograph `assets/studentdays-hero.jpeg` showing two travelers in StudentDays hoodies. Smooth, brief, accessible, and skippable intro with reduced-motion support. The older cinematic video intro has been completely removed.
- **Backend (`studentdays-website/backend`)**:
  - Node.js + Express + TypeScript REST API under `/api/v1`.
  - Concurrency-safe atomic database transactions for booking reservations and capacity management.
  - Dual cookie (HttpOnly) & Bearer token JWT authentication with password hashing (`bcryptjs`).
  - Strict server-side role-based access control (`MASTER_ADMIN`, `ADMIN`, `COORDINATOR`, `STUDENT`).
- **Database & Storage**:
  - PostgreSQL 16 with Prisma ORM (schema, migrations, seeding).
  - Concurrency-safe transactions to prevent overbooking and race conditions.
  - Local filesystem storage abstraction with MIME/extension checks and path traversal protection.
  - Mock UPI payment provider simulating UPI payments and manual admin verification.

---

## 2. Directory Structure

```
studentdays-website-starter/
├── references/                                # Original reference HTML and assets
│   ├── StudentDays.co-reference.html          # Primary visual source of truth
│   └── StudentDays.co-alternate-reference.html
├── assets/
│   └── studentdays-hero.jpeg                  # Exact supplied lake photo for intro & hero
├── studentdays-website/                       # Isolated full-stack implementation
│   ├── docker-compose.yml                     # Local PostgreSQL 16 container definition
│   ├── backend/                               # REST API service
│   │   ├── prisma/
│   │   │   ├── schema.prisma                  # Normalized PostgreSQL schema
│   │   │   └── seed.ts                        # Seed script for demo accounts & trips
│   │   ├── src/
│   │   │   ├── routes/                        # Health, Auth, Trips, Bookings, Admin, Coordinator, etc.
│   │   │   ├── middleware/                    # Auth, Role guard, Zod validator, Rate limiter
│   │   │   ├── services/                      # Mock payment, Local storage, Audit, Notifications
│   │   │   ├── utils/                         # Token helpers, booking reference generators
│   │   │   ├── config.ts                      # Centralized configuration
│   │   │   ├── server.ts                      # Express app factory
│   │   │   └── index.ts                       # Server entrypoint
│   │   └── tests/
│   │       ├── api.test.ts                    # 19 integration tests
│   │       └── e2e_scenario.test.ts           # 9 end-to-end acceptance tests
│   └── frontend/                              # React + Vite application
│       ├── public/assets/                     # Public assets (hero image, logo, reference images)
│       ├── src/
│       │   ├── components/                    # Navbar, IntroHero, TripCard, BookingModal, StatusBadge
│       │   ├── context/                       # AuthContext, ToastContext
│       │   ├── pages/                         # Public, Student, Coordinator, and Admin pages
│       │   ├── services/                      # Typed ApiClient
│       │   └── test/                          # IntroHero Vitest component tests
```

---

## 3. Quick Start & Startup Commands

### Prerequisites
- Node.js v18+ (tested on Node v26)
- PostgreSQL (running locally or via Docker Compose)

### Step 1: Start PostgreSQL Database
Using Docker Compose:
```bash
cd studentdays-website
docker compose up -d
```
Or use an existing local PostgreSQL service on `localhost:5432`.

### Step 2: Configure Backend Environment
```bash
cd studentdays-website/backend
cp .env.example .env
```
Ensure `DATABASE_URL` matches your local PostgreSQL credentials, e.g.:
```ini
DATABASE_URL="postgresql://studentdays:studentdays_dev_password@localhost:5432/studentdays_dev?schema=public"
```

### Step 3: Run Migrations & Seed Database
```bash
cd studentdays-website/backend
npx prisma generate
npx prisma db push
npm run prisma:seed
```

### Step 4: Start Backend API
```bash
cd studentdays-website/backend
npm run dev
# Server starts on http://localhost:3000
# Health check: http://localhost:3000/api/v1/health
```

### Step 5: Start Frontend Application
In a separate terminal:
```bash
cd studentdays-website/frontend
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 4. Local URLs

| Application / Endpoint | URL |
|---|---|
| **Frontend Website** | `http://localhost:5173` |
| **Backend REST API** | `http://localhost:3000/api/v1` |
| **API Health Endpoint** | `http://localhost:3000/api/v1/health` |
| **Trips Catalog** | `http://localhost:5173/trips` |
| **Student Dashboard** | `http://localhost:5173/student/dashboard` |
| **Coordinator Portal** | `http://localhost:5173/coordinator/dashboard` |
| **Admin Dashboard** | `http://localhost:5173/admin/dashboard` |
| **Payment Verification Desk**| `http://localhost:5173/admin/payments` |

---

## 5. Seeded Demo Accounts & First Admin Setup

The database seed script automatically creates verified local testing accounts with pre-configured permissions:

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Master Admin** | `admin@studentdays.co` | `AdminStudentDays2026!` | Full platform administration, payment approval, user roles, trip management |
| **Trip Coordinator** | `coordinator@studentdays.co` | `CoordStudentDays2026!` | Assigned trip roster, attendance, emergency contacts |
| **Student Traveler** | `student@studentdays.co` | `StudentDays2026!` | Trip browsing, booking reservations, mock payment submissions |

> [!TIP]
> The `/login` page includes **Local Testing Quick-Fill** buttons for `Student`, `Coordinator`, and `Admin` to test every role with a single click.

---

## 6. Testing the Booking & Mock Payment Flow

Follow this end-to-end verification walkthrough:

1. **Browse Trips**: Navigate to `http://localhost:5173/trips`. Select **Kerala, God's Own Country** or **Gokarna & Dandeli Expedition**.
2. **Book Seats**: Click **Book** or open the trip details and click **Book Your Spot**. Choose the number of seats (e.g. 2 seats).
3. **Participant Details**: Fill participant names, emails, and emergency contact phone. Click **Confirm & Proceed to Payment**.
4. **Reserve & Payment Step**: The backend reserves the seats atomically and generates a reference (e.g. `SD-2026-KL01`). You are redirected to `/student/bookings/:id`.
5. **Submit Mock UPI Reference**: Under Payment Instructions, click **Auto-fill Demo UTR** (generates `DEMO-UTR-XXXXXXXXXXXX`) and submit. Status transitions to `PAYMENT_SUBMITTED` (Awaiting Admin Verification).
6. **Admin Verification**:
   - Log in as Master Admin (`admin@studentdays.co`).
   - Go to `/admin/dashboard` or `/admin/payments`.
   - The pending submission appears in the **Payment Verification Desk**.
   - Click **Approve & Confirm Booking**. The booking status transitions to `CONFIRMED`, trip confirmed count increments, and an in-app notification is sent to the student!
   - (Separately test **Reject Reference**: the booking status becomes `REJECTED` and reserved capacity is returned to available pool).
7. **Student Confirmation**: Return to `/student/bookings` or `/student/bookings/:id`. The green confirmed badge and confirmation banner appear!

---

## 7. Automated Test Suite

Both backend and frontend contain automated unit, API, and end-to-end test suites.

### Run Backend Tests (28 tests)
```bash
cd studentdays-website/backend
npm test
```
**Coverage:**
- Health check & database connection
- Public trips, colleges, gallery, and contact submissions
- Student registration, login, logout, password reset
- Server-side role enforcement (student blocked from admin routes)
- Dynamic dashboard metrics calculation
- Atomic booking creation and capacity reservation
- Mock payment submission and self-verification prevention
- Admin payment approval and rejection state transitions
- Coordinator trip isolation (unassigned trips return 403 Forbidden)

### Run Frontend Component Tests (4 tests)
```bash
cd studentdays-website/frontend
npm test
```
**Coverage:**
- Intro and Hero visual strictly uses `assets/studentdays-hero.jpeg`
- Older cinematic video intro is completely absent
- Intro transition is accessible, skippable, and sets session state
- Authentic headlines and typography rendering

### Run Production Build
```bash
# Frontend
cd studentdays-website/frontend
npm run build

# Backend
cd studentdays-website/backend
npm run build
```

---

## 8. REST API Reference

| Method | Endpoint | Role | Description |
|---|---|---|---|
| `GET` | `/api/v1/health` | Public | System & database health |
| `GET` | `/api/v1/trips` | Public | Published trips with search & filters |
| `GET` | `/api/v1/trips/:slug` | Public | Trip details and day-by-day itinerary |
| `GET` | `/api/v1/colleges` | Public | Partner college chapters |
| `GET` | `/api/v1/gallery` | Public | Memories wall photo grid |
| `POST` | `/api/v1/contact` | Public | Contact inquiry with spam rate-limiting |
| `POST` | `/api/v1/auth/register` | Public | Student registration (defaults to STUDENT) |
| `POST` | `/api/v1/auth/login` | Public | Issues JWT & HttpOnly cookies |
| `POST` | `/api/v1/auth/logout` | Authenticated | Clears cookies & session |
| `GET` | `/api/v1/auth/me` | Authenticated | Current user profile |
| `GET` | `/api/v1/me/bookings` | Student | Student's personal bookings |
| `POST` | `/api/v1/bookings` | Student | Concurrency-safe booking reservation |
| `GET` | `/api/v1/bookings/:id` | Student/Staff | Booking details (ownership enforced) |
| `POST` | `/api/v1/bookings/:id/payments` | Student | Submit mock UPI reference (UTR) |
| `POST` | `/api/v1/bookings/:id/cancel` | Student/Admin | Cancel booking & release seats |
| `GET` | `/api/v1/coordinator/assigned-trips` | Coordinator | Trips assigned to logged-in coordinator |
| `GET` | `/api/v1/coordinator/trips/:id/participants` | Coordinator | Participant roster (assignment verified) |
| `GET` | `/api/v1/admin/dashboard` | Admin | Live dynamic database metrics |
| `GET/POST` | `/api/v1/admin/trips` | Admin | Trip CRUD and capacity management |
| `GET` | `/api/v1/admin/payments/pending` | Admin | Payment submissions awaiting verification |
| `POST` | `/api/v1/admin/payments/:id/verify` | Admin | Approve or reject payment reference |
| `GET/PATCH` | `/api/v1/admin/users` | Admin | User management and role assignment |
| `GET` | `/api/v1/admin/audit-logs` | Admin | Security and operational audit log trail |

---

## 9. Production Integration Checklist

When moving from local development to production, complete the following:

- [ ] **Production Database**: Provision a managed PostgreSQL instance (e.g. AWS RDS, Supabase, Neon) with SSL connection pooling.
- [ ] **Secrets & Keys**: Replace dev JWT secrets with cryptographically strong secrets (`openssl rand -base64 64`) set in production environment variables.
- [ ] **Live Payment Gateway**:
  - Implement `createPayment` and `verifyPayment` in `paymentService.ts` for Razorpay / Cashfree / Stripe.
  - Implement cryptographic signature verification on `/api/v1/payments/webhook`.
- [ ] **Cloud File Storage**: Switch `storageService.ts` to AWS S3 / Cloudflare R2 / Google Cloud Storage using pre-signed upload URLs.
- [ ] **Email Delivery**: Connect transactional email provider (Resend, SendGrid, Amazon SES) for password reset links and booking confirmations.
- [ ] **CORS & Domain**: Restrict `FRONTEND_URL` in backend to the production domain (e.g. `https://studentdays.co`).
- [ ] **HTTPS & Reverse Proxy**: Configure Cloudflare / Nginx with HTTP/2 and automated SSL certificates.
