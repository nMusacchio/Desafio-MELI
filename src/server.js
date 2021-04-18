/* Imports */
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config.js');
const utils = require('./utils.js')

/* Configs */
PORT = process.env.PORT || config.port;

app.use(express.static(__dirname + '/../public'));
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs', partialsDir: __dirname + '/../views/partials', helpers: require(__dirname + '/hbs_helpers/handlebars-helpers')}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
/* Routes */

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/api/items', (req, res) => {
    request.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`, function(error, response, body){
        const result = JSON.parse(body);
        if(result.results.length == 0){
            res.send({
                author: config.author,
                categories: [],
                items: []
            });
        } else{
            let categories = utils.get_categories(result.filters, result.available_filters);
            let items = utils.get_items(result.results);
            res.send({
                author: config.author,
                categories,
                items
            });
        }
    })
});

app.get('/items', (req, res) => {
    request.get(`http://localhost:${PORT}/api/items?q=${req.query.search}`, function(error, response, body){
        if (!error && response.statusCode === 200) {
            let result = JSON.parse(body);
            res.render('items',{
                categories: result.categories,
                items: result.items
            });
        } else{
            res.send('/');
        }
    })
});

app.get('/api/items/:id', (req, res) => {
    request.get(`https://api.mercadolibre.com/items/${req.params.id}`, function(error, response, body){
        if(!error && response.statusCode == 200){
            let result = JSON.parse(body);
            let _item = utils.get_item(result);
            let item = {
                author: config.author,
                item: {
                    ..._item,
                    sold_quantity: result.sold_quantity  
                }
            }
            request.get(`https://api.mercadolibre.com/items/${req.params.id}/description`, function(error, response, body){
                let result = JSON.parse(body);
                item.item['description'] = result.plain_text;
                res.send(item);
            })
        } else{
            res.send({
                author: config.author
            })
        }
    })
});
/*Acá me gustaría usar promesas para evitar Callback hell 
pero no se como hacer para dividir los resultados en (error, response, body)
en las promesas.*/
app.get('/items/:id', (req, res) => { 
    request.get(`http://localhost:${PORT}/api/items/${req.params.id}`, function(error, response, body){
        let result = JSON.parse(body);
        let item = result.item;
        if(item){
            request.get(`https://api.mercadolibre.com/items/${item.id}`, function(error, response, body){
                let result = JSON.parse(body);
                request.get(`https://api.mercadolibre.com/categories/${result.category_id}`, function(error, response, body){
                    let result = JSON.parse(body);
                    let categories = utils.get_parents_category(result.path_from_root);
                    res.render('item', {
                        item,
                        categories
                    })
                })
            })
        } else{
            res.render('item')
        }
    })
})

app.listen(PORT);