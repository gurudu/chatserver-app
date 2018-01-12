# Chatserver application
This is a real-time chat web application using Node.js, express, socket.io and MongoDB.

## Architecture:
 * Let <----> indicates Bi-directional communication.
 
               Client or Clients (Browser)  <----port 3000-----> Server (Node.js) <--------> Database (MongoDB)
 
## Technology stack used:
  * Client -- HTML5, CSS3, JQuery, ES6, socket.io
 
  * Server -- Node.js, express, socket.io
 
  * Database -- NoSQL DB (MongoDB) hosted on local computer on port 27017 and used Mongoose as mongodb object modeling.

## Design -- UI prototype is built using https://moqups.com/
* Page 1 : user submission form
  https://app.moqups.com/gharikumar2@gmail.com/PYObmWuL29/view/page/a76aecbd2
  When user submit a valid message then the ui in page 2 (below) appears on screen.

* page 2: This page has Message form, chat box and list online users
  https://app.moqups.com/gharikumar2@gmail.com/PYObmWuL29/view/page/aa283d2c3

## Contents
* /client - static files for view, styling, interaction and directories for jquery, scoket.io libraries.
* /controllers - files to manipulate the data in Database
* /models -  folder for the Database models 
* README.md - this file 
* server.js - central app file
* package.json - package info (dependencies and other info about the project)
* Dockerfile -  has instructions to build a Docker image of our app.
* .dockerignore - prevent our local modules and debug logs from being copied onto our Docker image.
* docker-compose.yml - to run different services (Node.js app as a service to MongoDB) in a single Docker container.
* .gitignore - Git uses it to determine which files and directories to ignore when we commit

## To run this application 
Follow below instructions to run this app in your local computer
* git clone https://github.com/gurudu/chatserver-app.git
* npm install
 
* start running MongoDB in background on port 27017 (is default)
  * mongod --port 27017 
  * net start MongoDB
*  Next we can run our app in our local host or as a docker container. So, follow any one of the below: 
#### on local host  
* In server.js file, give the MongoDB URI as mongodb://localhost:27017/chat 
* npm start
  
                   OR 
      
#### as an image in a container
* In server.js file, give MongoDB the MongoDB URI as mongodb://database:27017/chat  
  * please see https://stackoverflow.com/questions/41861908/cant-connect-to-docker-mongodb
* install docker and run docker in background
* docker-compose up --build // to buid image and run the whole app as a container

## Features of this app
* presents good UI design
* Responsive design (using media queries and breakpoints)
* Listening and emiting events allows two way communication between the client(s) and the server.
* Support for user name 
* Client-side and server-side validation
* Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
* “{user} is typing” functionality
* Show who’s online
* Messages are stored in Database, there by provides data persistence. The recent 7 messages are shown in chat box.
* Added clear button to clear all the messages in chat box as well as in database.
* Dockerized application i.e can be run as a docker container and can be deployed to Cloud platforms, PaaS (ex: using Amazon ec2          container service):
## Edge cases considered
* user name and message should not be empty.
* username must be unique
* username must contain alphabets with/without spaces. i.e (not to contain numbers and special characters)
* Added code for Client side and server side validation (ex: form fields and data manipulation operations in database).
* This app is tested manually to ensure all the features are correct, fulfilled and safe.
* This app is scalable to add more features as mentioned in future work.

## Future work
* Add private messaging
* "Message sent" feedback message to the user
* allow chat rooms
* User authentication (login ans logout options) 
* add more input fields for user form
* To edit, update and delete a message(s) from chat box
* To host this app in the AWS ec2 container service.
* consider all possible edge cases
* Improve UI/UX.
* Many more
