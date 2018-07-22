const mongoose = require("mongoose");

//import Collection/Model from Models folder
let Chat = require("../models/chat");

//to create an object(controller) with methods to manipulate the data in db.
let chatController = {};

chatController.save = (s, data)  => {
    //create document in collection/model
    let newMsg = new Chat({ userName: s.userName, msg:data});

    //save created document in db
    newMsg.save((err) => {
        if(err){
          return console.log('There is an error in saving the task.');
        }
        // to send the chat info to the clients other than the one who sent the message
        s.broadcast.emit('new chat',{userName:s.userName, msg:data});
    });
} 

chatController.list = (s) => {
  // to get recent 7 chats saved in db
   let query = Chat.find({});
     query.limit(7).sort('-created').exec(function(err, docs){
     if(err){
       return console.log("There is a problem in sending the chats.");  
     }
     // to send stored msgs from db to client    
     s.emit('load old msgs', docs);
   });
}

chatController.clear = (s) => {
//remove all chats from db
    Chat.remove({}, (err) => {
     if (err)  return console.log('Threre is an error in deleting chats');
      s.emit('cleared');
    });
}    

//export chatController object to be available in other files
module.exports  = chatController;
