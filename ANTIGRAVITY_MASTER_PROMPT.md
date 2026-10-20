# ANTIGRAVITY MASTER PROMPT — STUDENTDAYS.CO WEBSITE

You are a senior full-stack engineer, product designer, security engineer, database engineer, and QA engineer. Build the complete StudentDays.co website from the files in THIS workspace. Work on the actual code, not just a plan. Inspect the files first, implement incrementally, run tests, fix issues, and document the final result.

## 1. Read the workspace files first

The workspace contains:
- `references/StudentDays.co-reference.html` — primary website visual reference.
- `references/StudentDays.co-alternate-reference.html` — additional reference to inspect for useful content/assets.
- `assets/studentdays-hero.jpeg` — the exact supplied lake photograph showing two people wearing StudentDays-branded hoodies.

Inspect both HTML references, their CSS, embedded assets, sections, typography, colors, copy, layout, interactions, and responsive behavior before building. The primary reference is the source of truth for the website's visual identity. Do not discard useful existing copy or assets without a reason.

## 2. Strict intro and homepage image requirement

The supplied `assets/studentdays-hero.jpeg` is the ONLY intro visual to use. Completely remove/refrain from implementing the older cinematic intro in the HTML reference. Do not combine the old intro with the new one. Use the supplied photograph as the new intro and as the main homepage hero image. Do not substitute stock imagery, generated imagery, or a placeholder. Preserve the photograph's aspect ratio and hoodie branding; use responsive object-fit/object-position rather than stretching it. Make the transition into the homepage smooth, brief, accessible, and skippable. Do not replay an intrusive intro on every internal navigation. Respect reduced-motion preferences and provide a fallback if the image fails to load.

## 3. Protect existing projects

First inspect the current folder and identify whether it contains an existing mobile app, backend, or website. The existing StudentDays mobile application must remain intact. Do not overwrite, delete, rename, or restructure unrelated existing files. Prefer implementing this website in a clearly isolated `studentdays-website` directory or a separate website repository. If a backend already exists, inspect it and decide whether it can be reused safely; do not create duplicate services without reason. Do not connect to production services or perform production writes.

## 4. Required development architecture

For a new, isolated website, use:
- Frontend: React + TypeScript + Vite + React Router.
- Backend: Node.js + Express + TypeScript, REST API.
- Local database: PostgreSQL + Prisma ORM, migrations, seed script.
- Styling: reproduce the existing design using the least disruptive styling approach; Tailwind is acceptable if it does not distort the reference.
- Tests: suitable unit/API and browser/end-to-end tests.

If an existing codebase establishes compatible technologies, inspect and reuse them instead of forcing a needless rewrite. Keep frontend, API, database access, validation, and business logic separated. Never let the frontend connect directly to the database.

## 5. Local-only development at first

The complete application must run locally before production integration. Do not require production API keys. Do not connect to a production database. Do not use live payments. Use local PostgreSQL, local API, local filesystem image storage, and a mock payment provider.

Suggested local defaults (adapt only if needed):
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- API prefix: `/api/v1`
- Health endpoint: `/api/v1/health`
- `PAYMENT_MODE=mock`
- `STORAGE_MODE=local`

Provide `.env.example`, never commit real `.env` secrets, provide Docker Compose for local PostgreSQL if useful, and document database creation, migrations, seeding, startup, tests, and troubleshooting. Use safe development-only secrets. Do not silently fall back to cloud services. Do not reset or delete an unknown database.

## 6. Design requirements

Recreate the primary HTML reference faithfully: preserve the original brand palette, typography, hierarchy, spacing, section structure, visual tone, logo treatment, cards, and messaging wherever appropriate. Do not replace it with a generic travel template. Keep the StudentDays brand premium, cinematic, student-focused, and travel-oriented. Use the new lake photo both for the new intro and homepage hero. Avoid unnecessary overlays or effects that change the photo. Make all pages responsive for phones, tablets, laptops, and desktops. Add semantic HTML, keyboard support, visible focus, accessible labels, sensible contrast, and reduced-motion support.

