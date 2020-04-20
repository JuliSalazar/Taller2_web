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
  if (req.query.category) {
    // creo la copia del arreglo filtrado
    filtered = products.filter(function (elem) {
      // si el precio del elemento es mayor al precio que el usuario preguntó
      if (req.query.category == elem.category) {
        return true;
      }
    });
  }
  //FILTRO POR PRECIO
  //FILTRO POR COLOR
  if (req.query.color) {
    // creo la copia del arreglo filtrado
    filtered = products.filter(function (elem) {
      // si el precio del elemento es mayor al precio que el usuario preguntó
      if (req.query.color == elem.color) {
        return true;
      }
    });
  }

  //ORDENAR PRECIO DE MENOR A MAYOR
  if (req.query.priceOrd1) {
    // creo la copia del arreglo filtrado
    filtered = products.sort(function (elem, elem2) {
      if (elem.price > elem2.price) {
        return 1;
      }
      if (elem.price < elem2.price) {
        return -1;
      }
      return 0;
    });
  }
  //ORDENAR PRECIO DE MAYOR A MENOR
  if (req.query.priceOrd2) {
    // creo la copia del arreglo filtrado
    filtered = products.sort(function (elem, elem2) {
      if (elem.price < elem2.price) {
        return 1;
      }
      if (elem.price > elem2.price) {
        return -1;
      }
      return 0;
    });
  }

  //ORDENAR PUNTUACION DE MENOR A MAYOR
  if (req.query.starsOrd1) {
    // creo la copia del arreglo filtrado
    filtered = products.sort(function (elem, elem2) {
      if (elem.stars > elem2.stars) {
        return 1;
      }
      if (elem.stars < elem2.stars) {
        return -1;
      }
      return 0;
    });
  }
  //ORDENAR PUNTUACION DE MAYOR A MENOR
  if (req.query.starsOrd2) {
    // creo la copia del arreglo filtrado
    filtered = products.sort(function (elem, elem2) {
      if (elem.stars < elem2.stars) {
        return 1;
      }
      if (elem.stars > elem2.stars) {
        return -1;
      }
      return 0;
    });
  }
  
  //ORDENAR ALFABETICO DE A-Z
  if (req.query.alfaOrd1) {
    // creo la copia del arreglo filtrado
    filtered = products.sort(function (elem, elem2) {
      if (elem.name > elem2.name) {
        return 1;
      }
      if (elem.name < elem2.name) {
        return -1;
      }
      return 0;
    });
  }

  //ORDENAR ALFABETICO DE Z-A
  if (req.query.alfaOrd2) {
    // creo la copia del arreglo filtrado
    filtered = products.sort(function (elem, elem2) {
      if (elem.name < elem2.name) {
        return 1;
      }
      if (elem.name > elem2.name) {
        return -1;
      }
      return 0;
    });
  }
  //Arreglo de estrellas
  filtered.forEach(function (elem){
    elem.starsArray = Array.from({ length: elem.stars });
  });

  // objeto contexto
  var context = {
    products: filtered,
  }
  // renderizar vista
  res.render('store', context);
});

// ruta para la lista de productos con handlebars
app.get('/producto/:name/:id', function (req, res) {
  var context = {

  };
  var id = parseInt(req.params.id);
    var product =  products[id];
   //buscar en la base de datos el elemento correspondiente
  var foundElement = products.find(function (elem) {
    
    /*if(elem.id == parseInt(req.params.id)){
      
      return true;
    }*/
  });

  // pasar las variables de ese elemento al contexto
  context = foundElement;
  // renderizar vista
  res.render('product', product);
});


// iniciar servidor en puerto 3000
app.listen(3000, function () {
  console.log('servidor iniciado en puerto 3000');
});

// npm = node package manager
// npx = node package executer