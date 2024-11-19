# Set up a build environment
FROM node:20 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire source code into the build environment
COPY . .

# Run the build script
RUN npm run build

# Set up the final production build
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the production dependencies from the builder
COPY package*.json ./
RUN npm ci --only=production

# Copy the build output from the builder stage
COPY --from=builder /usr/src/app/build ./build

# Expose the app's port
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
