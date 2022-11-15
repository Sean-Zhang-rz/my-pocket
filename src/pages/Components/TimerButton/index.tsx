import { FC, useMemo, useRef, useState } from 'react';
import Button from '@/Components/Button';

interface TimerButtonProps {
  countFrom: number;
  disabled: boolean;
  onClick?: (e?: MouseEvent) => void;
}
const TimerButton: FC<TimerButtonProps> = (props) => {
  const timer = useRef<number | NodeJS.Timer>()

  const [count, setCount] = useState<number>(props.countFrom);

  const isCounting = useMemo(() => !!timer.current, [timer.current]);
  const startCount = () => {
    timer.current = setInterval(() => {
      setCount(pre => pre - 1)
      if (count === 0) {
        clearInterval(timer.current as NodeJS.Timer);
        timer.current = undefined;
        setCount(props.countFrom);
      }
    }, 1000);
  };

  // context.expose({ startCount });
  return (
    <Button disabled={isCounting} onClick={props.onClick}>
      {isCounting ? `${count}秒后重新发送` : '发送验证码'}
    </Button>
  );

};
TimerButton.defaultProps = {
  countFrom: 60,
  disabled: false,
  onClick: undefined
}
export default TimerButton;