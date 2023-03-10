import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ListCard.module.scss';

import LazyLoader from '../../Loader/LazyLoader/LazyLoader';

interface ICard {
  price: number;
  title: string;
  discountPercentage: number;
  thumbnail: string;
  id: number;
  description: string;
}

const ListCard: React.FC<ICard> = ({ ...props }: ICard) => {
  const router = useNavigate();

  return (
    <div onClick={() => router(`/products/${props.id}`)} className={styles.card}>
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
        <button className={styles.card__btn}>Add to cart</button>
      </div>
    </div>
  );
};

export default ListCard;
