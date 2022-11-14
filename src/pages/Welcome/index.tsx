import { FC, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { animated, useTransition } from '@react-spring/web';
import { throttle } from '@/utils/throttle';
import logoSvg from '@/assets/icons/logo.svg';
import WelcomeAction from './Components/Action';
import styles from './index.module.scss';
import WelcomeRender from './Components/Render';


const Welcome: FC = () => {
  const location = useLocation(); // 获取当前路径
  const [extraStyle, setExtraStyle] = useState({ position: 'relative' })
  const transitions = useTransition(location.pathname, {
    from: () =>
      location.pathname === '/welcome/1'
        ? { transform: 'translateX(0%)' }
        : { transform: 'translateX(100%)' },
    enter: { transform: 'translateX(0%)' },
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 300 },
    onStart: () => {
      setExtraStyle({ position: 'absolute' })
    },
    onRest: () => {
      setExtraStyle({ position: 'relative' })
    }
  });

  const navigate = useNavigate();
  const [params] = useSearchParams();
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

  return (
    <div className={styles.wrapper}>
      <header>
        <img src={logoSvg} />
        <h1>山竹记账</h1>
      </header>
      <main className={styles.main}>
        {transitions((style, pathname) => (
          <animated.div
            key={pathname}
            style={{ ...style, ...extraStyle }}
            className={styles.animated}
          >
            <div className={styles.render_wraper}>
              <WelcomeRender pathname={pathname} />
            </div>
          </animated.div>
        ))}
      </main>
      <footer>
        <WelcomeAction />
      </footer>
    </div>
  );
};

export default Welcome;
