# Use the official Node.js Alpine image as the base
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Build TypeScript source code
RUN npm run build

# Expose the port your app is listening on
EXPOSE 3000

# Start the app
CMD ["node", "./dist/server.js"]
