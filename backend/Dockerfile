ARG NODE_VERSION=16

FROM node:$NODE_VERSION-alpine

WORKDIR /mesto-backend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node","app.js"]