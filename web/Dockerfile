FROM node:15-alpine

WORKDIR /apptestdump.sql

COPY package*.json ./

RUN npm install
RUN npm install node-fetch
RUN npm install pug

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
