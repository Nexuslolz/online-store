import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import styles from './CartProduct.module.scss';

import { getCartList } from '../../../../../store/selectors/cartSelector';
import { useFetchOneProductQuery } from '../../../../../store/services/productService.api';

import { cartSlice } from '../../../../../store/slices/cartSlice';
import ContentSlider from '../../../../ContentSlider/ContentSlider';
import LazyLoader from '../../../../Loader/LazyLoader/LazyLoader';

interface ICard {
  id: number;
  setError: (error: boolean) => void;
  setLoading: (error: boolean) => void;
}

export interface IProductData {
  id: number;
  value: number;
  price: number;
}

const CartProduct: React.FC<ICard> = ({ id, setError, setLoading }: ICard) => {
  const { data, isLoading, isError } = useFetchOneProductQuery(String(id));
  const dispatch = useDispatch();
  const router = useNavigate();

  const newPrice = Math.floor((data?.price! * (100 - data?.discountPercentage!)) / 100);
  const productsList = useSelector(getCartList);

  const defaultProductData = useMemo(() => {
    const objectData = { id: id, value: 1, price: newPrice };
    return objectData;
  }, [id, newPrice]);

  const serializedProductData = JSON.stringify(defaultProductData);
  const productData = JSON.parse(serializedProductData);

  const defaultValue = productsList.filter((item) => item.id === id && item.value);

  const [value, setValue] = useState(defaultValue[0].value);
  const [price, setPrice] = useState(defaultValue[0].price);

  const productAdd = () => {
    if (value < data?.stock!) {
      setValue((value) => value + 1);
      setPrice((price) => price + newPrice);
      productData.price = price + newPrice;
      productData.value = productData.value + value;
      dispatch(cartSlice.actions.toggleCart(productData));
    }
  };

  const productRemove = () => {
    if (value > 0) {
      setValue((value) => value - 1);
      setPrice((price) => price - newPrice);
      productData.price = price - newPrice;
      productData.value = value - 1;
      dispatch(cartSlice.actions.toggleCart(productData));
    }
  };

  useEffect(() => {
    if (value === 0) {
      dispatch(cartSlice.actions.toggleCart(defaultProductData));
    }
  }, [dispatch, id, defaultProductData, value]);

  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError, setError]);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [data, isLoading, setLoading]);

  if (!data) return null;
  return (
    <div id={String(data.id)} className={styles.card}>
      <div onClick={() => router(`products/${data.id}`)} className={styles.card__imgWrapper}>
        <LazyLoader className={styles.card__lazyLoader} src={data.thumbnail} alt='product image' />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__wrapperAbout}>
          <div className={styles.card__headerWrapper}>
            <h3 onClick={() => router(`products/${data.id}`)} className={styles.card__header}>
              {data.title}
            </h3>
            <ContentSlider onPrev={productRemove} onNext={productAdd} prev='-' next='+' value={String(value)} />
          </div>
          <hr />
        </div>
        <div className={styles.card__description}>{data.description}</div>
        <ul className={styles.card__infoWrapper}>
          <li className={styles.card__infoItem}>
            Stock:<span className={styles.card__text}> {data.stock - value}</span>
          </li>
          <li className={`${styles.card__infoItem} ${styles.card__price}`}>
            <span className={styles.card__newPrice}>{newPrice}$</span> /{' '}
            <span className={styles.card__oldPrice}>{data.price}$</span>
          </li>
          <li className={styles.card__infoItem}>
            Discount:<span className={styles.card__text}> {Math.round(data.discountPercentage)}%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default CartProduct;
