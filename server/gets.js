const utils = require('./utils');
const request = require('request');
const config = require('./config');

const getItems = (items, id)=>{
    return new Promise(function(resolve, reject){
        request.get(`https://api.mercadolibre.com/sites/MLA/search?q=${id}`, function(error, response, body){
            const result = JSON.parse(body);
            if(result.results.length == 0){
                resolve({
                    author: config.author,
                    categories: [],
                    items: []
                });
            } else{
                let items = utils.get_items(result.results);
                resolve({
                    author: config.author,
                    categories: utils.get_categories(result.filters, result.available_filters),
                    items
                });
            }
        })
    })
}

const getItem = (item, id) =>{
    return new Promise(function(resolve, reject){
        request.get(`https://api.mercadolibre.com/items/${id}`, function(error, response, body){
            if(!error && response.statusCode == 200){
                let result = JSON.parse(body);
                let _item = utils.get_item(result);
                item = {
                    author: config.author,
                    item: {
                        ..._item,
                        sold_quantity: result.sold_quantity  
                    }
                }
                resolve({
                    item, 
                    cat_id: result.category_id
                });
            } else{
                resolve({
                    item: {
                        author: config.author,
                        item:{}
                    }
                })
            }
        })
    })
}

const getDescription = (item, id, cat_id) =>{
    return new Promise(function(resolve, reject){
        request.get(`https://api.mercadolibre.com/items/${id}/description`, function(error, response, body){
            let result = JSON.parse(body);
            item.item['description'] = result.plain_text;
            resolve({
                item,
                cat_id
            });
        })
    })
}

const getCategories = (item, cat_id) =>{
    return new Promise(function(resolve, reject){
        request.get(`https://api.mercadolibre.com/categories/${cat_id}`, function(error, response, body){
            let result = JSON.parse(body);
            item['categories'] = result.path_from_root ? utils.get_parents_category(result.path_from_root) : [];
            resolve(item);
        })
    })
}

module.exports = {
    getCategories,
    getItem,
    getItems,
    getDescription
}