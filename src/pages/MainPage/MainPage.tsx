import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './MainPage.module.scss';

import MainContent from '../../components/Content/Main/MainContent';
import FilterPanel from '../../components/Filter/FilterPanel';
import { getIsOpen } from '../../store/selectors/menuSelector';
import { menuSlice } from '../../store/slices/menuSlice';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(getIsOpen);

  const openMenu = () => {
    if (!isOpen) {
      dispatch(menuSlice.actions.setMenu(true));
    }
  };

  return (
    <main className={styles.main}>
      <div onClick={openMenu} className={styles.filterBtn__wrapper}>
        <button className={styles.filter__btn}>{'>'}</button>
      </div>
      <FilterPanel />
      <MainContent />
    </main>
  );
};

export default MainPage;
