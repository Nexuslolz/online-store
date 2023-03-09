import React from 'react';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a target='_blank' href='https://github.com/Nexuslolz' className={styles.footer__production} rel='noreferrer'>
        <span></span>
      </a>
      <p className={styles.footer__description}>
        Bender Store<sup>®</sup> 2022
      </p>
    </footer>
  );
};

export default Footer;
