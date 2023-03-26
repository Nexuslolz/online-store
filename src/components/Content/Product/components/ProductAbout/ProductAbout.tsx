import React from 'react';

import styles from './ProductAbout.module.scss';

interface IProductAbout {
  title: string;
  text: string;
}

const ProductAbout: React.FC<IProductAbout> = ({ ...props }: IProductAbout) => {
  return (
    <li className={styles.productPageList__item}>
      <div className={styles.productPageList__wrapper}>
        <h3 className={styles.productPageList__header}>{props.title}</h3>
        <p className={styles.productPageList__text}>{props.text}</p>
      </div>
    </li>
  );
};

export default ProductAbout;