Homepage should preserve relevant original sections, such as the main hero/CTA, platform introduction/features, memories/gallery, featured trips, college partners, trip discovery CTA, contact details, and footer. Preserve verified content from the HTML. Do not invent real partnerships, reviews, statistics, contact details, company policies, or business claims. Clearly label seeded sample content as demo data.

## 7. Pages and roles

Build working routes for:
Public: Home, Explore Trips, Trip Details, Memories/Gallery, College Partners, About, Contact, Login, Student Registration, Forgot Password, Privacy Policy, Terms, Cancellation/Refund Policy, Not Found.
Student: Dashboard, Profile, My Bookings, Booking Details, Payment Instructions, Submit Payment Reference, Booking Status, Notifications.
Coordinator: Dashboard, Assigned Trips, Participant Management, booking/payment status overview, limited to assigned trips.
Admin: Admin Login, Dashboard, Trip Management, Create/Edit Trip, Availability, Bookings, Students, Coordinators, Colleges, Payment Verification, Gallery, Notifications, Website Content, Audit Logs, Settings.

Roles: `MASTER_ADMIN`, optionally restricted `ADMIN`, `COORDINATOR`, `STUDENT`. Implement server-side permission checks; hiding UI or routes is not security. A student must never access another student's private records. Coordinators must only access assigned trips and permitted actions. Do not trust role/user IDs supplied by the client.

## 8. Trip discovery and trip management

Each trip should support a stable ID, title, slug, description, destination, departure/start location, dates/times, registration deadline, price, capacity, confirmed/reserved count, remaining seats, status, cover image, additional images, included services, exclusions, itinerary, meeting instructions, cancellation policy, assigned coordinator, and timestamps as appropriate.

Trip statuses may include Draft, Published, Fully Booked, Cancelled, Completed. Admins can create, edit, publish/unpublish, archive/cancel under business rules, update capacity/pricing, manage images, assign coordinators, and inspect participants. Public users see only published, bookable trips. Prevent bookings for unavailable trips. Enforce availability and capacity on the backend using database transactions/concurrency-safe logic, not just frontend counts.

## 9. Authentication and account security

Implement registration, login/logout, secure password hashing, validation, authentication middleware, role-based authorization, protected routes, session/token expiration, refresh handling if used, password-reset architecture, account status management, and profile management. Create the first local administrator via a secure documented seed/setup process; do not hardcode a production password.

Security: do not store plaintext passwords, expose password hashes, trust client roles, log secrets, expose tokens, allow privilege escalation, or rely on frontend-only authorization. Apply login rate limiting, validation/sanitization, sensible CORS, secure cookie/token handling, and secure error responses. Prefer secure HttpOnly cookie patterns where compatible with the architecture. Never put secrets in frontend-exposed variables.

## 10. Booking workflow

Implement a persistent booking flow:
1. Student discovers and opens a published trip.
2. Student enters the required participant/booking details.
3. Backend validates the trip, capacity, quantity, and current price.
4. Backend safely reserves available capacity and creates a booking/reference.
5. Student sees payment instructions.
6. Student submits a demo payment reference.
7. Authorized admin reviews it and approves/rejects.
8. Booking and payment status are updated consistently and shown to the student.

Prevent duplicate requests, duplicate bookings caused by double-clicks, overbooking, negative quantities, client-side price manipulation, unauthorized changes/cancellations, and invalid state transitions. Use transactions and idempotency where appropriate. Persist records so they survive refresh/relogin.

Use a clear state machine, with appropriate states such as `PENDING_PAYMENT`, `PAYMENT_SUBMITTED`, `CONFIRMED`, `CANCELLED`, `REFUND_PENDING`, `REFUNDED`, and `REJECTED` as suitable. Document allowed transitions. Keep payment and booking state consistent.

## 11. Mock payments only

No live payment integration in this phase. Implement a mock/manual UPI-reference flow in `PAYMENT_MODE=mock`. Use an explicitly labelled DEMO UPI ID/placeholder QR only; never use real banking details. Students can submit a demo UTR/reference. Save it in the local database and show it as awaiting verification. Authorized admins can approve/reject it; record who acted and when. Prevent students from verifying their own payment. Validate references and prevent duplicates according to documented rules. Clearly state that demo mode does not transfer money.

