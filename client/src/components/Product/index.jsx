import React from 'react';
import styles from './Product.module.scss';
import shipping from './img/shipping.png';
import {formatNumber} from '../utils';

const Product = ({item})=>{
    return(
        <div className={styles.product}>
           <div className={styles.image} style={{backgroundImage:`url(${item.picture})`}}></div>
           <div className={styles.text}>
               <p className={styles.price}>$ {formatNumber(item.price.amount)}{item.price.decimals > 0 ? <sup>{item.price.decimals}</sup> : ''} {item.free_shipping ? <img src={shipping} alt="" /> : ''}</p>
               <p className={styles.name}>{item.title}</p>
               <p className={styles.city}>Capital Federal</p>
           </div>
        </div>
    )
}

export default Product;