# Use Node.js 18 Alpine for smaller image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Create app user for security
RUN addgroup -g 1001 -S nodejs && adduser -S domajner -u 1001

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=domajner:nodejs . .

# Create data directory for persistent files
RUN mkdir -p /app/data && chown domajner:nodejs /app/data

# Create default configuration files if they don't exist
RUN echo "example.com" > /app/allowed_domains.txt && \
    echo "123456" > /app/verification_code.txt && \
    echo "[]" > /app/services.json && \
    echo '{"links":[]}' > /app/one_time_links.json && \
    chown domajner:nodejs /app/*.txt /app/*.json

# Expose port
EXPOSE 3000

# Switch to non-root user
USER domajner

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); \
               const req = http.request({hostname: 'localhost', port: 3000, path: '/api/health'}, (res) => { \
                 process.exit(res.statusCode === 200 ? 0 : 1); \
               }); \
               req.on('error', () => process.exit(1)); \
               req.end();"

# Start the application
CMD ["node", "server.js"]