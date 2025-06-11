FROM node:20

# Create app directory
WORKDIR /src/app

# Install app dependencies
COPY package*.json .

RUN npm install 

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the app
CMD [ "npm", "run", "dev" ]