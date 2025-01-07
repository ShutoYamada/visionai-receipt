FROM node:lts-slim

WORKDIR /usr/src/app

ENV PORT 8080

RUN npm i -g typescript

COPY package*.json ./

RUN npm install 

COPY . ./

RUN npm run build
CMD [ "npm", "start" ]