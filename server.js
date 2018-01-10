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
let onlineUsers = [];

http.listen(port, () => {
  console.log(`server is listening for requests on port ${port}`);
});

//Allow use of static files in client folder
app.use(express.static(__dirname + '/client'));

app.get('/', (req, res) => {
   res.sendFile( __dirname + '/client/index.html');
});

io.on('connection', (socket) => {
   console.log('a user connected');
   
   socket.on('new user', (data, callback) => {
  	if(onlineUsers.indexOf(data) !== -1){
  		callback(false);
  	  } else {
  	  	callback(true);
  	  	socket.userName = data;
  	  	onlineUsers.push(socket.userName);
        updateOnlineUsers();
  	  }
    });

   socket.on('send chat', (data) => {
   	    chat.save(socket,data);
      });

    socket.on('disconnect', () => {
   	console.log('a user disconnected', socket.id);
   	if(!socket.userName) return;
     onlineUsers.splice(onlineUsers.indexOf(socket.userName),1);
     updateOnlineUsers();
   });

   function updateOnlineUsers(){
   	 io.emit('online users', onlineUsers);
   }

    socket.on('typing', (data) => {
   	 socket.broadcast.emit('typing', data);
   });
});