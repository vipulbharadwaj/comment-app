# comment-app-backend/Dockerfile

FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
