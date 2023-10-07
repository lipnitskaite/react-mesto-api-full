ARG NODE_VERSION=16

FROM node:$NODE_VERSION-alpine

WORKDIR /mesto-frontend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]