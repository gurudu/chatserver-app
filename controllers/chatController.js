const mongoose = require("mongoose");
let Chat = require("../models/chat");

let chatController = {};

chatController.save = (s, data)  => {
    //create document in collection/model
    let newMsg = new Chat({ userName: s.userName, msg:data});
    //save created document in db
    newMsg.save((err) => {
        if(err){
          return res.status(500).send('There is an error in saving the task.');
        }
        console.log(data); 
        s.broadcast.emit('new chat',{userName:s.userName, msg:data});
    });
} 


chatController.list = (s) => {
  // to get recent 5 chats saved in db
   let query = Chat.find({});
     query.limit(5).sort('-created').exec(function(err, docs){
     if(err){
       return res.status(500).send("There is a problem in sending the chats.");  
     }
     s.emit('load old msgs', docs);
   });
}

module.exports  = chatController;