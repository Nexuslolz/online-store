import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Card.module.scss';

import { getIsCartList } from '../../store/selectors/cartSelector';
import { cartSlice } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import Button from '../Button/Button';
import LazyLoader from '../Loader/LazyLoader/LazyLoader';

interface ICard {
  price: number;
  title: string;
  discountPercentage: number;
  thumbnail: string;
  id: number;
}

const Card: React.FC<ICard> = ({ ...props }: ICard) => {
  const newPrice = Math.floor((props.price * (100 - props.discountPercentage)) / 100);

  const router = useNavigate();
  const dispatch = useDispatch();

  const productData = useMemo(() => {
    return {
      id: props.id,
      value: 1,
      price: newPrice,
    };
  }, [newPrice, props.id]);

  const addToCart = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      dispatch(cartSlice.actions.toggleCart(productData));
    },
    [dispatch, productData],
  );

  const redirectToProduct = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    router(`/products/${props.id}`);
  };

  const isChecked: boolean = useSelector((state: RootState) => getIsCartList(state, productData));

  return (
    <div id={String(props.id)} onClick={redirectToProduct} className={styles.card}>
      <span className={styles.card__discount}>{Math.round(props.discountPercentage)}%</span>
      <div className={styles.card__imgWrapper}>
        <LazyLoader src={props.thumbnail} alt='product image' />
      </div>
      <div className={styles.card__content}>
        <h4 className={styles.card__header}>{props.title}</h4>
        <div className={styles.card__price}>
          <span className={styles.card__newPrice}>{newPrice}$</span> /{' '}
          <span className={styles.card__oldPrice}>{props.price}$</span>
        </div>
        <Button onClick={addToCart} isChecked={isChecked} />
      </div>
    </div>
  );
};

export default Card;
