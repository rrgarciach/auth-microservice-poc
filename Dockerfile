FROM node:6.11.3-alpine

workdir /usr/app

COPY package.json .

RUN npm install --quite

COPY . .