Create a provider interface for future work, e.g. `createPayment`, `verifyPayment`, `handleWebhook`, `refundPayment`, but implement only the mock provider. Never accept a frontend claim of payment success without future server-side verification. Document exactly where a real gateway and webhook will be connected later.

## 12. Database and API

Design a normalized PostgreSQL schema with constraints, foreign keys, indexes, timestamps, and migrations. Include appropriate models for User, profile if needed, Trip, TripImage, itinerary items, College, Booking, BookingParticipant if needed, Payment, PaymentVerification, CoordinatorTripAssignment, Notification, GalleryImage, ContactSubmission, AuditLog, sessions/refresh tokens if required, and application settings if useful. Avoid unnecessary tables. Seed only fictional demo data.

Create a consistent REST API under `/api/v1`, including health, public trips/colleges/gallery, authentication, student profile/bookings/notifications, coordinator assigned-trip/participants routes, and admin dashboard/trips/bookings/users/coordinators/payments/colleges/gallery/contact/audit routes. Adjust endpoint names if needed, but implement all frontend-required operations. Define request validation, auth/role requirements, response formats, HTTP codes, pagination, and safe error responses. Do not expose sensitive fields. Add API tests.

Use a centralized typed API client in the frontend with configurable base URL, loading/error/success states, validation, pagination, and sensible retry behavior. All core forms/buttons must call real local API operations and persist data. No fake success messages for operations that have not succeeded.

## 13. Gallery, college partners, contact, and uploads

Gallery: responsive grid, captions, optional trip association, admin upload, published/unpublished state. The supplied lake image remains the homepage hero asset and must not be overwritten.

Colleges: name, slug, description, logo, website, location, status, timestamps as appropriate. Do not claim demo colleges are confirmed partners.

Contact: validate inputs/email, basic spam protection, save messages in the local DB, and make them available to authorized admins. No external email service required locally; clearly mark email sending as disabled in development if not configured.

Local image uploads: trip images, college logos, gallery images. Validate actual file type and size, generate safe filenames, prevent path traversal, restrict upload permissions, store metadata/path in DB, and handle missing files. Do not allow arbitrary executable uploads. Create a storage abstraction for future cloud storage.

## 14. Admin dashboard

Calculate dashboard metrics from actual local DB data: students, published/upcoming trips, bookings, pending payment submissions, confirmed/cancelled bookings, and capacity where appropriate. Provide search, filters, sorting, pagination, loading/empty/error states, confirmation dialogs, and meaningful success/failure messages.

Every control must work through the backend. Admins can manage trips, availability, bookings, users, coordinators/assignments, colleges, gallery, payment submissions, notifications, contact submissions, content, settings, and audit logs according to permissions. Log sensitive administrative actions. Payment approval/rejection must be authorized and recorded.

## 15. API routes (suggested)

- `GET /api/v1/health`
- `GET /api/v1/trips`, `GET /api/v1/trips/:slug`
- `GET /api/v1/colleges`, `GET /api/v1/gallery`
- `POST /api/v1/auth/register`, `/login`, `/logout`, `/refresh`, `/forgot-password`, `/reset-password`; `GET /api/v1/auth/me`
- `GET/PATCH /api/v1/me/profile`
- `GET /api/v1/me/bookings`, `GET /api/v1/me/bookings/:id`, `POST /api/v1/bookings`, `POST /api/v1/bookings/:id/cancel`, `POST /api/v1/bookings/:id/payments`, `GET /api/v1/me/notifications`
- Coordinator routes for assigned trips and participants.
- Admin routes for dashboard, trip CRUD, bookings, users, coordinators, payments approve/reject, colleges, gallery, contact submissions, audit logs.

Treat these as an initial contract; adapt consistently if required. Do not leave frontend-required operations unimplemented.

## 16. Testing and acceptance workflow

