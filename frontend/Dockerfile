# Use official Node.js LTS image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the React app
RUN npm run build

# Production stage: serve with nginx
FROM nginx:alpine

# Copy built React app to nginx html folder
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3000
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
