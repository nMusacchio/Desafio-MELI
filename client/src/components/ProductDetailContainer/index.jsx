import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductDetail from '../ProductDetail';
import Breadcrumb from '../Breadcrumb';
import styles from './ProductDetailContainer.module.scss';
import {Helmet} from 'react-helmet-async';

const ProductDetailContainer = () =>{
    const [item, setItem] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    useEffect(()=>{
        fetch(`/api/items/${id}`)
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            setItem(json.item);
            setCategories(json.categories);
            setLoading(false);
        }) 
    }, [])

    if(!loading){
        if(Object.keys(item).length > 0){
            return(      
                <div className={styles.item}>
                    <Helmet>
                        <title>{item.title}</title>
                        <meta charSet="utf-8" />
                        <meta name="description" content="Detalle del producto" />
                        <meta name="og:title" content={item.title} />
                        <meta name="og:type" ccontent="Detalle del producto" />
                        <meta name="og:image" content="https://http2.mlstatic.com/ui/navigation/4.0.8/mercadolibre/logo__large_plus@2x.png" />
                        <meta name="og:url" content="http://mercadolibre.com.ar" />
                    </Helmet>
                    <div className="container">
                        <Breadcrumb categories={categories} />
                        <ProductDetail item={item} />
                    </div>
                </div>
            )
        }else{
            return <p className="notFound">Producto no valido</p>;
        }
    } else{
        return (
            <div className="loader"></div>
        )
    }
}

export default ProductDetailContainer;