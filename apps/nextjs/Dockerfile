FROM --platform=linux/amd64 node:18.12-alpine3.17 AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
USER root
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@acme/nextjs --docker

FROM base AS prod-deps
RUN yarn global add pnpm
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Add lockfile and package.json's of isolated subworkspace
FROM --platform=linux/amd64 node:18.12-alpine3.17 AS installer
USER root
ENV NEXT_STANDALONE true
ENV SKIP_ENV_VALIDATION true
ENV CI false
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/full/ .
RUN yarn global add pnpm
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm db:generate

# Build the project and its dependencies
COPY turbo.json turbo.json
COPY tsconfig.json tsconfig.json

RUN pnpm build --filter=nextjs

FROM --platform=linux/amd64 node:18.12-alpine3.17 AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs
USER nextjs

#COPY --from=installer /app .
COPY --from=installer /app/apps/nextjs/next.config.mjs ./
COPY --from=installer /app/apps/nextjs/package.json ./

COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/.next/static ./apps/nextjs/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/nextjs/public ./apps/nextjs/public

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD node apps/nextjs/server.js
