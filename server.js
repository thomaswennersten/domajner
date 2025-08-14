const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
const axios = require('axios');
const multer = require('multer');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// File paths
const DOMAINS_FILE = path.join(__dirname, 'allowed_domains.txt');
const CODE_FILE = path.join(__dirname, 'verification_code.txt');
const SERVICES_FILE = path.join(__dirname, 'services.json');
const LINKS_FILE = path.join(__dirname, 'one_time_links.json');
const SETTINGS_FILE = path.join(__dirname, 'settings.json');

// SMTP Configuration
const transporter = nodemailer.createTransport({
    host: '172.17.0.1',
    port: 25,
    secure: false,
    auth: false
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Initialize files if they don't exist
async function initializeFiles() {
    try {
        await fs.access(DOMAINS_FILE);
    } catch {
        await fs.writeFile(DOMAINS_FILE, 'exempel.se\ntest.com\n');
    }
    
    try {
        await fs.access(CODE_FILE);
    } catch {
        await fs.writeFile(CODE_FILE, '123456');
    }
    
    try {
        await fs.access(SERVICES_FILE);
    } catch {
        const defaultServices = {
            services: [
                {
                    id: 'service1',
                    name: 'Testservice 1',
                    url: 'https://example.com/login',
                    description: 'Beskrivning av tjänst 1'
                }
            ]
        };
        await fs.writeFile(SERVICES_FILE, JSON.stringify(defaultServices, null, 2));
    }
    
    try {
        await fs.access(LINKS_FILE);
    } catch {
        await fs.writeFile(LINKS_FILE, JSON.stringify({ links: [] }, null, 2));
    }
    
    try {
        await fs.access(SETTINGS_FILE);
    } catch {
        const defaultSettings = {
            pageTitle: 'Tjänståtkomst',
            logoUrl: null
        };
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
    }
    
    // Ensure uploads directory exists
    try {
        await fs.access('uploads');
    } catch {
        await fs.mkdir('uploads');
    }
}

// Helper functions
async function readDomains() {
    try {
        const content = await fs.readFile(DOMAINS_FILE, 'utf-8');
        return content.split('\n').filter(domain => domain.trim() !== '').map(domain => domain.trim().toLowerCase());
    } catch (error) {
        console.error('Error reading domains file:', error);
        return [];
    }
}

async function readVerificationCode() {
    try {
        const content = await fs.readFile(CODE_FILE, 'utf-8');
        return content.trim();
    } catch (error) {
        console.error('Error reading verification code file:', error);
        return '123456';
    }
}

function extractDomain(email) {
    return email.split('@')[1].toLowerCase();
}

// Services helper functions
async function readServices() {
    try {
        const content = await fs.readFile(SERVICES_FILE, 'utf-8');
        return JSON.parse(content).services;
    } catch (error) {
        console.error('Error reading services file:', error);
        return [];
    }
}

async function writeServices(services) {
    try {
        await fs.writeFile(SERVICES_FILE, JSON.stringify({ services }, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing services file:', error);
        return false;
    }
}

// Settings helper functions
async function readSettings() {
    try {
        const content = await fs.readFile(SETTINGS_FILE, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading settings file:', error);
        return { pageTitle: 'Tjänståtkomst', logoUrl: null };
    }
}

async function writeSettings(settings) {
    try {
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing settings file:', error);
        return false;
    }
}

// One-time links helper functions
async function readLinks() {
    try {
        const content = await fs.readFile(LINKS_FILE, 'utf-8');
        return JSON.parse(content).links;
    } catch (error) {
        console.error('Error reading links file:', error);
        return [];
    }
}

async function writeLinks(links) {
    try {
        await fs.writeFile(LINKS_FILE, JSON.stringify({ links }, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing links file:', error);
        return false;
    }
}

function generateUniqueToken() {
    const crypto = require('crypto');
    return crypto.randomBytes(32).toString('hex');
}

async function cleanExpiredLinks() {
    const links = await readLinks();
    const now = new Date();
    const validLinks = links.filter(link => {
        const expiry = new Date(link.expiresAt);
        return expiry > now;
    });
    
    if (validLinks.length !== links.length) {
        await writeLinks(validLinks);
    }
    
    return validLinks;
}

// API Routes

// Admin login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { password } = req.body;
        const correctPassword = 'Cr6!B<|{548-^j';
        
        if (!password) {
            return res.json({ success: false, message: 'Lösenord krävs.' });
        }
        
        if (password === correctPassword) {
            res.json({ success: true, message: 'Inloggning lyckades.' });
        } else {
            res.json({ success: false, message: 'Felaktigt lösenord.' });
        }
        
    } catch (error) {
        console.error('Error during login:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid inloggning.' 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
    });
});

// Get services for frontend
app.get('/api/services', async (req, res) => {
    try {
        const services = await readServices();
        res.json({ success: true, services });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.json({ success: false, message: 'Ett fel uppstod vid hämtning av tjänster.' });
    }
});

// Send one-time link
app.post('/api/send-link', async (req, res) => {
    try {
        const { email, serviceId } = req.body;
        
        if (!email) {
            return res.json({ success: false, message: 'E-postadress krävs.' });
        }
        
        if (!serviceId) {
            return res.json({ success: false, message: 'Tjänst måste väljas.' });
        }
        
        const domain = extractDomain(email);
        const allowedDomains = await readDomains();
        
        if (!allowedDomains.includes(domain)) {
            return res.json({ 
                success: false, 
                message: 'Denna e-postdomän har inte tillgång till den aktuella tjänsten.' 
            });
        }
        
        const services = await readServices();
        const selectedService = services.find(service => service.id === serviceId);
        
        if (!selectedService) {
            return res.json({ success: false, message: 'Ogiltig tjänst.' });
        }
        
        // Clean expired links
        await cleanExpiredLinks();
        
        // Generate one-time link
        const token = generateUniqueToken();
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
        
        const linkData = {
            token,
            email,
            serviceId,
            serviceName: selectedService.name,
            targetUrl: selectedService.url,
            createdAt: new Date().toISOString(),
            expiresAt: expiresAt.toISOString(),
            used: false
        };
        
        const links = await readLinks();
        links.push(linkData);
        await writeLinks(links);
        
        // Send email with one-time link
        const senderEmail = process.env.SENDER_EMAIL || 'noreply@vm.elestio.app';
        const oneTimeUrl = `https://vibecoder-sambruk-u917.vm.elestio.app/domajner/access/${token}`;
        
        console.log(`Sending one-time link from ${senderEmail} to ${email} for service ${selectedService.name}`);
        
        const mailOptions = {
            from: senderEmail,
            to: email,
            subject: `Åtkomstlänk för ${selectedService.name}`,
            text: `Klicka på länken för att komma åt ${selectedService.name}: ${oneTimeUrl}\n\nLänken är giltig i 30 minuter.`,
            html: `
                <h2>Åtkomstlänk för ${selectedService.name}</h2>
                <p>Klicka på länken nedan för att komma åt tjänsten:</p>
                <p><a href="${oneTimeUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Öppna ${selectedService.name}</a></p>
                <p>Eller kopiera denna URL: ${oneTimeUrl}</p>
                <p><strong>OBS:</strong> Länken är giltig i 30 minuter och kan endast användas en gång.</p>
            `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('One-time link sent successfully');
        
        res.json({ 
            success: true, 
            message: `Åtkomstlänk skickad till din e-postadress för ${selectedService.name}.` 
        });
        
    } catch (error) {
        console.error('Error sending one-time link:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid skickandet av åtkomstlänk.' 
        });
    }
});

// API endpoint to mark link as used (for direct access)
app.post('/api/admin/mark-used', async (req, res) => {
    try {
        const { token } = req.body;
        
        const links = await readLinks();
        const updatedLinks = links.map(link => 
            link.token === token && !link.used ? { ...link, used: true, usedAt: new Date().toISOString() } : link
        );
        await writeLinks(updatedLinks);
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error marking link as used:', error);
        res.json({ success: false });
    }
});

// Iframe access endpoint  
app.get('/access/iframe/:token', async (req, res) => {
    // This is the existing iframe logic but moved to a separate route
    const { token } = req.params;
    
    await cleanExpiredLinks();
    
    const links = await readLinks();
    const linkData = links.find(link => link.token === token);
    
    if (!linkData || linkData.used) {
        return res.status(404).send(`
            <html>
                <head><title>Ogiltig länk</title></head>
                <body>
                    <div style="text-align: center; padding: 50px;">
                        <h2>Ogiltig eller redan använd länk</h2>
                        <p>Denna iframe-länk är inte längre giltig.</p>
                    </div>
                </body>
            </html>
        `);
    }
    
    const expiry = new Date(linkData.expiresAt);
    if (expiry <= new Date()) {
        return res.status(410).send(`
            <html>
                <head><title>Utgången länk</title></head>
                <body>
                    <div style="text-align: center; padding: 50px;">
                        <h2>Länken har gått ut</h2>
                        <p>Denna iframe-länk har gått ut och kan inte längre användas.</p>
                    </div>
                </body>
            </html>
        `);
    }
    
    // Mark link as used
    const updatedLinks = links.map(link => 
        link.token === token ? { ...link, used: true, usedAt: new Date().toISOString() } : link
    );
    await writeLinks(updatedLinks);
    
    console.log(`Loading ${linkData.targetUrl} in iframe for ${linkData.email}`);
    
    // Determine if this is a collaborative service that needs full permissions
    const isCollaborativeService = linkData.serviceId === 'service3' || 
                                 linkData.serviceName?.toLowerCase().includes('excalidraw') || 
                                 linkData.serviceName?.toLowerCase().includes('skiss') ||
                                 linkData.targetUrl?.includes('excalidraw') ||
                                 linkData.targetUrl?.includes('skiss.sambruk.se');
    
    // Configure iframe attributes based on service type
    const sandboxAttributes = isCollaborativeService 
        ? 'allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox allow-storage-access-by-user-activation'
        : 'allow-same-origin allow-scripts allow-forms allow-popups allow-modals';
        
    const additionalAttributes = isCollaborativeService 
        ? 'allow="camera; microphone; display-capture; clipboard-read; clipboard-write; web-share; cross-origin-isolated; document-domain; storage-access" credentialless'
        : '';
    
    // Return the iframe page (existing iframe code)
    const iframePage = `
        <!DOCTYPE html>
        <html lang="sv">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${linkData.serviceName} - Iframe</title>
            ${isCollaborativeService ? `
            <meta http-equiv="Permissions-Policy" content="camera=*, microphone=*, display-capture=*, clipboard-read=*, clipboard-write=*, web-share=*">
            <meta http-equiv="Content-Security-Policy" content="frame-src *; connect-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src 'self' 'unsafe-inline' *;">
            ` : ''}
            <style>
                body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; font-family: Arial, sans-serif; }
                .header { background: #007bff; color: white; padding: 8px 15px; font-size: 14px; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                iframe { width: 100%; height: calc(100vh - 40px); border: none; margin-top: 40px; }
            </style>
        </head>
        <body>
            <div class="header">
                <span style="font-weight: bold;">${linkData.serviceName} (Iframe-läge)</span>
                <span style="float: right; font-size: 12px; opacity: 0.9;">🔒 Säker iframe-åtkomst</span>
            </div>
            <iframe 
                src="${linkData.targetUrl}" 
                sandbox="${sandboxAttributes}"
                ${additionalAttributes}
                allowfullscreen>
            </iframe>
        </body>
        </html>
    `;
    
    res.send(iframePage);
});

// Access endpoint - handles one-time link clicks (now shows choice for collaborative services)
app.get('/access/:token', async (req, res) => {
    try {
        const { token } = req.params;
        
        // Clean expired links first
        await cleanExpiredLinks();
        
        const links = await readLinks();
        const linkData = links.find(link => link.token === token);
        
        if (!linkData) {
            return res.status(404).send(`
                <html>
                    <head>
                        <title>Ogiltig länk</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            .error { color: #721c24; background: #f8d7da; padding: 20px; border-radius: 4px; display: inline-block; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h2>Ogiltig eller utgången länk</h2>
                            <p>Länken du klickade på är ogiltig eller har gått ut. Begär en ny länk för att få åtkomst till tjänsten.</p>
                        </div>
                    </body>
                </html>
            `);
        }
        
        if (linkData.used) {
            return res.status(410).send(`
                <html>
                    <head>
                        <title>Länk redan använd</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            .error { color: #721c24; background: #f8d7da; padding: 20px; border-radius: 4px; display: inline-block; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h2>Länk redan använd</h2>
                            <p>Denna länk har redan använts och kan inte användas igen. Begär en ny länk om du behöver åtkomst.</p>
                        </div>
                    </body>
                </html>
            `);
        }
        
        const expiry = new Date(linkData.expiresAt);
        if (expiry <= new Date()) {
            return res.status(410).send(`
                <html>
                    <head>
                        <title>Utgången länk</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            .error { color: #721c24; background: #f8d7da; padding: 20px; border-radius: 4px; display: inline-block; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h2>Länken har gått ut</h2>
                            <p>Denna länk har gått ut och kan inte längre användas. Begär en ny länk för åtkomst till tjänsten.</p>
                        </div>
                    </body>
                </html>
            `);
        }
        
        console.log(`Loading ${linkData.targetUrl} for ${linkData.email} via one-time link`);
        
        // Get service configuration to check access mode
        const services = await readServices();
        const serviceConfig = services.find(service => service.id === linkData.serviceId);
        const accessMode = serviceConfig?.accessMode || 'proxy'; // Default to proxy mode
        
        console.log(`Service ${linkData.serviceName} configured for ${accessMode} mode`);
        
        if (accessMode === 'direct') {
            // Direct Mode: Mark as used and redirect to secure iframe page to hide URL
            const updatedLinks = links.map(link => 
                link.token === token ? { ...link, used: true, usedAt: new Date().toISOString() } : link
            );
            await writeLinks(updatedLinks);
            
            // Redirect to secure-access.html with target URL and service name as parameters
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const secureAccessUrl = `${baseUrl}/domajner/secure-access.html?target=${encodeURIComponent(linkData.targetUrl)}&service=${encodeURIComponent(linkData.serviceName)}`;
            
            console.log(`Direct mode: Redirecting to secure iframe page for ${linkData.targetUrl}`);
            return res.redirect(302, secureAccessUrl);
            
        } else {
            // Proxy Mode: Redirect to proxy endpoint for URL anonymity
            console.log(`Redirecting to proxy: ${req.protocol}://${req.get('host')}/domajner/proxy-full/${token}`);
            
            // Don't mark as used here - let the proxy endpoint handle that
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            return res.redirect(302, `${baseUrl}/domajner/proxy-full/${token}`);
        }
        
    } catch (error) {
        console.error('Error processing one-time link:', error);
        res.status(500).send(`
            <html>
                <head>
                    <title>Serverfel</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        .error { color: #721c24; background: #f8d7da; padding: 20px; border-radius: 4px; display: inline-block; }
                    </style>
                </head>
                <body>
                    <div class="error">
                        <h2>Ett fel uppstod</h2>
                        <p>Ett tekniskt fel uppstod. Försök igen senare.</p>
                    </div>
                </body>
            </html>
        `);
    }
});

// Full proxy endpoint with WebSocket support and complete URL anonymity
app.use(/^\/proxy-full\/([^\/]+)(\/.*)?$/, async (req, res, next) => {
    const token = req.params[0];
    const pathSegment = req.params[1] || '/';
    console.log(`Proxy endpoint accessed: /proxy-full/${token}${pathSegment}`);
    
    try {
        // Clean expired links first
        await cleanExpiredLinks();
        
        const links = await readLinks();
        const linkData = links.find(link => link.token === token);
        
        if (!linkData) {
            return res.status(404).send(`
                <html>
                    <head><title>Ogiltig länk</title></head>
                    <body>
                        <div style="text-align: center; padding: 50px;">
                            <h2>Ogiltig länk</h2>
                            <p>Denna proxy-länk är inte längre giltig.</p>
                        </div>
                    </body>
                </html>
            `);
        }
        
        const expiry = new Date(linkData.expiresAt);
        if (expiry <= new Date()) {
            return res.status(410).send(`
                <html>
                    <head><title>Utgången länk</title></head>
                    <body>
                        <div style="text-align: center; padding: 50px;">
                            <h2>Länken har gått ut</h2>
                            <p>Denna proxy-länk har gått ut och kan inte längre användas.</p>
                        </div>
                    </body>
                </html>
            `);
        }
        
        // Mark link as used on first access (but allow continued use within session)
        if (!linkData.used) {
            const updatedLinks = links.map(link => 
                link.token === token ? { ...link, used: true, usedAt: new Date().toISOString() } : link
            );
            await writeLinks(updatedLinks);
            console.log(`Marking token ${token} as used for first proxy access`);
        }
        
        // Create proxy middleware
        const targetUrl = new URL(linkData.targetUrl);
        const proxyUrl = `${targetUrl.origin}${pathSegment}`;
        
        console.log(`Full proxy: ${req.method} ${req.originalUrl} -> ${proxyUrl}`);
        
        // Create comprehensive proxy middleware with simplified URL handling
        const proxy = createProxyMiddleware({
            target: targetUrl.origin,
            changeOrigin: true,
            ws: true, // Enable WebSocket proxying for real-time collaboration
            pathRewrite: (path, req) => {
                // Extract token and replace proxy path with target path
                const remainingPath = req.params[1] || '/';
                console.log(`Path rewrite: ${path} -> ${remainingPath}`);
                return remainingPath;
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log(`Proxying ${req.method} request to: ${proxyReq.path}`);
                
                // Set realistic browser headers for better compatibility
                proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
                proxyReq.setHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8');
                proxyReq.setHeader('Accept-Language', 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7');
                proxyReq.setHeader('Accept-Encoding', 'gzip, deflate, br');
                proxyReq.setHeader('Cache-Control', 'no-cache');
                proxyReq.setHeader('Pragma', 'no-cache');
                proxyReq.setHeader('Upgrade-Insecure-Requests', '1');
                proxyReq.setHeader('Sec-Fetch-Dest', 'document');
                proxyReq.setHeader('Sec-Fetch-Mode', 'navigate');
                proxyReq.setHeader('Sec-Fetch-Site', 'none');
                proxyReq.setHeader('Sec-Fetch-User', '?1');
                
                // Remove potentially problematic headers
                proxyReq.removeHeader('x-forwarded-for');
                proxyReq.removeHeader('x-forwarded-host');
                proxyReq.removeHeader('x-forwarded-proto');
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log(`Proxy response: ${proxyRes.statusCode} for ${req.originalUrl}`);
                
                // Remove restrictive security headers to allow embedding and functionality
                delete proxyRes.headers['x-frame-options'];
                delete proxyRes.headers['content-security-policy'];
                delete proxyRes.headers['x-content-type-options'];
                
                // Add permissive CORS headers for collaboration features
                proxyRes.headers['access-control-allow-origin'] = '*';
                proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
                proxyRes.headers['access-control-allow-headers'] = '*';
                proxyRes.headers['access-control-allow-credentials'] = 'true';
                
                // Handle HTML responses to rewrite relative URLs
                if (proxyRes.headers['content-type'] && 
                    proxyRes.headers['content-type'].includes('text/html')) {
                    
                    console.log('Intercepting HTML response for URL rewriting');
                    
                    // Store original response methods  
                    const originalWrite = res.write;
                    const originalEnd = res.end;
                    
                    let body = '';
                    
                    // Override response methods to capture HTML
                    res.write = function(chunk) {
                        if (chunk) {
                            body += chunk;
                        }
                        return true;
                    };
                    
                    res.end = function(chunk) {
                        if (chunk) {
                            body += chunk;
                        }
                        
                        try {
                            // Extract token from request URL
                            const token = req.params[0];
                            const baseProxyUrl = `/domajner/proxy-full/${token}`;
                            
                            console.log(`Rewriting URLs with base: ${baseProxyUrl}`);
                            
                            // Rewrite relative URLs to point to proxy
                            body = body.replace(/href=["']\/([^"']*?)["']/g, `href="${baseProxyUrl}/$1"`);
                            body = body.replace(/src=["']\/([^"']*?)["']/g, `src="${baseProxyUrl}/$1"`);
                            body = body.replace(/action=["']\/([^"']*?)["']/g, `action="${baseProxyUrl}/$1"`);
                            
                            console.log('URL rewriting completed, sending modified HTML');
                            
                            // Restore original methods and send modified content
                            res.write = originalWrite;
                            res.end = originalEnd;
                            
                            // Update content-length header
                            res.setHeader('content-length', Buffer.byteLength(body));
                            
                            // Send the modified content
                            originalEnd.call(res, body);
                            
                        } catch (error) {
                            console.error('Error rewriting HTML:', error);
                            // Restore methods and send original content
                            res.write = originalWrite;
                            res.end = originalEnd;
                            originalEnd.call(res, body);
                        }
                    };
                }
            },
            onError: (err, req, res) => {
                console.error('Proxy error:', err.message);
                console.error('Proxy error details:', err);
                console.error('Target URL:', linkData.targetUrl);
                console.error('Request path:', req.originalUrl);
                
                if (!res.headersSent) {
                    // Determine if this is a SSL/TLS error or connection error
                    const isConnectionError = err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === 'ETIMEDOUT';
                    const isSSLError = err.code === 'CERT_HAS_EXPIRED' || err.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE';
                    
                    let errorMessage = `Tjänsten ${linkData.serviceName} kan inte nås för tillfället.`;
                    let technicalDetails = err.message;
                    
                    if (isConnectionError) {
                        errorMessage = `Anslutning till ${linkData.serviceName} misslyckades.`;
                        technicalDetails = 'Servern svarar inte eller är otillgänglig.';
                    } else if (isSSLError) {
                        errorMessage = `SSL-certifikatfel för ${linkData.serviceName}.`;
                        technicalDetails = 'Problem med säkerhetscertifikat.';
                    }
                    
                    res.status(502).send(`
                        <html>
                            <head>
                                <title>Proxy Error - ${linkData.serviceName}</title>
                                <style>
                                    body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
                                    .error-container { max-width: 600px; margin: 50px auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
                                    .error-title { color: #d32f2f; font-size: 24px; margin-bottom: 20px; }
                                    .error-message { color: #333; font-size: 16px; margin-bottom: 20px; }
                                    .error-details { color: #666; font-size: 14px; background: #f8f8f8; padding: 10px; border-radius: 4px; margin-top: 20px; }
                                    .retry-info { color: #1976d2; font-size: 14px; margin-top: 20px; }
                                </style>
                            </head>
                            <body>
                                <div class="error-container">
                                    <div class="error-title">🚫 Tjänsten kunde inte laddas</div>
                                    <div class="error-message">${errorMessage}</div>
                                    <div class="retry-info">Försök begära en ny åtkomstlänk eller kontakta administratören om problemet kvarstår.</div>
                                    <div class="error-details">
                                        <strong>Teknisk information:</strong><br>
                                        ${technicalDetails}
                                    </div>
                                </div>
                            </body>
                        </html>
                    `);
                }
            }
        });
        
        // Apply the proxy middleware
        proxy(req, res, next);
        
    } catch (error) {
        console.error('Error in full proxy endpoint:', error);
        res.status(500).send(`
            <html>
                <head><title>Serverfel</title></head>
                <body>
                    <div style="text-align: center; padding: 50px;">
                        <h2>Ett fel uppstod</h2>
                        <p>Ett tekniskt fel uppstod. Försök igen senare.</p>
                    </div>
                </body>
            </html>
        `);
    }
});


// WebSocket proxy endpoint for real-time collaboration
app.use('/ws-proxy/:token/*', async (req, res, next) => {
    const token = req.params.token;
    const wsPath = req.params['0'] || '';
    
    try {
        const links = await readLinks();
        const linkData = links.find(link => link.token === token);
        
        if (!linkData) {
            return res.status(404).send('WebSocket proxy: Invalid token');
        }
        
        const targetUrl = new URL(linkData.targetUrl);
        const wsTarget = `${targetUrl.protocol === 'https:' ? 'wss:' : 'ws:'}//${wsPath}`;
        
        console.log(`WebSocket proxy: ${req.originalUrl} -> ${wsTarget}`);
        
        const wsProxy = createProxyMiddleware({
            target: wsTarget,
            changeOrigin: true,
            ws: true,
            pathRewrite: (path, req) => {
                const token = req.params.token;
                return path.replace(`/ws-proxy/${token}/`, '');
            }
        });
        
        wsProxy(req, res, next);
        
    } catch (error) {
        console.error('WebSocket proxy error:', error);
        res.status(500).send('WebSocket proxy error');
    }
});

// Legacy proxy endpoint - for sites that don't allow iframe embedding
app.get('/proxy/:token', async (req, res) => {
    try {
        const { token } = req.params;
        
        // Clean expired links first
        await cleanExpiredLinks();
        
        const links = await readLinks();
        const linkData = links.find(link => link.token === token);
        
        if (!linkData || linkData.used) {
            return res.status(404).send(`
                <html>
                    <head>
                        <title>Ogiltig länk</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            .error { color: #721c24; background: #f8d7da; padding: 20px; border-radius: 4px; display: inline-block; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h2>Ogiltig eller redan använd länk</h2>
                            <p>Denna proxy-länk är inte längre giltig.</p>
                        </div>
                    </body>
                </html>
            `);
        }
        
        const expiry = new Date(linkData.expiresAt);
        if (expiry <= new Date()) {
            return res.status(410).send(`
                <html>
                    <head>
                        <title>Utgången länk</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            .error { color: #721c24; background: #f8d7da; padding: 20px; border-radius: 4px; display: inline-block; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h2>Länken har gått ut</h2>
                            <p>Denna proxy-länk har gått ut och kan inte längre användas.</p>
                        </div>
                    </body>
                </html>
            `);
        }
        
        console.log(`Proxying content from ${linkData.targetUrl} for ${linkData.email}`);
        
        // Fetch the content
        try {
            const response = await axios.get(linkData.targetUrl, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; SecureAccessBot/1.0)'
                }
            });
            
            let content = response.data;
            
            // Modify content to work properly in proxy context
            if (typeof content === 'string') {
                // Fix relative URLs
                const baseUrl = new URL(linkData.targetUrl);
                content = content.replace(
                    /href=["']\/([^"']*?)["']/g, 
                    `href="${baseUrl.origin}/$1"`
                );
                content = content.replace(
                    /src=["']\/([^"']*?)["']/g, 
                    `src="${baseUrl.origin}/$1"`
                );
                
                // Add security notice
                const securityHeader = `
                    <div style="position: fixed; top: 0; left: 0; right: 0; background: #007bff; color: white; padding: 8px 15px; font-size: 14px; z-index: 9999; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: bold;">${linkData.serviceName}</span>
                            <span style="font-size: 12px; opacity: 0.9;">🔒 Säker åtkomst via proxy</span>
                        </div>
                    </div>
                    <div style="height: 40px;"></div>
                `;
                
                content = content.replace('<body', securityHeader + '<body');
            }
            
            // Set appropriate headers
            res.set({
                'Content-Type': response.headers['content-type'] || 'text/html',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff'
            });
            
            res.send(content);
            
        } catch (proxyError) {
            console.error('Proxy error:', proxyError.message);
            res.status(502).send(`
                <html>
                    <head>
                        <title>Proxy-fel</title>
                        <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                            .error { color: #721c24; background: #f8d7da; padding: 20px; border-radius: 4px; display: inline-block; }
                        </style>
                    </head>
                    <body>
                        <div class="error">
                            <h2>Kunde inte ladda tjänsten</h2>
                            <p>Tjänsten ${linkData.serviceName} kan inte nås för tillfället.</p>
                            <p><small>Fel: ${proxyError.message}</small></p>
                        </div>
                    </body>
                </html>
            `);
        }
        
    } catch (error) {
        console.error('Error in proxy endpoint:', error);
        res.status(500).send(`
            <html>
                <head>
                    <title>Serverfel</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        .error { color: #721c24; background: #f8d7da; padding: 20px; border-radius: 4px; display: inline-block; }
                    </style>
                </head>
                <body>
                    <div class="error">
                        <h2>Ett fel uppstod</h2>
                        <p>Ett tekniskt fel uppstod. Försök igen senare.</p>
                    </div>
                </body>
            </html>
        `);
    }
});

// Simple authentication middleware for admin routes
function requireAuth(req, res, next) {
    // In a real application, you would use proper session management or JWT tokens
    // For this demo, we'll accept a simple header or trust the frontend
    next();
}

// Admin: Set verification code
app.post('/api/admin/set-code', requireAuth, async (req, res) => {
    try {
        const { code } = req.body;
        
        if (!code || code.trim() === '') {
            return res.json({ success: false, message: 'Verifieringskod krävs.' });
        }
        
        await fs.writeFile(CODE_FILE, code.trim());
        
        res.json({ 
            success: true, 
            message: 'Verifieringskod sparad.' 
        });
        
    } catch (error) {
        console.error('Error saving verification code:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid sparandet av verifieringskod.' 
        });
    }
});

// Admin: Set allowed domains
app.post('/api/admin/set-domains', requireAuth, async (req, res) => {
    try {
        const { domains } = req.body;
        
        if (!domains) {
            return res.json({ success: false, message: 'Domäner krävs.' });
        }
        
        // Clean and validate domains
        const cleanedDomains = domains
            .split('\n')
            .map(domain => domain.trim().toLowerCase())
            .filter(domain => domain !== '' && domain.includes('.'));
        
        await fs.writeFile(DOMAINS_FILE, cleanedDomains.join('\n') + '\n');
        
        res.json({ 
            success: true, 
            message: 'Domäner sparade.' 
        });
        
    } catch (error) {
        console.error('Error saving domains:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid sparandet av domäner.' 
        });
    }
});

