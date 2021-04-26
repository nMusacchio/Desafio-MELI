import React from 'react';
import styles from './ProductDetail.module.scss';
import {formatNumber} from '../utils';

const ProductDetail = ({item}) =>{
    return (
        <div className={styles.itemWrapper}>
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.image} style={{backgroundImage:`url(${item.picture})`}}></div>
                </div>
                <div className={styles.right}>
                    <p className={styles.info}>{item.condition == 'new' ? 'Nuevo' : 'Usado'} - {item.sold_quantity} vendidos</p>
                    <p className={styles.title}>{item.title}</p>
                    <p className={styles.price}>$ {formatNumber(item.price.amount)} <sup>{item.price.decimals > 0 ? item.price.decimals : ''}</sup></p>
                    <button>Comprar</button>
                </div>
            </div>
            <div className={styles.left}>
                <div className={styles.description}>
                    <h2>Detalle del producto</h2>
                    <p>{item.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;