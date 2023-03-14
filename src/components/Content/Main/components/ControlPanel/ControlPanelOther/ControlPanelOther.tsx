import Basket from '../../../../../Basket/Basket';
import SearchMain from '../../../../../Search/SearchMain';
import styles from '../../../MainContent.module.scss';

const ControlPanelOther = () => {
  return (
    <div className={styles.mainContainer__panel}>
      <SearchMain />
      <Basket />
    </div>
  );
};

export default ControlPanelOther;
