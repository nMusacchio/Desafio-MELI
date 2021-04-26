import React from 'react';
import styles from './NavBar.module.scss';
import {Link} from 'react-router-dom';
import logo from './img/logo.png';
import search from './img/search.png';

const NavBar = (props)=>{
    return(
        <div className={styles.navbar}>
            <div className="container">
                <div className={styles.headerWrapper}>
                    <Link to='/'>
                        <img src={logo} alt="Logo Mercadolibre" className={styles.logo} />
                    </Link>
                    <form className={styles.searchBox} method="GET" action="/items">
                        <input type="text" placeholder="Nunca dejes de buscar" name="search" />
                        <button aria-label="Buscar" type="submit"><img src={search} alt=""/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NavBar;