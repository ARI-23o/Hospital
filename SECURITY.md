# Security Policy - Chandrapura Kidney Care Hospital

## Supported Versions

We provide security updates and patches for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The security of our patients' health data and hospital operational systems is our utmost priority.

If you discover a security vulnerability in this project, please follow these guidelines:

1. **Do NOT open a public GitHub issue**.
2. Email your detailed report directly to: **security@chandrapurahospital.com** (or to the engineering lead at **devops@chandrapurahospital.com**).
3. Include the following details in your report:
   - Type of issue (e.g., SQLi, XSS, CSRF, Broken Access Control, Information Disclosure).
   - Exact steps or proof-of-concept (PoC) scripts to reproduce the issue.
   - Affected URLs, endpoints, or components.
   - Potential impact on patient privacy or hospital operations.
4. **Response Time**: Our security team will acknowledge your report within **24 hours** and provide regular status updates every 48 hours until resolved.
5. **Responsible Disclosure**: We kindly request that you allow us a minimum of **30 days** to remediate the vulnerability before publishing any public disclosures.

## Security Controls Overview

- **Zero-Patient-PII Exposure**: No medical records or identifiable credentials in public repositories or unencrypted cookies/storage.
- **Strict Headers**: Enforced Helmet headers including CSP, HSTS, X-Frame-Options, and X-Content-Type-Options.
- **Authenticated Access**: Strict doctor/staff authentication with bcrypt-hashed passwords and JWT verification.
- **Automated Pipeline Scans**: All pull requests are scanned with SAST, dependency audits, and secret detection tools prior to merging.
