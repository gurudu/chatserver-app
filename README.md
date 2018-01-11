# Chatserver application
This is a real-time chat web application using Node.js, express, socket.io and MongoDB.

### Architecture:
 * Let <----> is Bi-directional communication
 
               Client or Clients (Browser)  <----port 3000-----> Server (Node.js) <--------> Database (MongoDB)
 
### Technology stack used:
  * Client -- HTML5, CSS3, JQuery, ES6, socket.io
 
  * Server -- Node.js, express, socket.io
 
  * Database -- NoSQL DB (MongoDB) hosted on local computer on port 27017 and used Mongoose as mongodb object modeling

### Design -- UI prototype is built using https://moqups.com/
* Page 1 : user submission form
https://app.moqups.com/gharikumar2@gmail.com/PYObmWuL29/view/page/a76aecbd2
When user submit a valid message then the ui in page 2 (below) appears on screen.

* page 2: This page has Message form, chat box and list online users

https://app.moqups.com/gharikumar2@gmail.com/PYObmWuL29/view/page/aa283d2c3

### Contents
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
* npm install  // to install dependencies
 
* start running MongoDB in background on port 27017 (is default)
  * mongod --port 27017 
  * net start MongoDB
#### on local host  
* In server.js file, give the MongoDB URI as mongodb://localhost:27017/chat 
* npm start // to start the server

#### as an image in a container
* In server.js file, give MongoDB the MongoDB URI as mongodb://database:27017/chat  
* install docker and run docker in background
* docker-compose up --build // to buid image and run the whole app as a container

### features of this app
* listening and emiting events allows two way communication between the client(s) and the server.
* Has support for user name 
* user name validation on client-side
* Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
* “{user} is typing” functionality
* Show who’s online
* presents good UI design
* messages are stored in Database, ther by provides data persistence
### edge cases considered


### Future work
* Add private messaging
* "Message sent" feedback message to the user
* allow chat rooms
* consider all possible edge cases






### edge cases 





