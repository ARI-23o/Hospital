# Testing Strategy & Quality Assurance Framework

**Project**: Chandrapura Kidney Care  
**Standard**: Healthcare Web Application Quality Standard (WCAG 2.1 AA & Zero-Defect Gates)  
**Version**: 1.0.0

---

## 1. Testing Pyramid Overview

```text
               / \
              /   \
             / E2E \         Playwright (Desktop, Tablet, Mobile) + Axe-Core A11y
            /-------\
           /   API   \       Supertest + Node.js API Integration Tests
          /-----------\
         /    Unit     \     Vitest + React Testing Library (Components, i18n, Logic)
        /---------------\
```

| Layer                    | Tools                                                 | Scope                                                                                                     | Execution Target                  |
| ------------------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------- |
| **Unit Testing**         | Vitest, React Testing Library, JSDOM                  | Component renders, language context, translation dictionaries, form validation logic, utility calculators | Every Pull Request & Local Commit |
| **API Integration**      | Supertest, Vitest, SQLite Memory DB                   | API routes, input validation, slot locking, auth verification, token queue manipulation                   | Every Pull Request & Merge        |
| **End-to-End (E2E)**     | Playwright (Chromium, Firefox, WebKit, Mobile Safari) | Full patient journeys, online appointment booking, doctor portal login, token counter                     | Staging Promotion & Scheduled CI  |
| **Accessibility (a11y)** | `@axe-core/playwright`                                | Color contrast, ARIA tags, screen reader navigation, focus states                                         | Continuous in E2E stage           |
| **Performance (Perf)**   | Lighthouse CI / Playwright metrics                    | Core Web Vitals (LCP, CLS, FID/INP), JavaScript bundle size budget                                        | Quality Gate Verification         |

---

## 2. Coverage Threshold Requirements

Vitest is configured with `@vitest/coverage-v8` to enforce strict coverage gates:

| Metric         | Minimum Required Threshold | Failure Impact |
| -------------- | -------------------------- | -------------- |
| **Statements** | **70%**                    | Pipeline Fails |
| **Branches**   | **60%**                    | Pipeline Fails |
| **Functions**  | **70%**                    | Pipeline Fails |
| **Lines**      | **70%**                    | Pipeline Fails |

> [!IMPORTANT]
> Coverage thresholds must never be lowered to bypass a failing build. If new features or pages are added, corresponding unit and integration tests must be written to satisfy or exceed the 70% threshold.

---

## 3. Test Suites & Test Case Directory Structure

```text
tests/
├── unit/
│   ├── translations.test.js     # Validates parity across English, Marathi, Hindi dictionaries
│   ├── components.test.jsx      # Unit tests for Header, Footer, LanguageContext, LiveOpdQueue
│   └── calculator.test.js       # Health logic & eGFR calculators
├── integration/
│   ├── api-appointments.test.js # /api/appointments validation & duplicate slot rejection
│   ├── api-auth-queue.test.js   # /api/auth/login, rate limiting, and /api/opd/queue controller
│   └── api-inquiries.test.js    # /api/inquiries form submission & retrieval
└── e2e/
    ├── patient-journey.spec.js  # Full patient flow: Home -> Specialties -> FAQs -> Appointment booking
    ├── admin-portal.spec.js     # Doctor login -> Live Token change -> Booking status update -> Logout
    ├── accessibility.spec.js    # Automated Axe-Core audit on all pages
    └── responsiveness.spec.js   # Viewport testing across Mobile, Tablet, and Desktop screens
```

---

## 4. Test Execution Commands

```bash
# Run all unit and integration tests
npm run test

# Run unit tests only
npm run test:unit

# Run backend API integration tests
npm run test:integration

# Run tests with live code coverage calculation
npm run test:coverage

# Run Playwright End-to-End tests
npm run test:e2e

# Run Playwright with interactive visual UI
npm run test:e2e:ui
```

---

## 5. Mocking and Test Isolation Guidelines

1. **Isolated SQLite Database**: Integration tests execute against a separate test SQLite database or `:memory:` instance to prevent modifying production or development databases.
2. **Network Resilience**: Frontend unit tests mock `window.fetch` to ensure tests run offline in CI without depending on external network availability.
3. **No Patient PII**: Test data must only use synthetic test fixtures (e.g. `Test Patient`, `+91 99999 88888`). Never use real patient data in test files.
