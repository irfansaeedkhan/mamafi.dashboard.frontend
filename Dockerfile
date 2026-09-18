# Use the official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js runs on (usually 3000)
EXPOSE 3000

# Start Next.js development server with file watch
CMD ["npm", "run", "dev"]
