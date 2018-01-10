const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('socket.io');
//Socket setup and pass server
const io = socket(http);

let port = process.env.PORT || 3000;


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
   
   socket.on('new user', (data) => socket.userName = data );

   socket.on('send chat', (data) => {
        socket.broadcast.emit('new chat', { userName:socket.userName, msg:data });
      });
});