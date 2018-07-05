var express = require('express');
var mongoose = require( 'mongoose' );
var Todo = mongoose.model( 'Todo' );
var router = express.Router();

//GET home page.
// query db for all todo items
router.get('/', function ( req, res, next ){
  Todo.find({}).exec(function ( err, todos ){
    const o = {
      title: 'Express Todo Example',
      todos: todos
    };
    console.log(todos);
    res.render( 'index', o);
  });
});
// Redrect the page back to index after the record is created
router.post('/create', function ( req, res, next ){
  new Todo({
    content    : req.body.content,
    updated_at : Date.now()
  }).save( function( err, todo){
    console.log("Written??");
    console.log(todo);
    res.redirect( '/' );
  });
});

//edit
router.get('/edit/:id', function ( req, res, next ){
  Todo.find({}).exec(function ( err, todos ){
    res.render( 'edit', {
        title   : 'Express Todo Example',
        todos   : todos,
        current : req.params.id
    });
  });
});

//update
router.post('/update/:id', function ( req, res ){
  Todo.findById( req.params.id, function ( err, todo ){
    todo.content    = req.body.content;
    todo.updated_at = Date.now();
    todo.save( function ( err, todo, count ){
      res.redirect( '/' );
    });
  });
});

// destroy
router.get('/destroy/:id', function ( req, res ){
  Todo.findById( req.params.id, function ( err, todo ){
    todo.remove( function ( err, todo ){
      res.redirect( '/' );
    });
  });
});

module.exports = router;
