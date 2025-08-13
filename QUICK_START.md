# Quick Start Guide

Get Domäjner up and running in 5 minutes!

## 🚀 Option 1: Docker (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- SMTP server access (or use local testing)

### Steps

1. **Clone and configure**
```bash
git clone https://github.com/yourusername/domajner.git
cd domajner
cp .env.example .env
```

2. **Edit configuration**
```bash
# Edit .env file
nano .env

# Minimum required settings:
SENDER_EMAIL=noreply@yourdomain.com
ADMIN_PASSWORD=your-secure-password
```

3. **Start the application**
```bash
docker-compose up -d
```

4. **Access the application**
- Main app: http://localhost:3000
- Admin: http://localhost:3000/admin.html

5. **Configure services**
- Login to admin with your password
- Add services with appropriate access modes
- Configure allowed email domains

## 🔧 Option 2: Node.js Direct

### Prerequisites
- Node.js 18+
- SMTP server or local mail setup

### Steps

1. **Install dependencies**
```bash
git clone https://github.com/yourusername/domajner.git
cd domajner
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
nano .env
```

3. **Start application**
```bash
npm start
```

## ⚡ 30-Second Test Setup

Want to test immediately? Use these settings:

```env
# .env file for testing
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_AUTH=false
SENDER_EMAIL=test@localhost
ADMIN_PASSWORD=admin123
PORT=3000
```

Start a fake SMTP server for testing:
```bash
# Install and run maildev for testing
npm install -g maildev
maildev --smtp 1025 --web 1080
```

## 📧 Email Configuration

### Common SMTP Providers

**Gmail:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**SendGrid:**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH=true
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

**Corporate Exchange:**
```env
SMTP_HOST=your-exchange-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_AUTH=true
SMTP_USER=your-username
SMTP_PASS=your-password
```

## 🎯 First Configuration

After starting the application:

1. **Access admin interface**
   - Go to http://localhost:3000/admin.html
   - Login with your admin password

2. **Configure allowed domains**
   - Add your organization's email domains
   - Example: `company.com`, `university.edu`

3. **Add your first service**
   - Name: "Excalidraw"
   - URL: "https://excalidraw.com"
   - Mode: "Proxy Mode" (for URL anonymity)

4. **Test the system**
   - Go to main page
   - Enter your email
   - Select the service
   - Check your email for the access link

## 🔍 Troubleshooting

### Common Issues

**"Email not sent"**
- Check SMTP configuration
- Verify SMTP server connectivity
- Check email server logs

**"Service not loading"**
- Check URL is accessible from server
- For commercial sites, try "Direct Mode"
- Check proxy logs for errors

**"Admin login not working"**
- Verify ADMIN_PASSWORD in .env file
- Clear browser cache/cookies
- Check server logs

**"Docker container not starting"**
- Check port 3000 is available
- Verify Docker and Docker Compose versions
- Check container logs: `docker-compose logs`

### Getting Help

- Check the [README](README.md) for detailed documentation
- Review [troubleshooting section](README.md#troubleshooting)
- Open an issue on GitHub
- Check existing issues and discussions

## 🔄 Next Steps

After basic setup:

1. **Production deployment**: Configure reverse proxy (nginx)
2. **SSL certificates**: Set up HTTPS
3. **Monitoring**: Enable logging and health checks
4. **Backup**: Set up configuration backup
5. **Updates**: Subscribe to releases for updates

## 📚 Learn More

- [Complete Documentation](README.md)
- [Configuration Guide](docs/configuration.md)
- [Security Best Practices](SECURITY.md)
- [Contributing Guidelines](CONTRIBUTING.md)

Happy using Domäjner! 🎉