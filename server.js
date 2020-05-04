// MONGO DB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// importar express
const express = require('express');
// importar path
const path = require('path');
// importart express-handlebars
const exphbs = require('express-handlebars');
// instanciar servidor de express
const app = express();
// registrar motor de render para handlebars
const configureRouts = require('./routs');
app.engine('handlebars', exphbs());
// use el motor de render handlebars
app.set('view engine', 'handlebars');

// configurar carpeta public como estática o pública
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'store';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  configureRouts(app,db);
  
  const collection = db.collection('products');
  


 
});


// iniciar servidor en puerto 3000
app.listen(3000, function () {
  console.log('servidor iniciado en puerto 3000');
});




