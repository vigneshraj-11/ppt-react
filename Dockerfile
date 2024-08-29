FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT=7123

EXPOSE 7123

CMD [ "npm", "run", "dev"]