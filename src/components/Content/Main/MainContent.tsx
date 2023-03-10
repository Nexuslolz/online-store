import React from 'react';

import CardList from './components/CardList/CardList';

import styles from './MainContent.module.scss';

const MainContent: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <CardList />
    </div>
  );
};

export default MainContent;
