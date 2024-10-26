# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY .env.local .

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/.env.local .

RUN npm install --only=production

CMD ["npm", "start"]
