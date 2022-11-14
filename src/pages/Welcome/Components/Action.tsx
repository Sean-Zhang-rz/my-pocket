import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './index.module.scss'

const WelcomeAction: FC = () => {
  const nav = useNavigate();
  const id = parseInt(useParams()?.id?.toString() || '');
  const onClick = () => {
    localStorage.setItem('skipFeature', 'yes');
  };
  return (
    <div className={styles.actions}>
      <div className={styles.fake} onClick={() => nav("/start")}>
        跳过
      </div>
      <div onClick={() => nav(id <= 3 ? `/welcome/${id + 1}` : '/start')}>
        {id <= 3 ? '下一页' : <span onClick={onClick}>完成</span>}
      </div>
      <div className={id === 4 ? styles.fake : ''} onClick={() => nav("/start")}>
        <span onClick={onClick}>跳过</span>
      </div>
    </div>
  )
}
export default WelcomeAction