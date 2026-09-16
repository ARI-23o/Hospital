# Contributing to Chandrapura Kidney Care Hospital Web Platform

Thank you for contributing to the Chandrapura Kidney Care Hospital platform. This project supports critical patient care and hospital workflows. All contributions must adhere to high security, accessibility, and quality standards.

---

## Development Workflow

### 1. Prerequisites

- **Node.js**: `v18.x` or `v20.x` (LTS)
- **npm**: `v9.x` or `v10.x`
- **Git**

### 2. Getting Started

```bash
# Clone the repository
git clone https://github.com/ARI-23o/Hospital.git
cd Hospital

# Install root, backend, and client dependencies
npm run install:all
```

### 3. Running the Development Environment

```bash
# Concurrently start backend (port 5000) and frontend (port 5173)
npm run dev
```

---

## Code Quality & Testing Requirements

Before submitting a Pull Request, ensure that all local quality gates pass:

### 1. Linting & Formatting

```bash
# Check code style and linting
npm run lint

# Check Prettier formatting
npm run format:check
```

### 2. Unit and Integration Tests

Every new endpoint, utility, or UI component must include corresponding tests in `tests/`:

```bash
# Run Vitest test suite
npm run test

# Check code coverage (Must meet 70% threshold)
npm run test:coverage
```

### 3. End-to-End & Accessibility Tests

```bash
# Run Playwright E2E and Axe accessibility audits
npm run test:e2e
```

### 4. Dependency & Vulnerability Audit

```bash
# Audit dependencies
npm run audit:check
```

---

## Pull Request Guidelines

1. Create a feature branch: `git checkout -b feature/your-feature-name` or `fix/your-bug-fix`.
2. Commit changes using clear semantic messages (e.g., `feat(queue): add doctor ticket call button`, `fix(auth): correct token expiry check`).
3. Never commit secrets, API keys, credentials, or actual patient data (`.env`, `*.db`).
4. Ensure CI pipeline passes all checks: Lint, Coverage (>=70%), E2E, Security Scans.
5. Request review from maintainers before merging into `main`.
