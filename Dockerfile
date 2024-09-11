# Step 1: Use Node.js image to build the React app
FROM node:18 AS build

# Add build arguments
ARG REACT_ENV_FILE
# Copy the env file
COPY ${REACT_ENV_FILE} /app/.env

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Use Nginx to serve the built React app
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default command
CMD ["nginx", "-g", "daemon off;"]
