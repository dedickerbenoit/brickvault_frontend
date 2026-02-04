# Multi-stage Dockerfile for React 19 + Vite application
# Supports both development and production environments

# ============================================
# Base Stage - Common dependencies
# ============================================
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files first (for layer caching)
COPY package.json package-lock.json ./

# ============================================
# Development Stage
# ============================================
FROM base AS development

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy application code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server with host 0.0.0.0 to allow external access
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ============================================
# Build Stage - Create production bundle
# ============================================
FROM base AS build

# Install all dependencies (needed for build)
RUN npm ci

# Copy application code
COPY . .

# Build the application (TypeScript compilation + Vite build)
RUN npm run build

# ============================================
# Production Stage - Serve with Nginx
# ============================================
FROM nginx:alpine AS production

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
