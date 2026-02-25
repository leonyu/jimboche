FROM docker.io/library/alpine:3.23 AS builder
RUN apk add --no-cache nodejs npm chromium
ENV CHROME_BIN '/usr/bin/chromium-browser'
COPY . /build
WORKDIR /build
RUN npm ci && npm run lint && npm run build && npm test -- --ci --coverage
RUN npm ci --omit=dev
RUN mkdir /stage && cp -r /build/dist /build/node_modules /build/package.json /stage
