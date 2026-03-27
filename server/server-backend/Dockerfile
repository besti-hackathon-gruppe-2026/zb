FROM node:25-alpine

WORKDIR /app

COPY package.json package.json

RUN npm i

COPY . .

EXPOSE 8000
CMD node server.js