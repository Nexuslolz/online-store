import React, { useCallback } from 'react';
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
  const router = useNavigate();
  const dispatch = useDispatch();

  const addToCart = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      dispatch(cartSlice.actions.toggleCart(String(props.id)));
    },
    [dispatch, props.id],
  );

  const isChecked: boolean = useSelector((state: RootState) => getIsCartList(state, String(props.id)));

  return (
    <div id={String(props.id)} onClick={() => router(`/products/${props.id}`)} className={styles.card}>
      <span className={styles.card__discount}>{Math.round(props.discountPercentage)}%</span>
      <div className={styles.card__imgWrapper}>
        <LazyLoader src={props.thumbnail} alt='product image' />
      </div>
      <div className={styles.card__content}>
        <h4 className={styles.card__header}>{props.title}</h4>
        <div className={styles.card__price}>
          <span className={styles.card__newPrice}>
            {Math.round((props.price * (100 - props.discountPercentage)) / 100)}$
          </span>{' '}
          / <span className={styles.card__oldPrice}>{props.price}$</span>
        </div>
        <Button onClick={addToCart} isChecked={isChecked} />
      </div>
    </div>
  );
};

export default Card;
