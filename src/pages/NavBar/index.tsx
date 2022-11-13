import { FC, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import styles from './index.module.scss';

interface NavBarProps {
  title: string;
  icon: string;
}
export const NavBar: FC<NavBarProps> = ({ icon, title }) => {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const nav = useNavigate();
  const [params] = useSearchParams();
  const goBack = () => {
    const return_to = params.get('return_to');
    if (return_to) {
      nav(return_to.toString());
    } else {
      router.back();
    }
  };
  const openMenu = () => {
    setOverlayVisible((pre) => !pre);
  };
  return (
    <div className={styles.navbar}>
      {icon ? (
        <span className={styles.icon_wrapper}>
          <Icon name={icon} class={styles.icon} onClick={icon === 'menu' ? openMenu : goBack} />
        </span>
      ) : null}
      <span className={styles.title_wrapper}>{title}</span>
      {icon === 'menu' && overlayVisible === true ? (
        <OverlayIcon
          onClose={() => {
            setOverlayVisible(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default NavBar;
