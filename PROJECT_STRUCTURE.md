# Project Structure

```
domajner/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI/CD pipeline
├── docs/                          # Documentation files
│   ├── dual-mode-system.html      # Dual-mode system documentation
│   └── proxy-limitations.html     # Proxy limitations guide
├── examples/                      # Configuration examples
│   ├── nginx.example.conf         # Nginx reverse proxy config
│   ├── services.example.json      # Example service configuration
│   └── allowed_domains.example.txt # Example domain whitelist
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── CHANGELOG.md                   # Version history
├── CONTRIBUTING.md                # Contribution guidelines
├── Dockerfile                     # Docker container definition
├── LICENSE                        # MIT license
├── README.md                      # Main documentation
├── SECURITY.md                    # Security policy
├── admin.html                     # Admin interface
├── docker-compose.yml             # Docker compose configuration
├── index.html                     # Main user interface
├── package.json                   # Node.js dependencies
├── server.js                      # Main application server
└── data/                          # Runtime data directory (created at startup)
    ├── allowed_domains.txt        # Email domain whitelist
    ├── one_time_links.json        # Active tokens (auto-generated)
    ├── services.json              # Service configuration
    └── verification_code.txt      # Admin verification code
```

## File Descriptions

### Core Application Files

- **`server.js`**: Main Express.js application server
  - Handles email verification and token generation
  - Implements dual-mode proxy system
  - Provides API endpoints for admin and user interfaces

- **`index.html`**: User-facing interface
  - Service selection and email input
  - Clean, responsive design
  - JavaScript for API communication

- **`admin.html`**: Administrative interface
  - Service management (add/edit/delete)
  - Domain configuration
  - Active link monitoring
  - Access mode selection (proxy/direct)

### Configuration Files

- **`package.json`**: Node.js project configuration
  - Dependencies and scripts
  - Project metadata
  - Docker and development commands

- **`.env.example`**: Environment variable template
  - SMTP configuration
  - Application settings
  - Security parameters

- **`docker-compose.yml`**: Container orchestration
  - Application container
  - Optional nginx reverse proxy
  - Volume mounts for persistent data

### Documentation

- **`README.md`**: Comprehensive project documentation
- **`CONTRIBUTING.md`**: Contribution guidelines
- **`SECURITY.md`**: Security policy and reporting
- **`CHANGELOG.md`**: Version history
- **`LICENSE`**: MIT license terms

### Runtime Data

- **`data/allowed_domains.txt`**: Email domain whitelist
- **`data/services.json`**: Service configuration with access modes
- **`data/one_time_links.json`**: Active tokens (auto-managed)
- **`data/verification_code.txt`**: Admin authentication

### Docker Support

- **`Dockerfile`**: Multi-stage container build
- **`.dockerignore`**: Docker build exclusions
- **Health checks**: Built-in container health monitoring

### Development Tools

- **`.github/workflows/ci.yml`**: Continuous integration
- **`npm scripts`**: Development and deployment commands
- **Example configurations**: Ready-to-use templates

## Data Flow

```
User Request → Email Validation → Token Generation → Email Sent
     ↓
Token Click → Validation → Mode Check → Access Granted
     ↓
Proxy Mode: Anonymous URL → Proxy Server → Target Service
Direct Mode: Direct Redirect → Target Service
```

## Security Considerations

- **Configuration files**: Never commit actual config files to git
- **Tokens**: Automatically expire and cleanup
- **Admin access**: Password protected with session management
- **Input validation**: All user inputs are validated and sanitized

## Development Workflow

1. Clone repository
2. Copy `.env.example` to `.env`
3. Configure SMTP and admin settings
4. Run `npm install`
5. Start with `npm run dev`
6. Access admin interface to configure services
7. Test both proxy and direct modes

## Deployment Options

- **Standalone**: Direct Node.js deployment
- **Docker**: Containerized deployment
- **Docker Compose**: Full stack with nginx
- **Kubernetes**: Scalable container orchestration

This structure supports both development and production deployments while maintaining security and ease of use.