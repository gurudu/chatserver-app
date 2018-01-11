const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io');

//Socket setup and pass server
const io = socket(http);

let chat = require("./controllers/chatController.js");

//db configuration
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//mongodb hosted locally
mongoose.connect('mongodb://localhost:27017/chatThree', { useMongoClient:true })
   .then(() => console.log('MongoDB connection successful'))
   .catch((err)=> console.error(err));


let port = process.env.PORT || 3000;

//array to store list of online users
let onlineUsers = [];

http.listen(port, () => {
  console.log(`server is listening for requests on port ${port}`);
});

//Allow use of static files in client folder
app.use(express.static(__dirname + '/client'));

// send index.html file when user visit the root "/" page
app.get('/', (req, res) => {
   res.sendFile( __dirname + '/client/index.html');
});

//listens and emit events when a user is connected
io.on('connection', (socket) => {
   console.log('a user connected');

   // to show a list of old chats on client
   chat.list(socket);
   
   //listens when a new user is conneced
   socket.on('new user', (data, callback) => {
    // here callback function will pass the data to client whether the user is in online or not
    // so that the client can check for unique user name
  	if(onlineUsers.indexOf(data) !== -1){
  		callback(false);
  	  } else {
  	  	callback(true);
  	  	socket.userName = data;
  	  	onlineUsers.push(socket.userName);
        updateOnlineUsers();
  	  }
    });
   
   //to listen and save chat on db
   socket.on('send chat', (data) => {
   	    chat.save(socket,data);
      });
    
    // listen when a user is disconected on socket
    socket.on('disconnect', () => {
   	console.log('a user disconnected', socket.id);
    //to exit when a user name does not exists(when a user disconnects without entering user name)
   	if(!socket.userName) return; 
    //to remove user from list of online users
     onlineUsers.splice(onlineUsers.indexOf(socket.userName),1);
     updateOnlineUsers();
   });

  // to send an array of online users to client 
   function updateOnlineUsers(){
   	 io.emit('online users', onlineUsers);
   }
   // to send to all users(except the one who is typing)
    socket.on('typing', (data) => {
   	 socket.broadcast.emit('typing', data);
   });

  // to listen on clear button event and remove all chats from db
   socket.on('clear', () => {
     chat.clear(socket);
  });
});