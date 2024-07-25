# Use the official Node.js image as the base image
FROM node:19.9.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
# Command to run the server

CMD ["npm", "start"]
