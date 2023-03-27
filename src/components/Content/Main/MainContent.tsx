import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CardList from './components/CardList/CardList';

import styles from './MainContent.module.scss';

import { IProduct } from '../../../models/models';
import { getSearchParams } from '../../../store/selectors/searchSelector';
import { useFetchProductsQuery } from '../../../store/services/productService.api';
import { RootState } from '../../../store/store';
import { setFilters } from '../../../utils/setFilter';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loader from '../../Loader/MainLoader/MainLoader';

interface IMainContentProps {
  allProducts: IProduct[];
}

const MainContentContainer: React.FC = () => {
  const { data, isLoading, error } = useFetchProductsQuery('100');

  if (error || !data) {
    if (error) {
      return <ErrorMessage error={error} styles={styles.mainContainer__error} />;
    }
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.mainContainer}>
      <MainContent allProducts={data.products} />
    </div>
  );
};

const MainContent: React.FC<IMainContentProps> = ({ allProducts }: IMainContentProps) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(20);

  const isFilterCategory = useSelector((state: RootState) => state.menu.current.categories);
  const isFilterBrand = useSelector((state: RootState) => state.menu.current.brands);
  const [, , , isSearch] = useSelector(getSearchParams);

  const currentCategories = useSelector((state: RootState) => state.menu.current.categories);
  const currentBrands = useSelector((state: RootState) => state.menu.current.brands);

  let resultProducts = allProducts;
  if (currentCategories.length) {
    resultProducts = allProducts.filter((product) => currentCategories.includes(product.category));
  }

  if (currentBrands.length) {
    resultProducts = resultProducts.filter((product) => currentBrands.includes(product.brand));
  }

  if (currentBrands.length === 0 && currentCategories.length === 0) {
    resultProducts = allProducts;
  }

  const isBtnAble = () => {
    if (isFilterCategory.length !== 0 || isFilterBrand.length !== 0 || isSearch) {
      return true;
    }
    return false;
  };

  const btnUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setFilters(allProducts, dispatch);
  }, [allProducts, dispatch]);

  return (
    <>
      <CardList products={resultProducts.slice(0, limit)} />
      <Button
        additionalClass={isBtnAble() ? styles.disableBtn : limit >= 100 ? styles.endBtn : ''}
        text={limit >= 100 ? 'To begin' : 'Next'}
        onClick={limit >= 100 ? () => btnUp() : () => setLimit(limit + 20)}
      />
    </>
  );
};

export default MainContentContainer;
