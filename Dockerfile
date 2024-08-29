# Stage 1: Build the Vite app
FROM node:20-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:alpine

# Copy the custom NGINX configuration (optional)
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default NGINX static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 7124 to the outside world
EXPOSE 7124

# Command to start NGINX
CMD ["nginx", "-g", "daemon off;"]
