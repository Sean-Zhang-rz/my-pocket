import { FC, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { animated, useTransition } from '@react-spring/web';
import { throttle } from '@/utils/throttle';
import logoSvg from '@/assets/icons/logo.svg';
import styles from './index.module.scss';

const Welcome: FC = () => {
  const location = useLocation(); // 获取当前路径
  const transitions = useTransition(location.pathname, {
    from: () =>
      location.pathname === '/welcome/1'
        ? { transform: 'translateX(0%)' }
        : { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 1000 },
  });

  const navigate = useNavigate();
  const [params] = useSearchParams();
  // const { swiping, direction } = useSwipe(main);
  const pushRouter = throttle(() => {
    const pageId = parseInt(params.get('id')?.toString() || '');
    if (pageId === 4) return;
    navigate(`/welcome/${pageId + 1}`);
  }, 500);
  const backRouter = throttle(() => {
    const pageId = parseInt(params.get('id')?.toString() || '');
    if (pageId === 1) return;
    // router.back();
  }, 500);
  useEffect(() => {
    // if (swiping && direction === 'left') {
    //   pushRouter();
    // } else if (swiping && direction === 'right') {
    //   backRouter();
    // }
  }, []);

  return transitions((style, pathname) => (
    <animated.div key={pathname} style={style}>
      <div className={styles.wrapper}>
        <header>
          <img src={logoSvg} />
          <h1>山竹记账</h1>
        </header>
        <footer></footer>
      </div>
    </animated.div>
  ));
};

export default Welcome;
