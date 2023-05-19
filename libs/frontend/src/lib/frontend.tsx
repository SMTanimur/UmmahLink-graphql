import styles from './frontend.module.css';

/* eslint-disable-next-line */
export interface FrontendProps {}

export function Frontend(props: FrontendProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Frontend!</h1>
    </div>
  );
}

export default Frontend;
