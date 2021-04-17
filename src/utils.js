const items_limit = 4;

function get_parents_category(path_from_root){
    let categories = [];
    for(let category of path_from_root){
        categories.push(category.name);
    }

    return categories;
}

function get_categories(results){
    const {filters, available_filters} = results;

    let filter_values;

    if(filters && filters.length > 0){
        filter_values = filters;
    }
    else {
        if(available_filters && available_filters.length > 0)
            filter_values = available_filters;
    }

    const category_filters = filter_values.filter(f => f.id === "category");
    const _categories = category_filters[0].values;

    const path_from_root = _categories[0].path_from_root;

    let categories = []

    if(!path_from_root || path_from_root.length <= 0)
        return;

    for(let step of path_from_root){
        categories.push(step.name);
    }
    return categories;
}

function get_price(price){
    let splitted_amount = price.toString().split(".");
    let integer_part = parseInt(splitted_amount[0]);
    let decimal_part;
    if(splitted_amount[1])
        decimal_part = parseInt(splitted_amount[1]);
    else
        decimal_part = 0;
    
    return {
        integer_part,
        decimal_part
    }
}

function get_item(raw_item){
    let price = get_price(raw_item.price);
    return  {
        id: raw_item.id,
        title: raw_item.title,
        price: {
            currency: raw_item.currency_id,
            amount: price.integer_part,
            decimals: price.decimal_part
        },
        picture: raw_item.thumbnail,
        condition: raw_item.condition,
        free_shipping: raw_item.shipping.freeShipping
    }
}

function get_items(raw_items){
    let _items = raw_items.slice(0, items_limit);
    let items_mapped = [];
    for(let item of _items){
        items_mapped.push(get_item(item));
    }

    return items_mapped;
}

module.exports = {
    get_item,
    get_items,
    get_categories,
    get_parents_category
}