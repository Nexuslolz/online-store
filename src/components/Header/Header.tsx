import React from 'react';

import styles from './Header.module.scss';

import Basket from '../Basket/Basket';
import Logo from '../Logo/Logo';
import SearchMain from '../Search/SearchMain';

const Header: React.FC = () => {
  return (
    <header className={styles.pageHeader}>
      <Logo />
      <SearchMain />
      <Basket />
    </header>
  );
};

export default Header;
