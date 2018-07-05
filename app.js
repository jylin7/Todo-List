// mongoose setup
require( './db' );

var express = require( 'express' );
var routes  = require( './routes' );
var http    = require( 'http' );
var path    = require( 'path' );
var app     = express();
var engine  = require( 'ejs-locals' );
var morgan  = require('morgan');
var bodyParser = require('body-parser')
var errorhandler = require('errorhandler')

// all environments
app.set( 'port', process.env.PORT || 3001 );
app.engine( 'ejs', engine );
app.set( 'views', path.join( __dirname, 'views' ));
app.set( 'view engine', 'ejs' );

// app.use( express.favicon());
app.use( morgan( 'dev' ));
app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json());
// app.use( express.urlencoded());
// app.use( express.methodOverride());
// app.use( app.router );
app.use( express.static( path.join( __dirname, 'public' )));

// development only
if ( 'development' == app.get( 'env' )) {
  app.use( errorhandler());
}

app.use('/', routes);

http.createServer( app ).listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );
