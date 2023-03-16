import React, { useState, useCallback, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import BuyForm from './components/BuyForm/BuyForm';
import ProductAbout from './components/ProductAbout/ProductAbout';
import styles from './ProductContent.module.scss';

import loader from '../../../assets/loader/cardLoader.gif';

import { getIsCartList } from '../../../store/selectors/cartSelector';
import { useFetchOneProductQuery } from '../../../store/services/productService.api';
import { cartSlice } from '../../../store/slices/cartSlice';
import { RootState } from '../../../store/store';
import Button from '../../Button/Button';
import LazyLoader from '../../Loader/LazyLoader/LazyLoader';
import Loader from '../../Loader/MainLoader/MainLoader';

interface IImageArr {
  src: string;
  size: number;
}

const ProductContent = () => {
  const params = useParams();
  const { data, error } = useFetchOneProductQuery(String(params.id));
  const [loadingImg, setLoadingImg] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const newPrice = Math.floor((data?.price! * (100 - data?.discountPercentage!)) / 100);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [mainImage, setMainImage] = useState<string | undefined>(data?.thumbnail);

  const dispatch = useDispatch();

  const productData = useMemo(() => {
    return {
      id: Number(params.id),
      value: 1,
      price: newPrice,
    };
  }, [newPrice, params.id]);

  const addToCart = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();

      dispatch(cartSlice.actions.toggleCart(productData));
    },
    [dispatch, productData],
  );

  const isChecked: boolean = useSelector((state: RootState) => getIsCartList(state, productData));

  if (!data) return null;

  const sizes: number[] = [];
  const imagesGeneralArr: (string | undefined)[] = data.images
    .map((img) => {
      const image: IImageArr = {
        src: img,
        size: new Blob([img]).size,
      };

      if (!sizes.includes(image.size)) {
        sizes.push(image.size);
        return image.src;
      }
      return undefined;
    })
    .filter((img) => img !== undefined);

  const isLoadingImg = () => {
    setLoadingImg(true);
  };

  const dataParams: Array<string[]> = Object.entries(data).filter((item) => {
    if (
      item[0] !== 'id' &&
      item[0] !== 'title' &&
      item[0] !== 'thumbnail' &&
      item[0] !== 'images' &&
      item[0] !== 'price' &&
      item[0] !== 'description'
    ) {
      if (item[0] === 'discountPercentage') {
        item[0] = item[0].slice(0, 8);
        return item;
      }

      return item;
    }

    return '';
  });

  const buyNowOpen = () => {
    setIsOpen(true);
  };

  const buyNowClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(false);
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 350);

  return (
    <div className={styles.productPage}>
      <h1 className={styles.productPage__header}>{data.title}</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h1 className={styles.productPage__error}>
          Error has occured. {'status' in error ? error.status : error.message}. Try again later.
        </h1>
      ) : (
        <div className={styles.productPage__container}>
          <div className={styles.productPage__images}>
            <div className={styles.productPage__smallImage}>
              {imagesGeneralArr.map((img, i) => (
                <div key={i} className={styles.productPage__imageWrapper}>
                  <img
                    onLoad={isLoadingImg}
                    className={styles.productPage__image}
                    src={loadingImg ? img : loader}
                    alt='product img'
                    onClick={() => setMainImage(img)}
                  />
                </div>
              ))}
            </div>
            <LazyLoader
              className={styles.productPage__loader}
              alt='product photo'
              src={mainImage ? mainImage : data.thumbnail}
            />
          </div>
          <div className={styles.productPage__aboutWrapper}>
            <div className={styles.productPage__description}>{data.description}</div>
            <div className={styles.productPage__about}>
              <ul className={styles.productPageList}>
                {dataParams.map((param) => (
                  <ProductAbout key={param[0]} title={param[0]} text={param[1]} />
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.productPage__buy}>
            <div className={styles.productPage__price}>
              <span className={styles.card__newPrice}>{newPrice}$</span> /{' '}
              <span className={styles.card__oldPrice}>{data.price}$</span>{' '}
            </div>
            <div className={styles.productPage__btns}>
              <Button onClick={addToCart} isChecked={isChecked} />
              <Button onClick={buyNowOpen} text='Buy now' />
              <BuyForm onClick={buyNowClose} isOpen={isOpen} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductContent;
