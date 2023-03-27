import React from 'react';

import styles from './ErrorPage.module.scss';

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.error__wrapper}>
      <h1>Error 404</h1>
      <h2>Page not found</h2>
    </div>
  );
};

export default ErrorPage;
