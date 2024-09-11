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

# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Copy built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Default command
CMD ["nginx", "-g", "daemon off;"]
