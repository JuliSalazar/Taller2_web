// importar express
const express = require('express');
// importar path
const path = require('path');
// importart express-handlebars
const exphbs = require('express-handlebars');
// importar productos
const products = require('./products');
// instanciar servidor de express
const app = express();
// registrar motor de render para handlebars
app.engine('handlebars', exphbs());
// use el motor de render handlebars
app.set('view engine', 'handlebars');

// configurar carpeta public como estática o pública
app.use(express.static('public'));

// configurar ruta inicial
app.get('/', function (request, response) {
  // responder con un archivo
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

// ruta para la lista de productos con handlebars
app.get('/tienda', function (req, res) {
  
  //FILTRO POR CATEGORÍA
// arreglo filtrado
var filtered = products;
  if(req.query.category){
  // creo la copia del arreglo filtrado
  filtered = products.filter(function (elem) {
    // si el precio del elemento es mayor al precio que el usuario preguntó
    if(req.query.category == elem.category){
      return true;
    }
  });
}
//FILTRO POR COLOR
if(req.query.color){
  // creo la copia del arreglo filtrado
  filtered = products.filter(function (elem) {
    // si el precio del elemento es mayor al precio que el usuario preguntó
    if(req.query.color == elem.color){
      return true;
    }
  });
}

//ORDENAMIENTO
if(req.query.priceOrd1){
  // creo la copia del arreglo filtrado
  filtered = products.sort(function (elem,elem2) {
    if(elem.price > elem2.price){
      return 1;
    }
    if(elem.price < elem2.price){
      return -1;
    }
    return 0;
  });
}
if(req.query.priceOrd2){
  // creo la copia del arreglo filtrado
  filtered = products.sort(function (elem,elem2) {
    if(elem.price < elem2.price){
      return 1;
    }
    if(elem.price > elem2.price){
      return -1;
    }
    return 0;
  });
}

  // objeto contexto
  var context = {
    products: filtered,
  }
  // renderizar vista
  res.render('store', context);
});

// ruta para la lista de productos con handlebars
app.get('/producto/:name/:id', function (req, res) {
  var context = {};

  /* buscar en la base de datos el elemento correspondiente
  var foundElement = products.find(function (elem) {
    if(elem.id == req.params.id){
      return true;
    }
  });*/
  
  // pasar las variables de ese elemento al contexto
  context = foundElement;

  console.log(req.params.name);

  // devuélvame la información del producto # 1
  // pasar info del producto al contexto

  // renderizar vista
  res.render('product', context);
});


// iniciar servidor en puerto 3000
app.listen(3000, function () {
  console.log('servidor iniciado en puerto 3000');
});

// npm = node package manager
// npx = node package executer