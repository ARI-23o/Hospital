# ==========================================
# Multi-Stage Production Dockerfile for Chandrapura Kidney Care Hospital
# Enforces non-root execution, minimal attack surface, and health check
# ==========================================

# Stage 1: Build the React Frontend
FROM node:20-alpine AS client-builder
WORKDIR /app/client

# Install frontend dependencies
COPY client/package*.json ./
RUN npm ci --silent

# Copy frontend source and build
COPY client/ ./
RUN npm run build

# Stage 2: Production Server
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install production dependencies for server & root
COPY package*.json ./
RUN npm ci --only=production --silent

# Copy backend source
COPY server/ ./server/

# Copy built frontend assets from client-builder into client/dist
COPY --from=client-builder /app/client/dist ./client/dist

# Create SQLite storage directory with proper permissions
RUN mkdir -p /app/server/data && chown -R node:node /app

# Switch to non-root user
USER node

# Expose port
EXPOSE 5000

# Health check probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start the application
CMD ["node", "server/src/index.js"]
