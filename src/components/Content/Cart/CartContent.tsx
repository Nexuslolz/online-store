import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './CartContent.module.scss';
import CartEmpty from './components/CartEmpty/CartEmpty';
import CartProduct from './components/CartProduct/CartProduct';

import CartSummary from './components/CartSummary/CartSummary';

import { getCartList } from '../../../store/selectors/cartSelector';
import ContentSlider from '../../ContentSlider/ContentSlider';
import Loader from '../../Loader/MainLoader/MainLoader';

const CartContent: React.FC = () => {
  const productsInCart = useSelector(getCartList);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fillError = useCallback(
    (hasError: boolean) => {
      if (!error) {
        setError(hasError);
      }
    },
    [error],
  );

  const fillLoading = useCallback(
    (hasLoad: boolean) => {
      if (!loading) {
        setLoading(hasLoad);
      }
    },
    [loading],
  );

  setTimeout(() => {
    setLoading(false);
  }, 1200);

  return (
    <div className={styles.cartContent__wrapper}>
      <div className={styles.cardContent__productsWrapper}>
        <div className={styles.card__contentWrapper}>
          <div className={styles.card__contentHeader__wrapper}>
            <h2 className={styles.card__contentHeader}>Products in cart</h2>
            <ContentSlider
              prev='<'
              next='>'
              value='1'
              onNext={() => console.log('next')}
              onPrev={() => console.log('prev')}
            />
          </div>
          <hr />
        </div>
        {error ? (
          <h2 className={styles.errorHeader}>Error has occured. Bad request. Please, try later.</h2>
        ) : loading ? (
          <Loader />
        ) : (
          productsInCart.map((product) => (
            <div className={styles.product__wrapper} key={product.id}>
              <CartProduct id={product.id} setError={fillError} setLoading={fillLoading} />
              <hr className={styles.devide} />
            </div>
          ))
        )}
      </div>
      <CartSummary />
    </div>
  );
};

const CartContentWrapper: React.FC = () => {
  const productsInCart = useSelector(getCartList);
  const totalAmount = productsInCart.length;

  return <>{totalAmount === 0 ? <CartEmpty /> : <CartContent />}</>;
};

export default CartContentWrapper;
