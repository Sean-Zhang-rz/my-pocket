import { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './index.module.scss';

const WelcomeAction: FC = () => {
  const id = parseInt(useParams()?.id?.toString() || '');
  const onClick = () => {
    localStorage.setItem('skipFeature', 'yes');
  };
  return (
    <div className={styles.actions}>
      <Link className={styles.fake} to={'/start'}>
        跳过
      </Link>
      <Link to={id <= 3 ? `/welcome/${id + 1}` : '/start'}>
        {id <= 3 ? '下一页' : <span onClick={onClick}>完成</span>}
      </Link>
      <Link className={id === 4 ? styles.fake : ''} to={'start'}>
        <span onClick={onClick}>跳过</span>
      </Link>
    </div>
  );
};
export default WelcomeAction;
