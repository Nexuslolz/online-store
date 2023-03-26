import React, { useState } from 'react';

import styles from './FilterBox.module.scss';

import ArrowFilter from '../../Icons/ArrowFilter/ArrowFilter';

interface IFilter {
  header: string;
  name: string;
  options: string[];
}

const FilterBox: React.FC<IFilter> = ({ ...props }: IFilter) => {
  const [openList, setOpenList] = useState<boolean>(false);

  return (
    <div className={styles.filterBox}>
      <div className={styles.filterBox__headerWrapper}>
        <h2 className={styles.filterBox__header}>{props.header}</h2>
        <button
          className={
            openList
              ? `${styles.filterBox__headerBtn} ${styles.filterBox__headerBtn_open}`
              : styles.filterBox__headerBtn
          }
          onClick={() => setOpenList((openList) => !openList)}
        >
          <ArrowFilter fill='#fff' width='70%' height='70%' />
        </button>
      </div>
      <div
        className={
          openList
            ? `${styles.filterBoxList__wrapper} ${styles.filterBoxList__wrapper_open}`
            : styles.filterBoxList__wrapper
        }
      >
        <ul className={openList ? `${styles.filterBoxList} ${styles.filterBoxList_open}` : styles.filterBoxList}>
          {props.options.map((option, i) => (
            <li className={styles.filterBoxList__item} key={i}>
              <div className={styles.filterBoxList__input}>
                <input className={styles.filter__input} name={props.name} id={option} type='checkbox' />
                <label className={styles.filter__label} htmlFor={option}>
                  {option}
                </label>
              </div>
              {/* <div className={styles.filterBoxList__value}>
                <span>15</span> / <span>15</span>
              </div> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterBox;
