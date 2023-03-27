import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import styles from './CartSummary.module.scss';

import { getCartList } from '../../../../../store/selectors/cartSelector';
import Button from '../../../../Button/Button';
import BuyForm from '../../../Product/components/BuyForm/BuyForm';

const CartSummary: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const totalProduct = useSelector(getCartList);
  const totalValue = totalProduct.map((product) => product.value).reduce((prevValue, value) => prevValue + value);
  const totalPrice = totalProduct.map((product) => product.price).reduce((prevValue, value) => prevValue + value);

  const buyNowOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  const buyNowClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className={styles.cartSummary}>
      <div className={styles.cardSummary__headerWrapper}>
        <h2 className={styles.cardSummary__header}>Summary</h2>
        <hr />
      </div>
      <ul className={styles.cartSummary__list}>
        <li className={styles.cartSummary__listItem}>
          Products: <span>{totalValue}</span>
        </li>
        <li className={styles.cartSummary__listItem}>
          Total: <span>{totalPrice}</span>$
        </li>
      </ul>
      <Button additionalClass={styles.cartSummary__btn} onClick={buyNowOpen} text='Checkout' />
      <BuyForm onClick={buyNowClose} isOpen={isOpen} />
    </div>
  );
};

export default CartSummary;
