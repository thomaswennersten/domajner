# Domäjner v1.2.0 Release Notes

## 🎯 Complete Dual-Mode Implementation

Version 1.2.0 delivers the final piece of the puzzle - a **fully working Proxy Mode** alongside the already excellent Direct Mode. This release fixes critical proxy functionality and delivers on the promise of true dual-mode operation.

## 🚀 What's New in v1.2.0

### ✅ **Fully Functional Proxy Mode**
- **Complete URL Rewriting**: All resources (CSS, JS, images) now load correctly through proxy
- **Modern SPA Support**: Successfully tested with Excalidraw, Skiss, and other complex applications
- **Perfect URL Anonymity**: Target URLs completely hidden from browser address bar in Proxy Mode
- **WebSocket Proxying**: Real-time collaboration features work seamlessly

### 🔧 **Critical Bug Fixes**
- **Resource Loading Fixed**: The major proxy bug that prevented CSS/JS loading is now resolved
- **Path Resolution**: Corrected nginx path handling vs. server URL generation mismatch
- **Demo Site Stability**: All demo site issues resolved with proper API path configuration
- **Cross-Platform Compatibility**: Proxy mode now works reliably across all browsers

### 🎨 **Enhanced User Experience**
- **Both Modes Working**: Users can now truly choose between Proxy Mode and Direct Mode
- **Better Error Handling**: Improved error messages and debugging information
- **Stable Demo Site**: Comprehensive demo with working examples of both modes
- **Admin Interface**: Fixed API paths and improved demo site administration

## 📊 Mode Comparison (Both Now Working!)

| Feature | Proxy Mode ✅ | Direct Mode ✅ |
|---------|---------------|----------------|
| URL Hiding | ✅ Complete | ✅ Complete |
| Resource Loading | ✅ Fixed | ✅ Always worked |
| Modern SPAs | ✅ Compatible | ✅ Compatible |
| Real-time Collaboration | ✅ WebSocket Support | ✅ Native Support |
| Fullscreen Support | ➖ Browser dependent | ✅ Full Support |
| Performance | 🟡 Proxy overhead | ✅ Native speed |

## 🔧 **Technical Improvements**

### Proxy Engine Fixes
- **URL Rewriting Algorithm**: Completely fixed the path rewriting logic
- **Nginx Integration**: Proper handling of path stripping vs. URL generation
- **Resource Proxying**: All static resources (CSS, JS, images) now proxy correctly
- **WebSocket Support**: Real-time features work through proxy tunnel

### Configuration Improvements
- **Demo Environment**: Fixed `/demo-domajner/` vs `/domajner/` path conflicts
- **Service Examples**: Added working proxy mode demonstrations
- **Admin Interface**: Corrected API endpoints for demo site management
- **Error Diagnostics**: Better logging and error reporting

## 🏆 **Achievement Unlocked: True Dual-Mode**

This release finally delivers on the core promise of Domäjner:

**🔒 Proxy Mode** - For maximum privacy and URL anonymity
- Perfect for environments requiring complete URL hiding
- Works with modern collaboration tools like Excalidraw
- Real-time features fully supported
- Complete resource proxying

**🔗 Direct Mode** - For maximum compatibility and performance  
- Best performance with native speed
- Full iframe security with URL protection
- Professional fullscreen interface
- Perfect compatibility guarantee

## 🎯 **Use Case Guide**

### When to Use Proxy Mode
- **Maximum Privacy**: When URL anonymity is critical
- **Collaboration Tools**: Excalidraw, Miro, Figma work perfectly
- **Real-time Apps**: WebSocket proxying supports live collaboration
- **Legacy Compatibility**: Works with older web applications

### When to Use Direct Mode
- **Modern SPAs**: Best performance for heavy JavaScript applications
- **Media Rich**: Video, audio, and interactive content
- **Fullscreen Needs**: Professional fullscreen interface with controls
- **Maximum Compatibility**: Guaranteed to work with any web application

## 🐛 **Major Bugs Fixed**

### Proxy Mode Resource Loading (Critical)
- **Before**: CSS/JS files failed to load, blank pages
- **After**: All resources load correctly, fully functional applications

### Demo Site Stability (High Priority)
- **Before**: API endpoints failed, admin interface broken
- **After**: Complete stability, perfect demonstration of both modes

### Path Resolution (Technical)
- **Before**: nginx path stripping caused URL generation conflicts
- **After**: Perfect path handling with proper URL rewriting

## 📈 **Performance & Compatibility**

### Browser Support
- ✅ Chrome/Chromium (all versions)
- ✅ Firefox (all versions)  
- ✅ Safari (all versions)
- ✅ Edge (all versions)
- ✅ Mobile browsers (iOS/Android)

### Application Compatibility
- ✅ **Excalidraw**: Both modes working perfectly
- ✅ **Traditional websites**: News sites, documentation, etc.
- ✅ **Collaboration tools**: Miro, Figma-like applications  
- ✅ **Real-time apps**: WebSocket-based applications
- ✅ **Media rich**: Video, audio, interactive content

## 🚀 **Migration Guide**

### For v1.1.0 Users
- **No configuration changes required**: All existing services continue working
- **New proxy options**: You can now confidently use proxy mode for any service
- **Enhanced capabilities**: Better error handling and debugging

### For New Deployments
- **Complete dual-mode**: Both Proxy Mode and Direct Mode ready out of the box
- **Working demo**: Full demonstration site with both modes
- **Production ready**: Thoroughly tested and stable

## 📦 **Installation & Upgrade**

```bash
# New Installation
git clone https://github.com/thomaswennersten/domajner.git
cd domajner
npm install
npm start

# Upgrade from v1.1.0
git pull origin main
npm install
# No configuration changes needed!
```

### Docker
```bash
docker-compose up -d
# All services automatically updated
```

## 🎉 **What's Next (v1.3.0 Planned)**

- **Advanced Analytics**: Usage statistics and performance monitoring
- **Service Health Checks**: Automatic service availability monitoring  
- **Enhanced Security**: Additional security headers and protection
- **Mobile Optimization**: Improved mobile device experience
- **API Rate Limiting**: Enhanced protection against abuse

## 🙏 **Acknowledgments**

Special thanks to everyone who tested the proxy functionality and provided feedback. This release represents a major milestone - **true dual-mode operation** where both modes are fully functional and production-ready.

## 📄 **Full Documentation**

- [Installation Guide](./README.md)
- [Configuration Examples](./examples/)
- [Troubleshooting](./docs/troubleshooting.md)
- [API Documentation](./docs/api.md)

---

**Release Date**: August 14, 2025  
**Version**: 1.2.0  
**Node.js**: >=18.0.0  
**License**: MIT

**🎯 This is the definitive dual-mode release - both Proxy Mode and Direct Mode now work flawlessly!**