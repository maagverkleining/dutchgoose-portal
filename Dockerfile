FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV STATIC_ROOT=dutchgoose-live

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --chown=nextjs:nodejs scripts/serve-static-site.mjs ./scripts/serve-static-site.mjs
COPY --chown=nextjs:nodejs dutchgoose-live ./dutchgoose-live

USER nextjs
EXPOSE 3000
CMD ["node", "scripts/serve-static-site.mjs"]
