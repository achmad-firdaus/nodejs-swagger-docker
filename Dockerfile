# Use the latest version of Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# npm init -y && \

RUN cd /usr/src/app && \ 
    npm install express cors swagger-ui-express dotenv

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["nodemon", "index.js"]
