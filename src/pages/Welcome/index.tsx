import { FC, useEffect, useRef } from 'react';
import logoSvg from '@/assets/icons/logo.svg';
import { useSwipe } from '@/hooks/useSwipe';
import { throttle } from '@/utils/throttle';
import styles from './index.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Welcome: FC = () => {
  const main = useRef<HTMLElement>();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { swiping, direction } = useSwipe(main);
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
  // watchEffect(() => {
  //   if (swiping.value && direction.value === 'left') {
  //     pushRouter();
  //   } else if (swiping.value && direction.value === 'right') {
  //     backRouter();
  //   }
  // });
  useEffect(() => {
    if (swiping && direction === 'left') {
      pushRouter();
    } else if (swiping && direction === 'right') {
      backRouter();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <img src={logoSvg} />
        <h1>山竹记账</h1>
      </header>
      <footer></footer>
    </div>
  );
};

export default Welcome;
