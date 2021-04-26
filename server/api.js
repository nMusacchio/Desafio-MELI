const express = require('express');
const bodyParser = require('body-parser');
const {getCategories, getDescription, getItem, getItems} = require('./gets');

let router = express.Router();

router.use(bodyParser.json({ limit: '5mb' }));
router.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));


router.get('/items', (req, res) => {
    let id = req.query.q;
    let items;
    getItems(items, id)
    .then((items)=>{
        res.json(items);
    })
});

router.get('/items/:id', (req, res) => {
    let item;
    getItem(item, req.params.id)
    .then(({item, cat_id})=>{
        if(Object.keys(item.item).length == 0){
            res.json(item)
        }else{
            return getDescription(item, req.params.id, cat_id);
        }
    })
    .then(({item, cat_id})=>{
        return getCategories(item, cat_id);
    })
    .then((item)=>{
        res.json(item);
    })
});

module.exports = router;