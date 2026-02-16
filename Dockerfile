# News app Dockerfile - Multi-stage build for production
FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY milkly-news/package.json milkly-news/bun.lock* ./
RUN bun install --frozen-lockfile

# Build stage
FROM node:20-slim AS builder
WORKDIR /app
COPY milkly-news/ .
COPY --from=deps /app/node_modules ./node_modules
RUN npx vite build

# Production stage with nginx
FROM nginx:alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY milkly-news/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
