# Stage 1: Build the Vite app
FROM node:20-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app using serve
FROM node:20-alpine

# Install the serve package globally
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build-stage /app/dist /app/dist

# Expose port 7124
EXPOSE 7124

# Command to start the serve package
CMD ["serve", "-s", "dist", "-l", "7124"]