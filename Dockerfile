FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8787
ENV DB_FILE=/data/kho-mon-gym.sqlite
ENV APP_TIME_ZONE=Asia/Ho_Chi_Minh
COPY --from=build /app/package*.json ./
COPY --from=build /app/server ./server
COPY --from=build /app/dist ./dist
RUN mkdir -p /data
EXPOSE 8787
VOLUME ["/data"]
CMD ["npm", "start"]