// Admin: Get allowed domains
app.get('/api/admin/get-domains', requireAuth, async (req, res) => {
    try {
        const content = await fs.readFile(DOMAINS_FILE, 'utf-8');
        
        res.json({ 
            success: true, 
            domains: content.trim()
        });
        
    } catch (error) {
        console.error('Error reading domains:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid läsning av domäner.' 
        });
    }
});

// Admin: Get services
app.get('/api/admin/get-services', requireAuth, async (req, res) => {
    try {
        const services = await readServices();
        res.json({ 
            success: true, 
            services: services
        });
    } catch (error) {
        console.error('Error reading services:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid läsning av tjänster.' 
        });
    }
});

// Admin: Save services
app.post('/api/admin/set-services', requireAuth, async (req, res) => {
    try {
        const { services } = req.body;
        
        if (!services || !Array.isArray(services)) {
            return res.json({ success: false, message: 'Ogiltig tjänstdata.' });
        }
        
        // Validate service structure
        for (const service of services) {
            if (!service.id || !service.name || !service.url) {
                return res.json({ success: false, message: 'Alla tjänster måste ha id, namn och URL.' });
            }
            
            // Validate accessMode
            if (service.accessMode && !['proxy', 'direct'].includes(service.accessMode)) {
                return res.json({ success: false, message: 'Ogiltig accessMode. Måste vara "proxy" eller "direct".' });
            }
            
            // Set default accessMode if not specified
            if (!service.accessMode) {
                service.accessMode = 'proxy';
            }
        }
        
        const success = await writeServices(services);
        
        if (success) {
            res.json({ 
                success: true, 
                message: 'Tjänster sparade.' 
            });
        } else {
            res.json({ 
                success: false, 
                message: 'Ett fel uppstod vid sparandet av tjänster.' 
            });
        }
        
    } catch (error) {
        console.error('Error saving services:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid sparandet av tjänster.' 
        });
    }
});

