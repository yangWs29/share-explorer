FROM node:20.10.0-alpine3.19 AS base

# 添加源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache ffmpeg
RUN apk add --no-cache rsync

FROM base AS deps-node-pty

# node-pty install
RUN apk add --no-cache g++ make py3-pip


# Install dependencies only when needed
FROM deps-node-pty AS deps

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY explorer/package.json ./explorer/package.json
COPY explorer-manager/package.json ./explorer-manager/package.json
COPY q-bittorrent/package.json ./q-bittorrent/package.json
COPY rss-parse/package.json ./rss-parse/package.json
RUN npm config set registry https://registry.npmmirror.com/
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/explorer/node_modules ./explorer/node_modules
COPY --from=deps /app/explorer-manager/node_modules ./explorer-manager/node_modules
COPY --from=deps /app/q-bittorrent/node_modules ./q-bittorrent/node_modules
COPY --from=deps /app/rss-parse/node_modules ./rss-parse/node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run explorer-build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Set the correct permission for prerender cache
RUN mkdir .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=1000:100 /app/explorer/.next/standalone ./
COPY --from=builder --chown=1000:100 /app/explorer/.next/static ./explorer/.next/static

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "./explorer/server.js"]
