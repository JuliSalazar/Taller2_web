const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;
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
                isSemanal: req.query.category === 'plannerSemanal',
                isDiario: req.query.category === 'plannerDiario',
            }
            // renderizar vista
            res.render('store', context);
        });


    });

    // ruta para la lista de productos con handlebars
    app.get('/producto/:name/:id', function (req, res) {
        if(req.params.id.length != 24){
            res.redirect('/404');
        }
        const filter = {
            _id: {
                $eq: new ObjectId(req.params.id)
            }
        };
        const collection = db.collection('products');

        collection.find(filter).toArray(function (err, docs) {
            assert.equal(err,null);
            if(docs.length == 0){
                res.redirect('/404');
            }
            var context = docs[0];
            res.render('product', context);
        });
        // renderizar vista
    });

    app.get('/404',function (req,res){

    });

    app.get('/carrito', function (req, res) {
        var context = {

        }
        // renderizar vista
        res.render('cart', context);
    });
    // Mostrar checkout
    app.get('/checkout',function (req,res){
        res.render('checkout', context);
    });
    // Recibir del usuario
    app.post('/checkout',function (req,res){
        res.render('checkout', context);
    });
}

module.exports = configureRouts;