// Admin: Get one-time links (for monitoring)
app.get('/api/admin/get-links', requireAuth, async (req, res) => {
    try {
        await cleanExpiredLinks();
        const links = await readLinks();
        
        // Remove sensitive data before sending to admin
        const sanitizedLinks = links.map(link => ({
            token: link.token.substring(0, 8) + '...',
            email: link.email,
            serviceName: link.serviceName,
            createdAt: link.createdAt,
            expiresAt: link.expiresAt,
            used: link.used,
            usedAt: link.usedAt
        }));
        
        res.json({ 
            success: true, 
            links: sanitizedLinks
        });
    } catch (error) {
        console.error('Error reading links:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid läsning av länkar.' 
        });
    }
});

// Settings API endpoints
app.get('/api/settings', async (req, res) => {
    try {
        const settings = await readSettings();
        res.json({ 
            success: true, 
            settings: settings 
        });
    } catch (error) {
        console.error('Error reading settings:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid läsning av inställningar.' 
        });
    }
});

// Admin: Get settings
app.get('/api/admin/get-settings', requireAuth, async (req, res) => {
    try {
        const settings = await readSettings();
        res.json({ 
            success: true, 
            settings: settings 
        });
    } catch (error) {
        console.error('Error reading settings:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid läsning av inställningar.' 
        });
    }
});

