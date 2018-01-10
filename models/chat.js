const mongoose = require('mongoose');


//create Schema
let ChatSchema = mongoose.Schema({
   userName:String,
   msg:String,
   created: { type: Date, default: Date}
});


module.exports = mongoose.model('Message',ChatSchema);


