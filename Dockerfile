FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7124

CMD [ "npm", "run", "dev" ]