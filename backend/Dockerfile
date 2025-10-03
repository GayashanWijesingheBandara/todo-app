# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Install dependencies separately to leverage Docker cache
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose backend port
EXPOSE 5000

# Set environment variables (optional, can also use .env)
ENV NODE_ENV=production
ENV PORT=5000

# Start the backend
CMD ["node", "dist/index.js"]