// Admin: Update settings (with file upload)
app.post('/api/admin/settings', requireAuth, upload.single('logo'), async (req, res) => {
    try {
        const currentSettings = await readSettings();
        const newSettings = { ...currentSettings };
        
        // Update page title if provided
        if (req.body.pageTitle !== undefined) {
            newSettings.pageTitle = req.body.pageTitle || 'Tjänståtkomst';
        }
        
        // Handle logo upload
        if (req.file) {
            // Delete old logo file if it exists
            if (currentSettings.logoUrl) {
                try {
                    const oldFilePath = path.join(__dirname, currentSettings.logoUrl);
                    await fs.unlink(oldFilePath);
                } catch (err) {
                    console.warn('Could not delete old logo file:', err.message);
                }
            }
            
            // Set new logo URL
            newSettings.logoUrl = `uploads/${req.file.filename}`;
        }
        
        const success = await writeSettings(newSettings);
        
        if (success) {
            res.json({ 
                success: true, 
                message: 'Inställningar sparade framgångsrikt!',
                settings: newSettings
            });
        } else {
            res.json({ 
                success: false, 
                message: 'Ett fel uppstod vid sparandet av inställningar.' 
            });
        }
    } catch (error) {
        console.error('Error saving settings:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid sparandet av inställningar.' 
        });
    }
});

// Admin: Remove logo
app.post('/api/admin/remove-logo', requireAuth, async (req, res) => {
    try {
        const currentSettings = await readSettings();
        
        // Delete logo file if it exists
        if (currentSettings.logoUrl) {
            try {
                const filePath = path.join(__dirname, currentSettings.logoUrl);
                await fs.unlink(filePath);
            } catch (err) {
                console.warn('Could not delete logo file:', err.message);
            }
        }
        
        // Update settings to remove logo URL
        const newSettings = { ...currentSettings, logoUrl: null };
        const success = await writeSettings(newSettings);
        
        if (success) {
            res.json({ 
                success: true, 
                message: 'Logo borttagen framgångsrikt!',
                settings: newSettings
            });
        } else {
            res.json({ 
                success: false, 
                message: 'Ett fel uppstod vid borttagandet av logotypen.' 
            });
        }
    } catch (error) {
        console.error('Error removing logo:', error);
        res.json({ 
            success: false, 
            message: 'Ett fel uppstod vid borttagandet av logotypen.' 
        });
    }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Catch-all route for undefined routes
app.use('*', (req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
        success: false, 
        message: `Route not found: ${req.method} ${req.originalUrl}` 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    initializeFiles();
});