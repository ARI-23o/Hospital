# Chandrapura Kidney Care Hospital - Healthcare Security & Compliance Checklist

## 1. Regulatory Context & Objectives

Chandrapura Kidney Care Hospital handles sensitive electronic Protected Health Information (ePHI) including:

- Patient appointments, full names, phone numbers, email addresses.
- Clinical symptoms, nephrology/urology conditions, dialysis schedules.
- Doctor consultation logs, OPD queue status, and administrative actions.

Compliance Target Frameworks:

- **India DPDP Act (Digital Personal Data Protection Act 2023)**
- **DISHA (Digital Information Security in Healthcare Act - India)**
- **HIPAA Security & Privacy Rules** (Standard benchmark for international compliance)
- **OWASP Top 10 Web Application Security Risks (2021)** & **API Security Top 10 (2023)**

---

## 2. Security Control Checklist

### A. Data Protection & Privacy (ePHI / PII)

- [x] **Zero Patient PII in Client-Side Storage**: No patient clinical histories, tokenized health records, or sensitive personal data stored in unencrypted `localStorage` or `sessionStorage`.
- [x] **Zero Patient Data in Source Control**: `.gitignore` strictly configured to exclude `.env`, `*.db`, `*.sqlite`, and log files.
- [x] **Masked Logging**: Logs must never write patient phone numbers, clinical complaints, or auth tokens in plaintext.
- [x] **Data Minimization**: Inquiries and appointment forms collect only the minimum required medical fields needed for scheduling triage.
- [x] **Secure Data Transmission**: All communication between client and server enforces TLS 1.3 / HTTPS in production.

### B. Authentication, Authorization & Session Management

- [x] **JWT Token Security**:
  - Signed using cryptographically strong secret (`JWT_SECRET` min 32 characters in production).
  - Short-lived tokens (2h expiry) with explicit expiration checks.
  - Role-Based Access Control (`role: 'doctor' | 'admin' | 'staff'`) enforced on all administrative endpoints.
- [x] **Password Storage**: Argon2 / Bcrypt password hashing (`bcryptjs` with salt rounds >= 10). Plaintext passwords prohibited.
- [x] **Brute-Force & Rate Limiting**:
  - Global API rate limiter (`express-rate-limit`: max 100 requests per 15 min window).
  - Strict Auth limiter (`/api/auth/login`: max 5 requests per 15 min window).
  - Appointment booking limiter (`/api/appointments`: max 10 requests per hour).
- [x] **Session Invalidation**: Doctor portal provides an explicit logout mechanism that destroys local tokens and clears memory state.

### C. Application Hardening & HTTP Security Headers

- [x] **Helmet HTTP Headers**:
  - `Content-Security-Policy (CSP)`: Restricted script, style, and connect sources.
  - `X-Frame-Options: DENY` (prevents Clickjacking).
  - `X-Content-Type-Options: nosniff` (prevents MIME sniffing).
  - `Strict-Transport-Security (HSTS)`: `max-age=31536000; includeSubDomains; preload`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
- [x] **Cross-Origin Resource Sharing (CORS)**: Strict origin whitelisting (`CLIENT_URL` / `DOMAIN`), preventing unauthorized cross-origin API calls.
- [x] **Input Validation & Sanitization**:
  - Validation of all request schemas (phone format regex, email regex, date validity).
  - Parameterized SQLite queries via `better-sqlite3` to eliminate SQL Injection (SQLi).
  - Output encoding to prevent Cross-Site Scripting (XSS).

### D. Infrastructure & Deployment Security

- [x] **Automated Secret Scanning**: GitGuardian / TruffleHog / GitHub Secret Scanning in CI pipeline to prevent credential commits.
- [x] **Automated Vulnerability Auditing**: `npm audit --audit-level=high` runs on every pull request and push to main.
- [x] **Static Application Security Testing (SAST)**: CodeQL / ESLint security rules scanning code for unsafe patterns.
- [x] **Container Security**:
  - Non-root user execution (`USER node`).
  - Multi-stage minimal Alpine/Debian slim base image.
  - Read-only container root filesystem with designated ephemeral volume mounts.
- [x] **Health Check Endpoint**: Public unauthenticated `/api/health` endpoint providing uptime and database connectivity status without exposing sensitive system metadata.

### E. Backup, Retention & Incident Response

- [x] **Database Backup Routine**: Automated daily snapshot of SQLite database (`hospital.db`) to encrypted off-site cloud storage.
- [x] **Data Retention Policy**: Completed OPD queue tickets archived after 30 days. Temporary booking logs purged after 90 days.
- [x] **Incident Response Protocol**:
  - Step 1: Detect breach / anomaly via error monitoring or audit alerts.
  - Step 2: Revoke active JWT secret and rotate database credentials immediately.
  - Step 3: Notify Data Protection Officer (DPO) and affected patients within 72 hours in accordance with DPDP Act.
  - Step 4: Patch vulnerability, deploy fix through CI/CD with full rollback verification.

---

## 3. Pre-Deployment Quality Sign-Off Table

| Quality Gate        | Requirement                              | Tool / Verification         | Status         |
| :------------------ | :--------------------------------------- | :-------------------------- | :------------- |
| **Secret Leaks**    | 0 detected API keys / passwords          | TruffleHog / GitGuardian    | Mandatory PASS |
| **Vulnerabilities** | 0 High / Critical CVEs                   | `npm audit` & Trivy / Snyk  | Mandatory PASS |
| **Test Suite**      | 100% Pass Rate across Unit & Integration | Vitest & Supertest          | Mandatory PASS |
| **Code Coverage**   | >= 70% Lines, Functions, Statements      | `@vitest/coverage-v8`       | Mandatory PASS |
| **Lint & Syntax**   | 0 Errors, 0 Unused Variables             | ESLint & Prettier           | Mandatory PASS |
| **Accessibility**   | WCAG 2.1 AA Compliance (0 violations)    | `@axe-core/playwright`      | Mandatory PASS |
| **Health Check**    | `HTTP 200 { "status": "ok" }`            | Automated curl / smoke test | Mandatory PASS |
