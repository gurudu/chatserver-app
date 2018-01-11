#Long term support version carbon of node available from the Docker Hub
FROM node:carbon

#Create app directory which holds our app code inside the image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

#To bundle our app's source code inside the Docker image
COPY . .

# Our app binds to port 3000, which is mapped by Docker Daemon
EXPOSE 3000

#npm start which will run node server.js to start our server
CMD [ "npm", "start"]
