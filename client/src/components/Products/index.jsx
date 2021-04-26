import React, { useState, useEffect} from 'react';
import Product from '../Product';
import Breadcrumb from '../Breadcrumb';
import styles from './Products.module.scss';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {getParams} from '../utils';


const Products = (props) =>{
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    let search;
    useEffect(()=>{
        let search = getParams(window.location.search);
        fetch(`/api/items?q=${search}`)
        .then((response) =>{
            return response.json();
        })
        .then((json) =>{
            setProducts(json.items);
            setCategories(json.categories ? json.categories : []);
            setLoading(false);
        });  
    }, [])

    if(!loading){
        if(products.length > 0){
            return(
                    <div className="main">
                        <Helmet>
                        <meta charSet="utf-8" />
                        <title>{`Busqueda - ${getParams(window.location.search)}`}</title>
                        <meta name="description" content={categories.join(', ')} />
                        <meta name="og:title" content={`Busqueda - ${getParams(window.location.search)}`} />
                        <meta name="og:type" content="Product search" />
                        <meta name="og:image" content="https://http2.mlstatic.com/ui/navigation/4.0.8/mercadolibre/logo__large_plus@2x.png" />
                        <meta name="og:url" content="http://mercadolibre.com.ar" />
                        </Helmet>
                        <div className="container">
                            <Breadcrumb categories={categories} />
                            <div className={styles.products}>
                                {
                                    products.map((product, index)=>{
                                        return (
                                            <Link to={`/items/${product.id}`} key={index}>
                                                <Product item={product} />
                                                {
                                                    index < products.length - 1 ? <div className={styles.hLine}></div> : ''
                                                } 
                                            </Link>   
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            )
        } else{
            return <p className="notFound">No hay productos para esta búsqueda</p>
        }
    } else{
        return(
            <div className="loader"></div>
        )
    }
}

export default Products;