import React from 'react';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({categories}) =>{
    let categories_result;
    if(categories){
        categories_result = categories.map((category, index)=>{
            return(
                <React.Fragment key={index}>
                    <span href={`/items?search=${category}`}>{category}</span>
                    {index < categories.length - 1 ? ' / ' : ''}
                </React.Fragment>
            )   
        })
    }
    return(
        <p className={styles.breadcrumb}>
            {categories_result}
        </p>
    )
}

export default Breadcrumb;