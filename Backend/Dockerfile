# Use Node base image
FROM node:18

# Install LibreOffice
RUN apt-get update && apt-get install -y libreoffice

# Set the working directory inside the container
WORKDIR /app

# Copy project files into the container
COPY . .

# Install dependencies
RUN npm install

# Make sure uploads and files folders exist
RUN mkdir -p uploads files

# Expose the port your server runs on
EXPOSE 3000

# Start the backend
CMD ["node", "index.js"]
