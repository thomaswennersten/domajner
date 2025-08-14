# 🎨 Domäjner v1.3.0 - UI Customization Update

## Major Features Added

### Custom Logo System
- Upload and display custom logos on the main interface
- Support for PNG, JPG, JPEG, GIF formats (max 5MB)
- Easy logo management in admin panel with upload/remove functionality

### Dynamic Page Title Configuration  
- Customize page title from admin interface
- Real-time updates with persistent storage
- Defaults to "Tjänståtkomst" for backward compatibility

## Technical Enhancements

### New Settings Management API
- `GET /api/settings` - Public settings access
- `POST /api/admin/settings` - Admin settings update with file upload
- `POST /api/admin/remove-logo` - Logo removal
- Secure file upload handling with Multer integration

### Enhanced Admin Interface
- New Settings tab with logo upload UI
- Live preview of changes
- Form validation and user feedback
- Drag-and-drop file upload support

## Installation
1. Download `domajner-v1.3.0.tar.gz`
2. Extract and deploy using Docker Compose
3. Access admin panel to configure logo and title
4. New `uploads/` directory and `settings.json` created automatically

## Breaking Changes
None - Fully backward compatible with existing deployments.

## Bug Fixes
- Fixed nodemailer configuration preventing server startup
- Improved file upload error handling
- Enhanced form validation

---

**Requirements**: Node.js >=18.0.0  
**Compatibility**: Works with all existing configurations  
**Demo**: Available at deployment URL