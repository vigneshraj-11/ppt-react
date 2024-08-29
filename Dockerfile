FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV PORT=7124

EXPOSE 7124

CMD [ "npm", "run", "dev"]