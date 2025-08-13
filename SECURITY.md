# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability in Domäjner, please report it responsibly.

### How to Report

**Please do NOT create a public issue for security vulnerabilities.**

Instead, please email security details to: [your-security-email@domain.com]

Include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if you have one)

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt within 24 hours
- **Assessment**: Initial assessment within 72 hours
- **Updates**: Regular updates on our progress
- **Resolution**: We aim to resolve critical issues within 7 days

### Security Measures

Domäjner implements several security measures:

#### Token Security
- Cryptographically secure random token generation using `crypto.randomBytes()`
- 30-minute token expiration
- One-time use enforcement
- Automatic cleanup of expired tokens

#### Access Control
- Email domain whitelist validation
- Admin password protection
- Session-based authentication
- Input validation and sanitization

#### Proxy Security
- URL rewriting for anonymity
- Header filtering and sanitization
- XSS protection
- Request/response validation

#### Infrastructure Security
- Docker containerization with non-root user
- Health check endpoints
- Logging and monitoring
- Environment variable protection

### Security Best Practices

When deploying Domäjner:

1. **Use HTTPS**: Always deploy behind HTTPS
2. **Strong passwords**: Use strong admin passwords
3. **Regular updates**: Keep dependencies updated
4. **Domain validation**: Carefully configure allowed domains
5. **Monitoring**: Monitor logs for suspicious activity
6. **Firewall**: Restrict access to admin interfaces
7. **Backup**: Regular backups of configuration

### Known Security Considerations

1. **Proxy Mode Limitations**: Some advanced web applications may not work perfectly through the proxy
2. **Direct Mode**: Real URLs are exposed in Direct Mode (by design)
3. **Email Security**: Security depends on email system security
4. **Session Management**: Admin sessions use simple session storage

### Vulnerability Disclosure Timeline

We follow responsible disclosure:

1. **Day 0**: Vulnerability reported
2. **Day 1**: Acknowledgment sent
3. **Day 3**: Initial assessment completed
4. **Day 7**: Fix developed (for critical issues)
5. **Day 14**: Fix released and disclosure coordinated
6. **Day 30**: Public disclosure (if safe)

### Security Updates

Security updates will be:
- Released as patch versions (e.g., 1.0.1)
- Announced in release notes
- Documented in CHANGELOG.md
- Posted on GitHub Security Advisories

Thank you for helping keep Domäjner secure!