var express=require( 'express' );
var app=express();
var path=require( 'path' );
var bodyParser=require( 'body-parser' );
var urlencodedParser=bodyParser.urlencoded( { extended: false } );
var pg=require('pg');
//this string will connect to db
var conString = 'postgres://localhost:5432/zoodatabase';
//spinning up server
app.listen( 3000, 'localhost', function( req, res) {
  console.log( 'server listening on 3000' );
});
//setting static folder as public
app.use( express.static( 'public' ));
//setting up base url
app.get('/', function( req, res ){
  console.log( 'from base url' );
  res.sendFile( path.resolve( 'views/index.html' ));
}); //end base url
//setting up url to pull db info and display in dom
app.get('/animals', function( req, res ){
  console.log( 'from app.get/animals ');
  var results = [];
  pg.connect( conString, function( err, client, done ) {
    var returnedAnimals = client.query('SELECT * from zoodatabase_table;');
    console.log( 'returnedAnimals: ' + returnedAnimals );
    var rows = 0;
    returnedAnimals.on( 'row', function( row ){
      results.push( row );
    }); //end of returnedAnimals push
    returnedAnimals.on( 'end', function(){
      return res.json( results );
    });
  });
  // res.send(  );
});//end of app.get for showing animals

app.post( '/newAnimal', urlencodedParser, function( req, res ){
  console.log( 'from inside app.post' );
  pg.connect( conString, function( err, client, done) {
    client.query( 'INSERT INTO zoodatabase_table ( id, type, quantity ) VALUES( $1, $2, $3 )', [req.body.id, req.body.type, req.body.quantity ] );
    res.send( 'test' );
  });
});// end of app.post
