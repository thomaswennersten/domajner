# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-08-14

### Added
- **Fully Working Proxy Mode**: Complete proxy implementation with proper URL rewriting
- **Dual-Mode Demonstration**: Both Proxy Mode and Direct Mode now working perfectly
- **Advanced URL Rewriting**: Fixed complex URL rewriting for modern web applications
- **Comprehensive Testing**: Verified with Excalidraw/Skiss and other complex SPAs

### Fixed
- **Critical Proxy Bug**: Fixed URL rewriting that prevented resources from loading
- **Path Resolution**: Corrected nginx path handling for proxy endpoints
- **Resource Loading**: All CSS, JS, and static resources now load correctly through proxy
- **Cross-Browser Compatibility**: Proxy mode now works across all major browsers

### Improved
- **Demo Site Stability**: Fixed all demo site issues with proper configuration
- **Admin Interface**: Corrected API paths for demo environment
- **Service Configuration**: Enhanced service examples with working proxy demonstrations
- **Error Handling**: Better error messages and debugging information

### Technical
- Fixed `/demo-domajner/proxy-full/` URL rewriting in demo environment
- Corrected nginx path stripping vs. proxy URL generation mismatch
- Improved proxy middleware configuration for modern SPAs
- Enhanced WebSocket proxying support

## [1.1.0] - 2025-08-13

### Added
- **Enhanced Direct Mode with URL Protection**: Direct Mode now uses secure iframe technology to hide target URLs
- **Fullscreen Support**: Added fullscreen button for improved user experience in Direct Mode
- **Secure Access Page**: New secure-access.html implementation for enhanced privacy
- **Cross-browser Compatibility**: Full support for all major browsers' fullscreen APIs

### Changed
- Direct Mode implementation completely rewritten to prevent URL exposure
- Improved user interface with modern fullscreen controls
- Enhanced security for Direct Mode access

### Security
- Target URLs are now completely hidden from browser address bar in Direct Mode
- Added protection against developer tools inspection
- Improved iframe security with right-click prevention

## [1.0.0] - 2025-01-XX

### Added
- Initial release of Domäjner
- Dual-mode access system (Proxy Mode and Direct Mode)
- Email-based authentication with domain validation
- One-time secure tokens with 30-minute expiry
- Complete proxy implementation with URL anonymity
- WebSocket proxying for real-time collaboration tools
- Admin interface for service and domain management
- Docker containerization support
- Health check endpoint
- Comprehensive documentation

### Features
- **Proxy Mode**: Anonymous URL access for collaboration tools
  - Complete URL hiding from browser address bar
  - WebSocket support for real-time features
  - Static resource rewriting for proper functionality
  - Perfect for Excalidraw, Miro, and similar tools

- **Direct Mode**: Direct access for commercial sites
  - Bypass proxy limitations for sites that block proxies
  - Full functionality preservation
  - Ideal for news sites, social media, banking

- **Security**: 
  - Crypto-secure token generation
  - Domain-based email validation
  - Admin authentication
  - Input sanitization and validation

- **Management**:
  - Web-based admin interface
  - Service configuration with access mode selection
  - Active link monitoring
  - Allowed domain management

### Technical
- Node.js 18+ support
- Express.js web framework
- http-proxy-middleware for proxying
- nodemailer for email functionality
- Docker support with health checks
- Nginx reverse proxy configuration examples

## [Unreleased]

### Planned
- Automated testing framework
- API rate limiting
- Service health monitoring
- OAuth integration
- Multi-language support
- Advanced analytics
- Mobile app
- Plugin system

---

## Version History

- **1.0.0**: Initial open source release with dual-mode functionality
- **0.9.x**: Beta versions with proxy implementation
- **0.8.x**: Alpha versions with basic email verification
- **0.1.x**: Initial development versions