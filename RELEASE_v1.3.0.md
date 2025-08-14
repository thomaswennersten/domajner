# Domäjner v1.3.0 Release Notes

## 🎨 New UI Customization Features

### Logo Upload System
- **Custom Logo Support**: Upload and display custom logos on the main interface
- **Multiple Format Support**: Supports PNG, JPG, JPEG, GIF image formats
- **Logo Management**: Easy upload/remove functionality in admin panel
- **Automatic Resizing**: Logos are automatically styled to fit the interface
- **File Size Limits**: 5MB maximum file size for optimal performance

### Dynamic Page Title Configuration
- **Customizable Page Title**: Change the page title from admin interface
- **Real-time Updates**: Title changes reflect immediately on the main page
- **Default Fallback**: Defaults to "Tjänståtkomst" if no custom title is set
- **Persistent Storage**: Title preferences saved between sessions

## 🛠️ Technical Improvements

### Settings Management System
- **New Settings API**: `/api/admin/settings` for configuration management
- **File Upload Integration**: Multer-based secure file upload handling
- **Settings Persistence**: JSON-based settings storage (`settings.json`)
- **Logo File Management**: Automatic cleanup of old logo files when updated

### Enhanced Admin Interface
- **Settings Tab**: New dedicated settings section in admin panel
- **File Upload UI**: Drag-and-drop or click-to-upload logo interface
- **Preview System**: Live preview of logo and title changes
- **Form Validation**: Client-side validation for better user experience

## 📁 File Structure Updates

### New Files Added
- `settings.json` - Stores page title and logo URL configuration
- `uploads/` directory - Secure storage for uploaded logo files
- Enhanced admin.html with settings management UI
- Updated server.js with new settings endpoints

### API Endpoints
- `GET /api/settings` - Public settings access for frontend
- `GET /api/admin/get-settings` - Admin settings retrieval
- `POST /api/admin/settings` - Settings update with file upload
- `POST /api/admin/remove-logo` - Logo removal functionality
- `GET /uploads/:filename` - Secure logo file serving

## 🔒 Security Enhancements
- **File Type Validation**: Only image files allowed for logo upload
- **File Size Limits**: Prevents oversized file uploads
- **Secure File Serving**: Controlled access to uploaded files
- **Input Sanitization**: Proper validation of title input

## 🎯 User Experience Improvements
- **Visual Branding**: Organizations can now brand the interface with their logo
- **Custom Messaging**: Personalized page titles for different deployments
- **Responsive Design**: Logo and title adapt to different screen sizes
- **Accessibility**: Proper alt text and semantic HTML structure

## 🐛 Bug Fixes
- Fixed nodemailer configuration issue preventing server startup
- Improved error handling for file upload operations
- Enhanced form validation and user feedback
- Better handling of missing or corrupted settings files

## 📦 Installation & Upgrade

### New Dependencies
- `multer` v2.0.2 - File upload handling
- Enhanced file system operations for settings management

### Upgrade Instructions
1. Update to v1.3.0
2. Restart the application to initialize new settings system
3. Access admin panel to configure logo and page title
4. New `uploads/` directory and `settings.json` will be created automatically

## 🚀 Compatibility
- Node.js >=18.0.0
- All existing configurations remain compatible
- Backward compatible with existing service definitions
- No breaking changes to existing API endpoints

---

**Release Date**: August 14, 2025  
**Download**: Available on GitHub releases  
**Documentation**: Updated in project README  
**Demo**: Available at demo deployment URL