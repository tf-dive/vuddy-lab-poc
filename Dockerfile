FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY public ./public
COPY app ./app
COPY components ./components
COPY hooks ./hooks
COPY lib ./lib
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./

RUN npm run build

FROM node:20-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PHASE=dev

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app

EXPOSE 3000

USER nextjs:nodejs

CMD ["npm", "start"]
