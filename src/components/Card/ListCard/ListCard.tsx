import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './ListCard.module.scss';

import { getIsCartList } from '../../../store/selectors/cartSelector';
import { cartSlice } from '../../../store/slices/cartSlice';
import { RootState } from '../../../store/store';
import Button from '../../Button/Button';
import LazyLoader from '../../Loader/LazyLoader/LazyLoader';

interface ICard {
  price: number;
  title: string;
  discountPercentage: number;
  thumbnail: string;
  id: number;
  description: string;
  brand?: string;
  category?: string;
  images?: string[];
  rating?: number;
  stock?: number;
}

const ListCard: React.FC<ICard> = ({ ...props }: ICard) => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const newPrice = Math.floor((props.price * (100 - props.discountPercentage)) / 100);

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

  const isChecked = useSelector((state: RootState) => getIsCartList(state, productData));

  return (
    <div id={String(props.id)} onClick={() => router(`/products/${props.id}`)} className={styles.card}>
      <span className={styles.card__discount}>{Math.round(props.discountPercentage)}%</span>
      <div className={styles.card__imgWrapper}>
        <LazyLoader src={props.thumbnail} alt='product image' />
      </div>
      <div className={styles.card__text}>{props.description}</div>
      <div className={styles.card__content}>
        <h4 className={styles.card__header}>{props.title}</h4>
        <div className={styles.card__price}>
          <span className={styles.card__newPrice}>
            {Math.round((props.price * (100 - props.discountPercentage)) / 100)}$
          </span>{' '}
          / <span className={styles.card__oldPrice}>{props.price}$</span>
        </div>
        <Button additionalClass={styles.cardList__btn} onClick={addToCart} isChecked={isChecked} />
      </div>
    </div>
  );
};

export default ListCard;
