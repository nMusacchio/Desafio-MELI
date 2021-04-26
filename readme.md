# Ejercicio MercadoLibre
## Inicialización
- Iniciar cliente
    ```bash
        cd client
        npm i
        npm start
    ```
- Iniciar servidor
    ```bash
        cd server
        npm i
        npm start
    ```

- Ingresar a
    ```
    localhost:4500
    ```
## API
### Items
Endpoint:
```
/api/items?q=query
```
| Parámetro | Valor                        | Tipo |
|-----------|------------------------------|------|
| query     | Producto que se desea buscar | GET  |

Resultado
```
{
    “author”: {
        “name”: String
        “lastname”: String
    },
    categories: [String, String, String, ...],
    items: [
    {
        "id": String,
        "title": String,
        "price": {
            "currency": String,
            "amount": Number,
            "decimals": Number
        },
        “picture”: String,
        "condition": String,
        "free_shipping": Boolean
    },
    {...},
    {...},
    {...}
    ]
}
```
Consulta al endpoint externo:
```
https://api.mercadolibre.com/sites/MLA/search?q=:query
```

### Item
Endpoint:
```
/api/items/:id
```
| Parámetro | Valor                        | Tipo |
|-----------|------------------------------|------|
| id        | Id del producto que se desea ver el detalle | GET  |

Resultado
```
{
    “author”: {
        “name”: String
        “lastname”: String
    },
    categories: [String, String, String, ...],
    “item”: {
        "id": String,
        "title": String,
        "price": {
            "currency": String,
            "amount": Number,
            "decimals": Number,
        },
        “picture”: String,
        "condition": String,
        "free_shipping": Boolean,
        "sold_quantity", Number
        "description": String
    }
}
```
Consulta los endpoints externos:
```
https://api.mercadolibre.com/items/:id
https://api.mercadolibre.com/items/:id/description
https://api.mercadolibre.com/categories/:category_id
```