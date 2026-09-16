# Chandrapura Kidney Care Hospital - CI/CD Operations & Runbook

## 1. Overview & Architecture

The Chandrapura Kidney Care Hospital web platform utilizes a monorepo structure containing both the React 18 frontend and the Node.js/Express backend. The CI/CD pipelines are built on **GitHub Actions** and enforce rigorous quality and security standards.

```
       [ Git Push / Pull Request ]
                   │
                   ▼
┌─────────────────────────────────────────┐
│              CI Pipeline                │
│  - Dependency Review                    │
│  - ESLint & Prettier Checking           │
│  - Frontend Build Verification          │
│  - Unit & Integration Tests (Vitest)    │
│  - Coverage Enforcement (>=70%)         │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│          Security Pipeline              │
│  - Secret Scanning (TruffleHog)         │
│  - Vulnerability Audit (npm audit)      │
│  - Static Analysis (CodeQL SAST)        │
└──────────────────┬──────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────┐
│           E2E & Accessibility           │
│  - End-to-End User Flow (Playwright)    │
│  - Accessibility Audit (axe-core WCAG)  │
└──────────────────┬──────────────────────┘
                   │
        [ On Merge to 'main' ]
                   ▼
┌─────────────────────────────────────────┐
│          Staging Deployment             │
│  - Automated Staging Deploy             │
│  - Smoke Tests & Health Check Verification
└──────────────────┬──────────────────────┘
                   │
         [ Manual Sign-Off / Approval ]
                   ▼
┌─────────────────────────────────────────┐
│        Production Deployment            │
│  - Pre-deployment DB Snapshot           │
│  - Zero-Downtime Blue/Green Rollout     │
│  - Automated Post-Deploy Health Check   │
│  - Auto-Rollback on Failure             │
└─────────────────────────────────────────┘
```

---

## 2. GitHub Actions Workflows Guide

### 1. `ci.yml` (Continuous Integration)

- **Triggers**: Pull requests to `main`, pushes to `main` and `develop`.
- **Jobs**:
  - `lint-and-format`: Runs ESLint and Prettier.
  - `unit-and-integration`: Runs Vitest with coverage report upload.
  - `build-verification`: Runs client production bundle compilation.

### 2. `security.yml` (Security & Vulnerability Scanning)

- **Triggers**: Nightly schedule (00:00 UTC) and PRs targeting `main`.
- **Jobs**:
  - `secret-scan`: TruffleHog / GitGuardian credential leak detection.
  - `dependency-audit`: `npm audit --audit-level=high`.
  - `codeql-analysis`: Static code analysis for JavaScript/TypeScript vulnerabilities.

### 3. `e2e.yml` (End-to-End & WCAG Accessibility)

- **Triggers**: Pull requests and staging pre-release validation.
- **Jobs**:
  - `playwright-tests`: Launches headless browser testing for patient booking journeys, doctor portal authentication, and real-time OPD queue status.
  - `accessibility-audit`: Validates WCAG 2.1 AA compliance across all public views using axe-core.

### 4. `deploy-staging.yml` (Staging Environment Release)

- **Triggers**: Push to `main` following successful CI/Security passes.
- **Actions**:
  - Builds Docker image or deployment artifact.
  - Deploys to Staging server.
  - Runs smoke test against `/api/health`.

### 5. `deploy-production.yml` (Production Deployment)

- **Triggers**: Release tags (e.g., `v*.*.*`) or manual approval workflow dispatch.
- **Actions**:
  - Takes database backup.
  - Deploys verified container/artifact to production.
  - Executes live `/api/health` check.
  - Triggers instant rollback if health check fails.

---

## 3. Local Development & Pipeline Execution Commands

| Task                        | Command                    | Description                                          |
| :-------------------------- | :------------------------- | :--------------------------------------------------- |
| **Run All Tests**           | `npm run test`             | Executes unit and integration test suites            |
| **Run Unit Tests**          | `npm run test:unit`        | Executes frontend and utility tests                  |
| **Run Integration Tests**   | `npm run test:integration` | Executes API endpoint tests with SQLite in-memory DB |
| **Run E2E Tests**           | `npm run test:e2e`         | Executes Playwright browser scenarios                |
| **Run Code Coverage**       | `npm run test:coverage`    | Generates LCOV and text coverage summary             |
| **Lint Check**              | `npm run lint`             | Checks JavaScript and JSX code formatting & syntax   |
| **Format Code**             | `npm run format`           | Auto-formats code with Prettier                      |
| **Security Audit**          | `npm run audit:check`      | Scans dependencies for vulnerabilities               |
| **Production Build**        | `npm run build`            | Builds client React app for production               |
| **Start Production Server** | `npm start`                | Starts Express server serving static frontend        |

---

## 4. Required Repository Secrets & Variables

Set these secrets in GitHub repository settings (**Settings > Secrets and variables > Actions**):

| Secret Name         | Purpose                                     | Example Value                          |
| :------------------ | :------------------------------------------ | :------------------------------------- |
| `JWT_SECRET`        | Signing key for doctor JWT authentication   | High entropy 64-char string            |
| `STAGING_HOST`      | Staging server IP or hostname               | `staging.chandrapurahospital.com`      |
| `STAGING_SSH_KEY`   | Deploy key for staging host                 | Private OpenSSH Key                    |
| `PROD_HOST`         | Production server IP or hostname            | `chandrapurahospital.com`              |
| `PROD_SSH_KEY`      | Deploy key for production host              | Private OpenSSH Key                    |
| `SLACK_WEBHOOK_URL` | (Optional) Alerts for build/deploy failures | `https://hooks.slack.com/services/...` |
