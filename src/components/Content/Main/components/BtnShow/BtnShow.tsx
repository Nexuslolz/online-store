import React from 'react';

import styles from './BtnShow.module.scss';

interface IBtnShow {
  additionalClass: string;
  onClick(): void;
}

const BtnShow: React.FC<IBtnShow> = ({ ...props }: IBtnShow) => {
  return (
    <button className={`${styles.mainContainer__showBtn} ${props.additionalClass}`} onClick={props.onClick}></button>
  );
};

export default BtnShow;
