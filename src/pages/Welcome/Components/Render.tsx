import { FC, ReactNode, useRef } from "react";
import { useParams } from "react-router-dom";
import pig from '@/assets/icons/pig.svg'
import clock from '@/assets/icons/clock.svg'
import chart from '@/assets/icons/chart.svg'
import cloud from '@/assets/icons/cloud.svg'
import styles from './index.module.scss';


const WelcomeRender: FC<{ pathname: string }> = (props) => {
  const slotsArray: {
    icon: string;
    title: string;
    subTitle: string;
  }[] = [{
    icon: pig,
    title: '会挣钱',
    subTitle: '还会省钱',
  },
  {
    icon: clock,
    title: '每日提醒',
    subTitle: '不遗漏每一笔账单',
  },
  {
    icon: chart,
    title: '数据可视化',
    subTitle: '收支一目了然',
  },
  {
    icon: cloud,
    title: '云备份',
    subTitle: '再也不怕数据丢失',
  }];
  const pageId = parseInt(props.pathname[props.pathname.length - 1] || '');
  const item = slotsArray[pageId - 1];
  console.log();

  return (
    <div className={styles.card}>
      <img src={item.icon} className={styles.img} />
      <h2>
        {item.title}
        <br />
        {item.subTitle}
      </h2>
    </div>
  );
}
export default WelcomeRender;