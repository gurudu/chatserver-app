const mongoose = require('mongoose');


//create Schema
let ChatSchema = mongoose.Schema({
   userName: {
   	 type: String,
   	 required: true
   },
   msg: {
   	 type: String,
   	 required: true
   },
   created: {
    type: Date, 
    default: Date.now()
   }
});

// to export model
module.exports = mongoose.model('Message',ChatSchema);


