import { FC, MouseEventHandler, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon, { IconName } from '../Components/Icon';
import OverlayIcon from '../OverlayIcon';

import styles from './index.module.scss';

interface NavBarProps {
  title: string;
  icon: IconName;
}
export const NavBar: FC<NavBarProps> = ({ icon, title }) => {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const nav = useNavigate();
  const [params] = useSearchParams();
  const goBack: MouseEventHandler<SVGSVGElement> | undefined = () => {
    const return_to = params.get('return_to');
    if (return_to) {
      nav(return_to.toString());
    } else {
      nav(-1);
    }
  };
  const openMenu: MouseEventHandler<SVGSVGElement> | undefined = () => {
    setOverlayVisible((pre) => !pre);
  };
  return (
    <div className={styles.navbar}>
      {icon ? (
        <span className={styles.icon_wrapper}>
          <Icon name={icon} className={styles.icon} onClick={icon === 'menu' ? openMenu : goBack} />
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
