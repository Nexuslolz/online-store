import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './CardList.module.scss';

import { IProduct } from '../../../../../models/models';
import { getData } from '../../../../../store/selectors/dataSelector';
import { getIsList } from '../../../../../store/selectors/listSelector';
import { getSearchParams } from '../../../../../store/selectors/searchSelector';
import { useFetchProductsQuery } from '../../../../../store/services/productService.api';

import { dataSlice } from '../../../../../store/slices/dataSlice';
import { totalSlice } from '../../../../../store/slices/totalSlice';
import Card from '../../../../Card/Card';
import ListCard from '../../../../Card/ListCard/ListCard';
import Loader from '../../../../Loader/MainLoader/MainLoader';

const CardList: React.FC = () => {
  const { data, isLoading, error } = useFetchProductsQuery('100');
  const isList: boolean = useSelector(getIsList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalSlice.actions.setAmount(String(data?.products.length)));
  }, [data, dispatch]);

  const [searchData, searchLoading, searchError] = useSelector(getSearchParams);

  const productData: IProduct[] | undefined = searchData ?? data?.products;

  // const [products, setProducts] = useState<IProduct[] | undefined>(productData!);
  // dispatch(dataSlice.actions.setData(productData));

  // setProducts(useSelector(getData));
  // console.log(products);
  // setProducts(dataRes);

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
      {isLoading || searchLoading ? (
        <Loader />
      ) : error ? (
        <h1 className={styles.mainContainer__error}>
          Error has occured. {'status' in error ? error.status : error.message}. Try again later.
        </h1>
      ) : searchError ? (
        <h1 className={styles.mainContainer__error}>Error has occured, {searchError}</h1>
      ) : productData?.length === 0 ? (
        <h1 className={styles.mainContainer__noFound}>There is no products found &#128549;</h1>
      ) : (
        productData?.map((product) =>
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
