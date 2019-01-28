var mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb/mytoken');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("mongodb started");
});


module.exports = {
  'secret': 'ilovescotchyscotch',
   
   'database': 'mongodb://localhost/mytoken'

};
