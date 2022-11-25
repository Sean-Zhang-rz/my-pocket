import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { animated, useSpring } from '@react-spring/web';
import useMenuStore from '@/stores/useMenuStore';
import Icon from '@/Components/Icon';
import styles from './index.module.scss';

export const OverlayIcon: FC = () => {
  const nav = useNavigate();
  const { visible, setVisible } = useMenuStore()
  const myInfo = false
  const [maskVisible, setMaskVisible] = useState(false)
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
    config: { duration: 300 },
    onStart: ({ value: { opacity } }) => {
      if (opacity < 0.1) setMaskVisible(true)
    },
    onRest: ({ value: { opacity } }) => {
      if (opacity < 0.1) setMaskVisible(false)
    }
  })
  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0%)' : 'translateX(-100%)',
    config: { duration: 300 }
  })

  const route = useParams();

  const onSignOut = async () => {
    // await Dialog.confirm({
    //   title: '确认',
    //   message: '确认要退出登录吗？',
    // });
    localStorage.removeItem('jwt');
    nav('/sign_in');
  };

  const close = () => {
    setVisible(false)
  };
  useEffect(() => () => {
    close()
  }, []);
  return (
    <>
      <animated.div
        className={styles.mask}
        style={{ ...maskStyles, visibility: maskVisible ? 'visible' : 'hidden' }}
        onClick={close}
      />
      <animated.div className={styles.overlay} style={menuStyles}>
        <section className={styles.currentUser}>
          {myInfo ? (
            <div>
              {/* <h2 className={styles.email}>{myInfo.email}</h2> */}
              <p onClick={onSignOut}>退出登录</p>
            </div>
          ) : (
            <Link to={`/sign_in?return_to=${route.fullPath}`}>
              <h2>未登录用户</h2>
              <p>点击这里登录</p>
            </Link>
          )}
        </section>
        <nav>
          <ul className={styles.action_list}>
            <li>
              <Link to="/items/create" className={styles.action}>
                <Icon name="pig" className={styles.icon} />
                <span>记账</span>
              </Link>
            </li>
            <li>
              <Link to="/statistics" className={styles.action}>
                <Icon name="charts" className={styles.icon} />
                <span>统计图表</span>
              </Link>
            </li>
            <li>
              <Link to="/export" className={styles.action}>
                <Icon name="export" className={styles.icon} />
                <span>导出数据</span>
              </Link>
            </li>
            <li>
              <Link to="/notify" className={styles.action}>
                <Icon name="notify" className={styles.icon} />
                <span>记账提醒</span>
              </Link>
            </li>
          </ul>
        </nav>
      </animated.div>
    </>
  );
};

export default OverlayIcon;
