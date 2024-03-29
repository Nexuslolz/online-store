import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './CardList.module.scss';

import { IProduct } from '../../../../../models/models';
import { getIsList } from '../../../../../store/selectors/listSelector';
import { getSearchParams } from '../../../../../store/selectors/searchSelector';

import { getSort } from '../../../../../store/selectors/sortSelector';
import { totalSlice } from '../../../../../store/slices/totalSlice';
import { sortingParams } from '../../../../../utils/sorting';
import Card from '../../../../Card/Card';
import ListCard from '../../../../Card/ListCard/ListCard';
import Loader from '../../../../Loader/MainLoader/MainLoader';

interface ICardList {
  products: IProduct[];
}

const CardList: React.FC<ICardList> = ({ products }: ICardList) => {
  const isList: boolean = useSelector(getIsList);
  const dispatch = useDispatch();

  const [searchData, searchLoading, searchError] = useSelector(getSearchParams);

  let productData: IProduct[] = searchData ?? products;

  const sort = useSelector(getSort);
  sortingParams.map((param) => {
    if (sort === param.option) {
      productData = param.sort([...productData]);
      return productData;
    }
    return productData;
  });

  useEffect(() => {
    dispatch(totalSlice.actions.setAmount(String(productData.length)));
  }, [dispatch, productData.length]);

  return (
    <div
      className={
        isList
          ? styles.mainContainer__cardList_list
          : searchError || productData?.length === 0 || searchLoading
          ? styles.mainContainer__cardList_empty
          : styles.mainContainer__cardList
      }
    >
      {searchLoading ? (
        <Loader />
      ) : searchError ? (
        <h1 className={styles.mainContainer__error}>Error has occured, {searchError}</h1>
      ) : productData?.length === 0 ? (
        <h1 className={styles.mainContainer__noFound}>There is no products found &#128549;</h1>
      ) : (
        productData.map((product) =>
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
