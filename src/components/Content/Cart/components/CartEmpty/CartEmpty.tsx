import React from 'react';

import styles from './CartEmpty.module.scss';

const CartEmpty = () => {
  return (
    <div className={styles.cartEmpty__wrapper}>
      <h1>There is no products yet</h1>
    </div>
  );
};

export default CartEmpty;
