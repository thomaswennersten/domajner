# Contributing to Domäjner

Thank you for your interest in contributing to Domäjner! This document provides guidelines for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git
- Basic understanding of Express.js and proxy concepts

### Setup Development Environment

1. **Fork the repository**
```bash
git clone https://github.com/your-username/domajner.git
cd domajner
```

2. **Install dependencies**
```bash
npm install
```

3. **Create development environment**
```bash
cp .env.example .env
# Edit .env with your development settings
```

4. **Run in development mode**
```bash
npm run dev
```

## 🔧 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions focused and small

### Commit Messages
Use clear, descriptive commit messages:
```
Add: New feature description
Fix: Bug description
Update: Change description
Docs: Documentation changes
```

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

## 🧪 Testing

### Manual Testing
1. Test both proxy and direct modes
2. Verify email sending functionality
3. Test admin interface features
4. Check token expiration and security

### Test Cases to Cover
- Email domain validation
- Token generation and expiration
- Proxy URL rewriting
- Admin authentication
- Service configuration

## 📝 Pull Request Process

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
- Follow coding guidelines
- Add appropriate comments
- Test your changes thoroughly

3. **Commit your changes**
```bash
git commit -m "Add: Description of your changes"
```

4. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

5. **Create a Pull Request**
- Provide a clear title and description
- Reference any related issues
- Include screenshots if UI changes
- List testing steps performed

### Pull Request Checklist
- [ ] Code follows project style guidelines
- [ ] Changes have been tested manually
- [ ] Documentation updated if needed
- [ ] No sensitive data included
- [ ] Commits are clear and descriptive

## 🐛 Bug Reports

When reporting bugs, please include:

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Ubuntu 20.04]
- Node.js version: [e.g. 18.0.0]
- Browser: [e.g. Chrome 91]

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

We welcome feature suggestions! Please include:

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## 🔒 Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email security concerns to: [security-email]
3. Include steps to reproduce
4. Allow time for assessment and fix

## 📚 Documentation

### Documentation Guidelines
- Use clear, simple language
- Include code examples where helpful
- Keep documentation up to date with code changes
- Add screenshots for UI features

### Areas Needing Documentation
- API endpoint documentation
- Configuration examples
- Deployment guides
- Troubleshooting guides

## 🎯 Areas for Contribution

### High Priority
- [ ] Automated testing framework
- [ ] API rate limiting
- [ ] Service health monitoring
- [ ] Mobile-responsive improvements

### Medium Priority
- [ ] OAuth integration
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Performance optimizations

### Low Priority
- [ ] Theme customization
- [ ] Plugin system
- [ ] Mobile app
- [ ] Advanced logging

## 🤔 Questions?

- Check existing [Issues](https://github.com/username/domajner/issues)
- Start a [Discussion](https://github.com/username/domajner/discussions)
- Read the [README](README.md) for basic setup

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing to Domäjner! 🎉