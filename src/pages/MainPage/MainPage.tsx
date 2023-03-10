import React from 'react';

import styles from './MainPage.module.scss';

import MainContent from '../../components/Content/Main/MainContent';
import FilterPanel from '../../components/Filter/FilterPanel';

const MainPage: React.FC = () => {
  return (
    <main className={styles.main}>
      <FilterPanel />
      <MainContent />
    </main>
  );
};

export default MainPage;
