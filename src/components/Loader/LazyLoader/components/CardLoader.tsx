import styles from './CardLoader.module.scss';

import loader from '../../../../assets/loader/cardLoader.gif';

const CardLoader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img className={styles.loaderImg} src={loader} alt='loader' />
    </div>
  );
};

export default CardLoader;
