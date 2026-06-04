# ─────────────────────────────────────────────
# Stage 1 — dependency cache
# Fetch all packages into the pnpm store so the
# install step can run fully offline and be cached
# independently of source-code changes.
# ─────────────────────────────────────────────
FROM node:22-alpine AS deps

# Pin pnpm to the same major version used in CI (pnpm@10).
# pnpm 11+ requires Node.js v22+ (uses node:sqlite which is unavailable on v20).
RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Copy only the lockfile first so this layer is
# invalidated only when dependencies change.
COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY package.json ./
RUN pnpm install --frozen-lockfile --offline


# ─────────────────────────────────────────────
# Stage 2 — builder
# NEXT_PUBLIC_* variables must be present at
# build time because Next.js inlines them into
# the client bundle during `next build`.
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder

# Same pnpm version pin as the deps stage.
RUN corepack enable && corepack prepare pnpm@10 --activate

WORKDIR /app

# Receive Firebase config as build arguments.
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_APP_ID

# Expose them as environment variables for the build process.
ENV NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ENV NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
# Enable standalone output for Docker (disabled on Vercel where this env var is absent)
ENV DOCKER_BUILD=true

# Copy installed node_modules from deps stage.
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build


# ─────────────────────────────────────────────
# Stage 3 — runner (production image)
# Only the standalone output is copied, keeping
# the final image as small as possible (~150 MB).
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
# Next.js telemetry is disabled in CI/container environments.
ENV NEXT_TELEMETRY_DISABLED=1

# Run as a non-root user for security.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# standalone server entry point
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# static assets (/_next/static/*)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static  ./.next/static
# public folder (favicon, robots.txt, etc.) — only copied if it exists.
# Use a shell glob: if /app/public doesn't exist the pattern simply matches nothing
# and the COPY is skipped rather than erroring out.
COPY --from=builder --chown=nextjs:nodejs /app/public*        ./public/

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
