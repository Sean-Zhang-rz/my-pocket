import { FC } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/Components/Icon';
import MainLayout from '@/Components/MainLayout';
import Button from '@/Components/Button';
import FloatButton from '@/Components/FloatButton';
import styles from './index.module.scss';

const StartPage: FC = () => {
  return (
    <MainLayout title="山竹记账" icon="menu">
      <>
        <div className={styles.icon_wrapper}>
          <Icon name="pig" className={styles.icon} />
        </div>
        <div className={styles.btn_wrapper}>
          <Link to="/items/create">
            <Button className={styles.btn}>开始记账</Button>
          </Link>
        </div>
        <Link to="/items/create">
          <FloatButton name="add" />
        </Link>
      </>
    </MainLayout>
  );
};
export default StartPage;
