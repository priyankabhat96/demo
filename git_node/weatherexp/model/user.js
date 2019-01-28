var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var tempdata = new Schema({
    day : String,
    temperature : [Number]
});
var User=mongoose.model("tempdata", tempdata);
module.exports=User;