import React from 'react';

import { useLocation } from 'react-router';

import styles from './Header.module.scss';

import ControlPanel from '../Content/Main/components/ControlPanel/ControlPanel';
import ControlPanelOther from '../Content/Main/components/ControlPanel/ControlPanelOther/ControlPanelOther';
import Logo from '../Logo/Logo';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className={styles.pageHeader}>
      <Logo />
      {location.pathname === '/' ? <ControlPanel /> : <ControlPanelOther />}
    </header>
  );
};

export default Header;
