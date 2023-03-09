import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Basket.module.scss';

const Basket: React.FC = () => {
  return (
    <Link className={styles.headerCart} to='/cart'>
      <div className={styles.headerCart__icon}>
        <p className={styles.headerCart__amount}>0</p>
      </div>
    </Link>
  );
};

export default Basket;
