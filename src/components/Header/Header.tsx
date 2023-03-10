import React from 'react';

import styles from './Header.module.scss';

import ControlPanel from '../Content/Main/components/ControlPanel/ControlPanel';
import Logo from '../Logo/Logo';

const Header: React.FC = () => {
  return (
    <header className={styles.pageHeader}>
      <Logo />
      <ControlPanel />
    </header>
  );
};

export default Header;
