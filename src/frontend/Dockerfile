# FROM node:10.19.0 as build
FROM node:gallium-alpine3.16 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]