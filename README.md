# Domäjner - Secure Email-Based Service Access

A secure, dual-mode web service access system that provides one-time authenticated links via email verification.

## 🌟 Features

### Dual Access Modes
- **🔒 Proxy Mode**: Complete URL anonymity with transparent proxying
- **🔗 Direct Mode**: Direct access for commercial sites that block proxies

### Security Features
- Email domain verification
- One-time use tokens with 30-minute expiry
- Crypto-secure token generation
- Session-based admin authentication

### Technical Capabilities
- WebSocket proxying for real-time collaboration tools
- Static resource rewriting for proper proxy functionality
- Responsive admin interface
- Docker containerization ready

## 🎯 Use Cases

### Perfect for Organizations
- **Educational institutions** controlling access to external tools
- **Corporate environments** with strict access policies
- **Collaborative workspaces** needing secure tool access
- **Research organizations** managing external service access

### Supported Services
- **Proxy Mode**: Excalidraw, Miro, Figma, development tools
- **Direct Mode**: News sites, social media, commercial platforms

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- SMTP server access
- Domain with SSL certificate

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/domajner.git
cd domajner
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Start the application**
```bash
npm start
```

5. **Access the application**
- Main app: `http://localhost:3000`
- Admin interface: `http://localhost:3000/admin.html`

## 📋 Configuration

### Environment Variables
```env
# SMTP Configuration
SMTP_HOST=172.17.0.1
SMTP_PORT=25
SMTP_SECURE=false
SMTP_AUTH=false
SENDER_EMAIL=your-app@yourdomain.com

# Application Settings
PORT=3000
ADMIN_PASSWORD=your-secure-password
```

### Domain Configuration
Edit `allowed_domains.txt` to specify which email domains are allowed:
```
company.com
university.edu
organization.org
```

### Service Configuration
Configure services in the admin interface or edit `services.json`:
```json
[
  {
    "id": "service1",
    "name": "Excalidraw",
    "url": "https://excalidraw.com",
    "description": "Collaborative drawing tool",
    "accessMode": "proxy"
  },
  {
    "id": "service2", 
    "name": "News Site",
    "url": "https://example-news.com",
    "description": "News and articles",
    "accessMode": "direct"
  }
]
```

## 🔧 Docker Deployment

### Docker Compose
```yaml
version: '3.8'
services:
  domajner:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - SMTP_HOST=your-smtp-host
      - SENDER_EMAIL=noreply@yourdomain.com
    restart: always
```

### Nginx Reverse Proxy
```nginx
location /domajner/ {
    proxy_pass http://localhost:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # WebSocket support
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
}
```

## 🔒 Security Features

### Token Security
- Cryptographically secure random tokens
- 30-minute expiration window
- One-time use enforcement
- Automatic cleanup of expired tokens

### Access Control
- Email domain whitelist
- Admin password protection
- Session-based authentication
- Input validation and sanitization

### Proxy Security
- URL rewriting for complete anonymity
- Headers filtering
- XSS protection
- CSRF protection

## 📚 API Documentation

### User Endpoints
- `GET /` - Main application interface
- `GET /api/services` - List available services
- `POST /api/send-link` - Request access link
- `GET /access/:token` - Access service with token

### Admin Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/get-services` - Get service configuration
- `POST /api/admin/set-services` - Update services
- `GET /api/admin/get-domains` - Get allowed domains
- `POST /api/admin/set-domains` - Update allowed domains
- `GET /api/admin/get-links` - Get active links

## 🛠️ Development

### Project Structure
```
domajner/
├── server.js              # Main application server
├── index.html             # User interface
├── admin.html             # Administration interface
├── package.json           # Dependencies
├── allowed_domains.txt    # Email domain whitelist
├── services.json          # Service configuration
├── one_time_links.json    # Active tokens (auto-generated)
└── docs/                  # Documentation
```

### Running in Development
```bash
npm run dev
```

### Testing
```bash
npm test
```

## 🔄 How It Works

### Access Flow
1. **User requests access** to a service via email
2. **System validates** email domain against whitelist
3. **Secure token generated** with 30-minute expiry
4. **Email sent** with one-time access link
5. **User clicks link** - token validated and marked as used
6. **Access granted** via chosen mode (proxy/direct)

### Proxy Mode Flow
1. User accesses anonymous proxy URL
2. System intercepts all requests
3. Rewrites URLs and headers
4. Forwards to target service
5. Returns modified response
6. WebSocket connections proxied for real-time features

### Direct Mode Flow
1. User accesses one-time link
2. Token validated and marked as used
3. Direct redirect to target service
4. User interacts directly with service

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Test both access modes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for secure organizational access control
- Inspired by the need for anonymous service access
- Thanks to the open source community

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/domajner/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/domajner/discussions)
- **Email**: support@yourdomain.com

## 🗺️ Roadmap

- [ ] OAuth integration
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Service health monitoring

---

**Made with ❤️ for secure organizational tool access**