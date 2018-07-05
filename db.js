var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});

mongoose.model( 'Todo', Todo );
mongoose.connect( 'mongodb://localhost/express-todo' )
.then(
  () => { console.log("Connected to db"); },
  err => { console.log(err.message); }
);
