const mongoose = require('mongoose');


//create Schema
let ChatSchema = mongoose.Schema({
   userName:String,
   msg:String,
   created: { type: Date, default: Date}
});

// to export model
module.exports = mongoose.model('Message',ChatSchema);


