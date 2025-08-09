# Multi-stage build for Vue.js application

# Stage 1: Build the application
FROM node:20-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --silent && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM nginx:stable-alpine AS production-stage

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built application from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add a health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Labels for metadata
LABEL org.opencontainers.image.source="https://github.com/YOUR_USERNAME/unifiedcontractors"
LABEL org.opencontainers.image.description="Unified Contractors Vue.js Application"
LABEL org.opencontainers.image.licenses="MIT"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]