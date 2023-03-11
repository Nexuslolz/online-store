import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Basket.module.scss';

import { getCartList } from '../../store/selectors/cartSelector';

const Basket: React.FC = () => {
  const cartList = useSelector(getCartList);
  const amount = cartList.length;

  return (
    <Link className={styles.headerCart} to='/cart'>
      <div className={styles.headerCart__icon}>
        <p className={styles.headerCart__amount}>{amount}</p>
      </div>
    </Link>
  );
};

export default Basket;
