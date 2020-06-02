'use strict'; 
 
const    
MongoDB = require( 'mongodb' ).MongoClient,
dbURL = 'mongodb://localhost:27017/',
dbName = 'test';  // the database name is “test”

MongoDB.connect( dbURL, {
useNewUrlParser: true,        useUnifiedTopology: true},
( error, client ) => {
if ( error ) throw error;
let db = client.db( dbName );
// the name of the collection is “contacts”
db.collection( 'contacts' )      
.find()     
.toArray( ( error, data ) => {
       if ( error ) throw error; 
      console.log( data );     
	  } ); 
 
  db.collection( 'contacts' )    
  .insertOne( {       
  name: 'Freddie Mercury',       
  email: 'fred@queen.com'     
  }, ( error, db ) => {       
  if ( error ) throw error;      
  console.log( 'insertOne Done!' );     
	} );
} );