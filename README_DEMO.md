# 🎯 Domäjner Demo Site

This is the **demo version** of [Domäjner](https://github.com/thomaswennersten/domajner) - a secure dual-mode email-based service access system.

## 🚀 Try It Live

**Demo URL**: [Your demo deployment URL here]

### Quick Demo Access
- **Admin Password**: `demo123` (shown on admin page)
- **Allowed Email Domains**: Gmail, Hotmail, Outlook, Yahoo, ProtonMail, and more
- **Pre-configured Services**: Excalidraw, Miro, DN.se, Wikipedia, Figma

## 🎯 How to Test

### 1. Basic User Flow
1. Go to the main page
2. Enter your email (must be from allowed domains)
3. Select a service (try Excalidraw for Proxy Mode)
4. Check your email for the secure one-time link
5. Click link to access the service

### 2. Admin Interface
1. Click "Try Admin Interface" 
2. Password is pre-filled: `demo123`
3. Explore service management features
4. View active one-time links
5. Try adding a new service

## 🔒 Security Demo Features

### Proxy Mode (URL Anonymity)
- **Try**: Excalidraw, Miro, Figma
- **Result**: Complete URL hiding in browser
- **Perfect for**: Collaboration tools, sensitive internal tools

### Direct Mode (Full Compatibility)  
- **Try**: DN.se, Wikipedia
- **Result**: Direct access, full functionality
- **Perfect for**: Commercial sites, social media, banking

## 📧 Email Configuration

**For Demo Testing** - Allowed domains:
- gmail.com
- hotmail.com  
- outlook.com
- yahoo.com
- protonmail.com
- icloud.com
- live.com
- msn.com
- aol.com
- zoho.com
- fastmail.com
- tutanota.com

## ⚙️ Demo vs Production

| Feature | Demo | Production |
|---------|------|------------|
| Admin Password | `demo123` (visible) | Secure password (hidden) |
| Email Domains | Popular providers | Your organization domains |
| Services | Public examples | Your internal services |
| SMTP | Demo configuration | Your mail server |

## 🛡️ Demo Safety

This demo is safe to use because:
- ✅ No persistent data storage
- ✅ One-time links expire in 30 minutes
- ✅ No sensitive information collected
- ✅ All demo passwords are public
- ✅ Services are public websites

## 🚀 Deploy Your Own

Want to use Domäjner for your organization?

1. **Clone the repository**:
```bash
git clone https://github.com/thomaswennersten/domajner.git
```

2. **Follow the setup guide**: See [QUICK_START.md](https://github.com/thomaswennersten/domajner/blob/main/QUICK_START.md)

3. **Configure for production**:
   - Set secure admin password
   - Configure your email domains  
   - Add your internal services
   - Set up SMTP server

## 📚 Learn More

- **Main Repository**: [thomaswennersten/domajner](https://github.com/thomaswennersten/domajner)
- **Documentation**: [README.md](https://github.com/thomaswennersten/domajner/blob/main/README.md)
- **Security Policy**: [SECURITY.md](https://github.com/thomaswennersten/domajner/blob/main/SECURITY.md)
- **Contributing**: [CONTRIBUTING.md](https://github.com/thomaswennersten/domajner/blob/main/CONTRIBUTING.md)

## 🎯 Use Cases

Perfect for:
- **Universities**: Control student access to research tools
- **Corporations**: Secure access to SaaS applications  
- **Government**: Manage access to classified services
- **Non-profits**: Control volunteer tool access
- **Healthcare**: HIPAA-compliant service access

---

**Made with ❤️ for secure organizational tool access**

*This demo showcases Domäjner's capabilities. Deploy your own instance for production use.*