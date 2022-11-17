import { FC } from "react";
import Icon from '../Icon';
import styles from './index.module.scss'
interface LoadingProps {

}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className={styles.loading_wrap}>
      <Icon name='loading' />
      <div className={styles.loading_text}>加载中...</div>
    </div>
  );
}

export default Loading;