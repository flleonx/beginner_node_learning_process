FROM node:alpine3.10

RUN apk add tzdata
ENV TZ America/Bogota

RUN rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV HOST 0.0.0.0
EXPOSE 8080

CMD [ "npm", "start" ]
