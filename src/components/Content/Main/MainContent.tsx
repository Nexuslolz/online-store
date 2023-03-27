import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CardList from './components/CardList/CardList';

import styles from './MainContent.module.scss';

import { IProduct } from '../../../models/models';
import { getSort } from '../../../store/selectors/sortSelector';
import { useFetchProductsQuery } from '../../../store/services/productService.api';
import { RootState } from '../../../store/store';
import { setFilters } from '../../../utils/setFilter';
import { sortingParams } from '../../../utils/sorting';
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

  return <MainContent allProducts={data.products} />;
};

const MainContent: React.FC<IMainContentProps> = ({ allProducts }: IMainContentProps) => {
  const dispatch = useDispatch();

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

  const sort = useSelector(getSort);
  sortingParams.map((param) => {
    if (sort === param.option) {
      resultProducts = param.sort([...resultProducts]);
      return resultProducts;
    }
    return resultProducts;
  });

  useEffect(() => {
    setFilters(allProducts, dispatch);
  }, [allProducts, dispatch]);

  return (
    <div className={styles.mainContainer}>
      <CardList products={resultProducts} />
    </div>
  );
};

export default MainContentContainer;
