import { useState, useRef, useEffect } from 'react';

import CardLoader from './components/CardLoader';

import styles from './LazyLoader.module.scss';

export interface ILazyLoader {
  src?: string;
  alt: string;
  className?: string;
  onLoad?(): void;
}

const LazyLoader: React.FC<ILazyLoader> = (props: ILazyLoader) => {
  const { src, alt = '', className } = props;
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.onload = () => setIsLoading(false);
    }
  }, []);

  return (
    <div className={`${styles.loader__wrapper} ${className}`}>
      {isLoading && <CardLoader />}
      <img ref={imgRef} src={src} alt={alt} />
    </div>
  );
};

export default LazyLoader;
