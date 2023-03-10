import React from 'react';

import FilterBox from './FilterBox/FilterBox';
import styles from './FilterPanel.module.scss';
import FilterRange from './FilterRange/FilterRange';

const FilterPanel: React.FC = () => {
  return (
    <div className={styles.filterWrapper}>
      <FilterBox name='Category-filter' header='Category' options={['cat1', 'cat2', 'cat3', 'cat4', 'cat5']} />
      <FilterBox name='Brand-filter' header='Brand' options={['brand1', 'brand2', 'brand3', 'brand4']} />
      <FilterRange title='Price' name='price' />
      <FilterRange title='Stock' name='stock' />
    </div>
  );
};

export default FilterPanel;
