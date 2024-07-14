# Use node-slim image as base
FROM node:16.19-slim as builder

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
