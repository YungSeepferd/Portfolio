# Security Policy

## Supported Versions

The following versions of the Vincent Göke Portfolio are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

1. **Do not** open a public GitHub issue for security vulnerabilities
2. Email security concerns to the project maintainer directly
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Any suggested fixes (optional)

### Response Timeline

- **Initial Response**: Within 48 hours of reporting, you will receive acknowledgment
- **Status Update**: We aim to provide a status update within 7 days
- **Resolution Timeline**: We work to address confirmed vulnerabilities as quickly as possible, typically within 30 days
- **Credit**: We will credit reporters in the security advisory (unless you prefer anonymity)

### What to Expect

- If the vulnerability is accepted, we will work on a fix and coordinate disclosure
- If the vulnerability is declined, we will provide a brief explanation
- We follow responsible disclosure practices

## Security Best Practices

This project implements the following security measures:

- **Content Security Policy (CSP)**: XSS protection via CSP meta tags in HTML
- **Dependency Management**: Regular security audits via npm audit
- **HTTPS Only**: Site should be served over HTTPS in production
- **Input Sanitization**: User inputs are sanitized before processing
- **Minimal External Dependencies**: Reduces attack surface
- **Secure Build Process**: Uses modern, maintained build tooling

## Security Updates

Security vulnerabilities are patched as quickly as possible. We recommend:

- Keeping dependencies up to date
- Watching the repository for security-related releases
- Subscribing to security advisories for dependencies used
