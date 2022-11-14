import { FC } from 'react';
import { Icon, IconName } from '../Icon';
import styles from './index.module.scss';

interface FloatButtonProps {
  name: IconName;
}

const FloatButton: FC<FloatButtonProps> = (props, context) => {
  return (
    <div className={styles.float_button}>
      <Icon name={props.name} className={styles.icon} />
    </div>
  );
};

export default FloatButton;
