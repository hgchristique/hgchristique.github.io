# Build context is the repository root: the server reads prices from src/data/products.js.
FROM node:20-alpine

WORKDIR /app

COPY payment/package.json payment/package-lock.json ./payment/
RUN cd payment && npm ci --omit=dev

COPY payment/server.js ./payment/
COPY payment/lib ./payment/lib
COPY payment/routes ./payment/routes
COPY src/data/products.js ./src/data/products.js

# products.js is an ES module; mark everything outside payment/ accordingly.
RUN echo '{"type":"module"}' > package.json \
 && mkdir -p payment/data \
 && chown -R node:node payment/data

ENV NODE_ENV=production
USER node
WORKDIR /app/payment
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3001/health || exit 1

CMD ["node", "server.js"]
