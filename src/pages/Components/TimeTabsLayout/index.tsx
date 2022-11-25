// import { Overlay, Toast } from 'vant';
import { FC, useState } from 'react';
import { Time } from '@/utils/time';
import MainLayout from '@/Components/MainLayout';
import { Tabs } from '@/Components/index';
import { Tab } from '@/Components/index';
// import { Form } from '@/components/Form';
// import { FormItem } from '@/components/Form/Components/FormItem';
import styles from './index.module.scss';

const TimeTabsRender: FC<{
  startDate: string;
  endDate: string;
  custom?: boolean;
}> = () => {
  return <></>;
};
TimeTabsRender.defaultProps = {
  startDate: new Time().firstDayOfMonth().format(),
  endDate: new Time().lastDayOfMonth().format(),
};
interface TimeTabsLayoutProps {
  component: typeof TimeTabsRender;
  showYear: true;
  icon: 'back' | 'menu';
}
const TimeTabsLayout: FC<TimeTabsLayoutProps> = (props) => {
  const [selected, setSelected] = useState('本月');
  const [refOverlayVisible, setRefOverlayVisible] = useState(false);
  const time = new Time();
  const [customTime, setCustomTime] = useState<{
    start?: string;
    end?: string;
  }>({});
  const [tempTime, setTempTime] = useState({
    start: new Time().firstDayOfMonth().format(),
    end: new Time().lastDayOfMonth().format(),
  });
  const timeList = [
    {
      start: time.firstDayOfMonth(),
      end: time.lastDayOfMonth(),
    },
    {
      start: time.add(-1, 'month').firstDayOfMonth(),
      end: time.add(-1, 'month').lastDayOfMonth(),
    },
    {
      start: time.firstDayOfYear(),
      end: time.lastDayOfYear(),
    },
  ];

  const onSubmitCustomTime = (e: Event) => {
    e.preventDefault();
    if (+new Date(tempTime.end) - +new Date(tempTime.start) < 0) {
      // Toast('结束时间不可大于结束时间');
      return;
    }
    setRefOverlayVisible(false);
    setCustomTime((pre) => ({ ...pre, ...tempTime }));
  };

  return (
    <MainLayout title="山竹记账" icon={props.icon}>
      <Tabs
        classPrefix={'customTabs'}
        v-model:selected={selected}
        // onUpdate:selected={(value) => {
        //   if (value === '自定义时间') setRefOverlayVisible(true);
        // }}
      >
        <Tab id="本月" name="本月">
          <props.component
            startDate={timeList[0].start.format()}
            endDate={timeList[0].end.format()}
          />
        </Tab>
        <Tab id="上月" name="上月">
          <props.component
            startDate={timeList[1].start.format()}
            endDate={timeList[1].end.format()}
          />
        </Tab>

        {props.showYear ? (
          <Tab id="今年" name="今年">
            <props.component
              startDate={timeList[2].start.format()}
              endDate={timeList[2].end.format()}
            />
          </Tab>
        ) : null}
        <Tab id="自定义时间" name="自定义时间">
          <props.component startDate={customTime.start!} endDate={customTime.end!} custom={true} />
        </Tab>
      </Tabs>

      {/* <Overlay show={refOverlayVisible} class={styles.overlay}>
        <div class={styles.overlay_inner}>
          <header>请选择时间</header>
          <main>
            <Form formData={tempTime}>
              <FormItem label="开始时间" prop="start" type="date" />
              <FormItem label="结束时间" prop="end" type="date" />
              <FormItem>
                <div class={styles.actions}>
                  <button type="button" onClick={() => setRefOverlayVisible(false)}>
                    取消
                  </button>
                  <button type="submit" onClick={onSubmitCustomTime}>
                    确认
                  </button>
                </div>
              </FormItem>
            </Form>
          </main>
        </div>
      </Overlay> */}
    </MainLayout>
  );
};
export default TimeTabsLayout;
