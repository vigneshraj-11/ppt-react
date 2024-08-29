# Stage 1: Build the Vite app
FROM node as vite-app

WORKDIR /app/client
COPY ./client . 

RUN npm install
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
COPY --from=vite-app /app/client/dist .

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
