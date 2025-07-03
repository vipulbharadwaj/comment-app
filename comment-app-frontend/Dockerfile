# comment-app-frontend/Dockerfile

FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install deps (for Linux inside Docker)
RUN npm install

# Copy rest of the app
COPY . .

# Expose frontend port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--", "--host"]
