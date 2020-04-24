const assert = require('assert');
function configureRouts(app, db) {
    // configurar ruta inicial
    app.get('/', function (request, response) {
        // responder con un archivo
        response.sendFile(path.join(__dirname, '/public/index.html'));
    });
    // ruta para la lista de productos con handlebars
    app.get('/tienda', function (req, res) {
        console.log(req.query);
        var filters = {
            $and: []
        };
        //FILTRO POR CATEGORÍA
        // arreglo filtrado
        if (req.query.category) {
            filters.$and.push({
                category: {
                    $eq: req.query.category
                }
            });
        }
        //FILTRO POR PRECIO
        if (req.query.price1) {
            filters.$and.push({
                price: {
                    $gte: parseInt(req.query.price1),
                }
            });
            filters.$and.push({

                price: {
                    $lte: parseInt(req.query.price2),
                }
            });
        }
        //FILTRO POR COLOR
        if (req.query.color) {
            filters.$and.push({
                color: {
                    $eq: req.query.color
                }
            });
        }

        var sortings = {}
        //ORDENAR PRECIO DE MENOR A MAYOR
        if (req.query.priceOrd1) {
            sortings.price = 1;
        }
        //ORDENAR PRECIO DE MAYOR A MENOR
        if (req.query.priceOrd2) {
            sortings.price = -1;
        }

        //ORDENAR PUNTUACION DE MENOR A MAYOR
        if (req.query.starsOrd1) {
            sortings.stars = 1;
        }
        //ORDENAR PUNTUACION DE MAYOR A MENOR
        if (req.query.starsOrd2) {
            sortings.stars = -1;
        }

        //ORDENAR ALFABETICO DE A-Z
        if (req.query.alfaOrd1) {
            sortings.name = 1;
        }

        //ORDENAR ALFABETICO DE Z-A
        if (req.query.alfaOrd2) {
            sortings.name = -1;
        }

        if (filters.$and.length == 0) {
            delete filters.$and;
        }

        //Arreglo de estrellas
        const collection = db.collection('products');
        collection.find(filters).sort(sortings).toArray(function (err, docs) {
            assert.equal(err, null);
            docs.forEach(function (elem) {
                elem.starsArray = Array.from({ length: elem.stars });
            });
            // objeto contexto
            var context = {
                products: docs,
                isAgenda: req.query.category === 'agenda',
                isCalendario: req.query.category === 'calendario',
            }
            // renderizar vista
            res.render('store', context);
        });


    });

    // ruta para la lista de productos con handlebars
    app.get('/producto/:name/:id', function (req, res) {
        var id = parseInt(req.params.id);
        var product = products[id];
        // renderizar vista
        res.render('product', product);
    });

    app.get('/carrito', function (req, res) {
        var context = {

        }
        // renderizar vista
        res.render('cart', context);
    });
}

module.exports = configureRouts;