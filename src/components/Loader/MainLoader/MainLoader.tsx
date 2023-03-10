import styles from './MainLoader.module.scss';

import loader from '../../../assets/loader/pageLoader.gif';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img className={styles.loaderImg} src={loader} alt='loader' />
    </div>
  );
};

export default Loader;
