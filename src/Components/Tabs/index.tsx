import { FC, ReactNode, useEffect } from 'react';
import Tab from '@/Components/Tabs/Tab';
import styles from './index.module.scss';


interface TabProps {
  selected: boolean;
  classPrefix: string;
  children?: ReactNode;
}
const Tabs: FC<TabProps> = (props) => {
  // emits: ['update:selected'],
  const childrenArray = props.children
  const cp = props.classPrefix;
  useEffect(() => {
    if (!childrenArray) return () => null;
    childrenArray.forEach((v) => {
      if (typeof v.type === 'symbol') return
      if (v.type !== Tab) {
        throw new Error('<Tabs> only accepts <Tab> as children');
      }
    });
  }, []);


  return (
    <div className={[styles.tabs, cp + '_tabs'].join(' ')}>
      <ol className={styles.tabs_nav}>
        {childrenArray.filter(v => v.type === Tab).map((item) => (
          <li
            className={[
              item.props?.id === props.selected ? [styles.selected, cp + '_selected'] : '',
              cp + '_tabs_nav_item',
            ].join(' ')}
            onClick={() => {
              context.emit('update:selected', item.props?.id);
            }}
          >
            {item.props?.name || item.props?.id}
          </li>
        ))}
      </ol>
      <div className={styles.tab_content}>
        {childrenArray.find((content) => content.props?.id === props.selected)}
      </div>
    </div>
  );

}
};

export default Tabs