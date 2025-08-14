# Domäjner v1.1.0 Release Notes

## 🎯 Enhanced Direct Mode with URL Protection

Version 1.1.0 introduces a major security enhancement to Direct Mode that completely solves the URL exposure problem. This release focuses on improving user privacy and security while maintaining full functionality.

## 🔐 Key Security Improvements

### Complete URL Protection in Direct Mode
- **Before**: Direct Mode showed target URLs in browser address bar
- **After**: Direct Mode now uses secure iframe technology to completely hide target URLs
- Users only see your domain's URL, never the underlying service URL

### Enhanced User Experience
- **New Fullscreen Button**: Modern fullscreen toggle with cross-browser support
- **Improved Interface**: Professional loading screens and security indicators
- **Better Accessibility**: Clear visual feedback and intuitive controls

## 🚀 What's New

### ✨ Major Features

1. **Secure Access Page** (`secure-access.html`)
   - Professional iframe-based interface
   - Complete URL hiding technology
   - Security indicators and loading states
   - Developer tools protection

2. **Fullscreen Support**
   - Cross-browser fullscreen API support
   - Automatic button state updates
   - Modern UI with hover effects
   - Seamless fullscreen transitions

3. **Enhanced Security**
   - Right-click context menu prevention
   - Developer tools access blocking
   - URL parameter protection
   - Improved iframe sandboxing

### 🔧 Technical Changes

- **Server.js Updates**: Direct Mode now redirects to secure iframe page instead of target URL
- **URL Encoding**: Proper parameter encoding for security
- **Cross-browser Compatibility**: Support for all major browsers
- **Performance Optimizations**: Faster loading and better error handling

## 📊 Version Comparison

| Feature | v1.0.0 | v1.1.0 |
|---------|--------|--------|
| Proxy Mode URL Hiding | ✅ | ✅ |
| Direct Mode URL Hiding | ❌ | ✅ |
| Fullscreen Support | ❌ | ✅ |
| Security Protection | Basic | Enhanced |
| User Interface | Standard | Professional |

## 🛡️ Security Enhancements

### URL Protection
- **Complete anonymity**: Target URLs never visible in browser address bar
- **Parameter protection**: All URL parameters properly encoded and hidden
- **Iframe security**: Enhanced sandboxing and security headers

### Browser Protection
- **Developer tools blocking**: F12, Ctrl+Shift+I, Ctrl+Shift+J prevention
- **Context menu blocking**: Right-click prevention in secure areas
- **View source protection**: Ctrl+U blocking

## 🔄 Migration Guide

### For Existing Users
- **No configuration changes needed**: All existing services continue to work
- **Automatic upgrade**: Direct Mode services automatically use new security features
- **Backward compatibility**: All existing tokens and configurations remain valid

### For New Deployments
- Follow the standard installation guide
- The new secure-access.html file is included automatically
- No additional setup required

## 📈 Performance Impact

- **Minimal overhead**: New iframe approach adds negligible performance impact
- **Improved loading**: Better loading state management
- **Enhanced caching**: Static resources properly cached

## 🔮 What's Next (Planned for v1.2.0)

- **Service Health Monitoring**: Real-time service availability checks
- **Advanced Analytics**: Usage statistics and performance metrics
- **API Rate Limiting**: Enhanced security with request rate limits
- **Mobile Optimization**: Improved mobile device support

## 📦 Installation

### Quick Start
```bash
git clone https://github.com/thomaswennersten/domajner.git
cd domajner
npm install
npm start
```

### Docker
```bash
docker-compose up -d
```

## 🙏 Acknowledgments

Thanks to all users who provided feedback on Direct Mode security concerns. This release addresses the primary security issue while maintaining full functionality and improving user experience.

## 🐛 Bug Reports

Found an issue? Please report it on our [GitHub Issues](https://github.com/thomaswennersten/domajner/issues) page.

## 📄 Full Changelog

See [CHANGELOG.md](./CHANGELOG.md) for complete version history and technical details.

---

**Release Date**: August 13, 2025  
**Version**: 1.1.0  
**Node.js**: >=18.0.0  
**License**: MIT