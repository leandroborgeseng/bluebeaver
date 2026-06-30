# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_CONTACT_PHONES
ARG NEXT_PUBLIC_CONTACT_ADDRESSES_JSON
ARG NEXT_PUBLIC_WHATSAPP_E164

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_CONTACT_PHONES=$NEXT_PUBLIC_CONTACT_PHONES
ENV NEXT_PUBLIC_CONTACT_ADDRESSES_JSON=$NEXT_PUBLIC_CONTACT_ADDRESSES_JSON
ENV NEXT_PUBLIC_WHATSAPP_E164=$NEXT_PUBLIC_WHATSAPP_E164

RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