Use automated unit/API and end-to-end tests where practical. Test:
- Health endpoint, migrations, seed script.
- Registration/login/logout, invalid credentials, permissions.
- Student cannot call admin routes or read another student's bookings.
- Coordinator cannot access unassigned trips.
- Trip create/edit/publish/unpublish and availability.
- Booking persistence and safe capacity enforcement under duplicate/concurrent requests.
- Unavailable trips cannot be booked.
- Duplicate submissions handled safely.
- Payment references persist; authorized approve/reject works; unauthorized/self-approval fails; invalid transitions fail.
- Contact submissions persist.
- File upload validation.
- Homepage image and intro use `assets/studentdays-hero.jpeg` (copy it to the actual frontend public assets location as needed); old intro is absent.
- Main routes and navigation work, forms validate, protected routes are guarded, mobile layouts work, and browser console/server logs have no unexplained errors.

Run this end-to-end scenario: start local DB -> migrate -> seed -> start backend/frontend -> register demo student -> login -> explore a trip -> book it -> verify DB record -> submit mock payment reference -> log in as admin -> approve and separately test rejection -> log in as student -> confirm status appears. Test capacity and unauthorized access. Run the production build. Fix errors and rerun relevant tests. Never claim a test passed unless actually executed; report tests that could not run and why.

## 17. Production-readiness without production integration

Structure adapters/configuration so production services can be added later without rewriting business logic. In this phase: local DB/API/filesystem/mock payments only. Do not deploy automatically, perform real transactions, insert production credentials, or write to production services. Add a checklist for future production database, API/frontend hosting, payment gateway, verified webhooks, cloud storage, email, domain/HTTPS, secrets, backups, monitoring, and migrations.

## 18. SEO, performance, quality

Add page titles, meta descriptions, social metadata, canonical URL configuration, sitemap/robots approach, semantic headings, lazy loading for noncritical images, sensible image performance, code splitting where useful, and efficient/paginated database queries. Keep the supplied hero photo visually faithful. Use TypeScript, reusable components, clean separation, consistent naming, and centralized configuration. Avoid giant monoliths, unnecessary dependencies, fake core APIs, ignored errors, and unimplemented TODOs for required features.

## 19. Required documentation

Create README with project overview, architecture, prerequisites, local PostgreSQL/Docker setup, environment variables, migrations, seeds, first-admin setup, frontend/backend startup, local URLs, API docs, test commands, mock payment flow, upload location, troubleshooting, and production integration checklist. Document API routes and role permissions. Create a testing report listing tests actually run, pass/fail, fixes, remaining issues, and manual verification steps.

## 20. Execution plan — do not stop at planning

Phase A: inspect project and reference files; protect existing app.
Phase B: establish isolated frontend/backend/local database.
Phase C: recreate reference design and new intro/hero.
Phase D: database schema, migrations, seed data, API.
Phase E: authentication, roles, trip management, bookings, mock payments.
Phase F: student/coordinator/admin pages, gallery, colleges, contact.
Phase G: security checks, automated tests, end-to-end workflow.
Phase H: production build, documentation, final report.

Implement incrementally and verify each phase. If a tool/request limit interrupts work, leave the repository in a runnable state, update a `PROGRESS.md` with completed work, current state, exact next steps, and test results, then continue from there. Do not try to send the entire source code in one response; write files directly in the workspace.

## 21. Strict rules

- Use only the supplied lake photo for the intro and homepage hero.
- Remove the old intro completely.
- Preserve the reference design.
- Do not break or overwrite the existing mobile app.
- Do not connect production services, credentials, or live payments.
- Do not invent real partnerships, reviews, or statistics.
- Do not leave core buttons nonfunctional.
- Do not hardcode dashboard counts.
- Do not rely on frontend-only permissions.
- Do not expose private data.
- Do not delete original reference files.
- Do not run destructive DB operations on an unknown environment.
- Do not claim completion without executing tests/build.
- If something cannot be completed, implement the safe local version and document the limitation rather than pretending it works.

## 22. Final handover report

When done, report:
1. What was implemented.
2. Exact website project directory.
3. Commands to start local DB, backend, and frontend.
4. Local URLs.
5. How to create/login as initial local admin (do not expose real secrets).
6. Steps to test booking and mock payment approval/rejection.
7. Tests actually executed and results.
8. Known issues or tests not run.
9. Production integration steps still required.

Begin by inspecting the workspace files, then build the working application. Do not reply with only a plan.
