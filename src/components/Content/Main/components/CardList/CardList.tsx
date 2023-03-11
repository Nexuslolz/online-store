import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './CardList.module.scss';

import { getIsList } from '../../../../../store/selectors/listSelector';
import { useFetchProductsQuery } from '../../../../../store/services/productService.api';

import { totalSlice } from '../../../../../store/slices/totalSlice';
import Card from '../../../../Card/Card';
import ListCard from '../../../../Card/ListCard/ListCard';
import Loader from '../../../../Loader/MainLoader/MainLoader';

const CardList = () => {
  const { data, isLoading, error } = useFetchProductsQuery('100');
  const isList = useSelector(getIsList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalSlice.actions.setAmount(String(data?.products.length)));
  }, [data, dispatch]);

  return (
    <div
      className={
        isLoading
          ? isList
            ? styles.mainContainer__cardList_list_loading
            : styles.mainContainer__cardList_loading
          : isList
          ? styles.mainContainer__cardList_list
          : styles.mainContainer__cardList
      }
    >
      {/* {error && (
        <h1 className={styles.mainContainer__error}>
          Error has occured, {error.error}, {error.status}
        </h1>
      )} */}
      {error && <Loader />}
      {isLoading ? (
        <Loader />
      ) : (
        data?.products.map((product) =>
          isList ? (
            <ListCard
              description={product.description}
              key={product.id}
              price={product.price}
              thumbnail={product.thumbnail}
              title={product.title}
              discountPercentage={product.discountPercentage}
              id={product.id}
            />
          ) : (
            <Card
              key={product.id}
              price={product.price}
              thumbnail={product.thumbnail}
              title={product.title}
              discountPercentage={product.discountPercentage}
              id={product.id}
            />
          ),
        )
      )}
    </div>
  );
};

export default CardList;
