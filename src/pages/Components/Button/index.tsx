import { FC, useMemo, useState } from 'react';
import styles from './index.module.scss';

interface ButtonProps {
  level: 'important' | 'normal' | 'danger';
  type: 'submit' | 'button';
  disabled: boolean;
  autoSelfDisabled: boolean;
  onClick?: (e: MouseEvent) => void;
}

const Button: FC<ButtonProps> = (props) => {
  const [selfDisabled, setSelfDisabled] = useState<boolean>(false);
  const _disabled = useMemo(() => {
    if (!props.autoSelfDisabled) return props.disabled;
    return selfDisabled || props.disabled;
  }, [props.autoSelfDisabled, props.disabled]);
  const onClick = (e: MouseEvent) => {
    props.onClick?.(e);
    setSelfDisabled(true);
    setTimeout(() => {
      setSelfDisabled(false);
    }, 500);
  };
  return (
    <button
      className={[
        styles.btn,
        props.disabled || _disabled ? styles.disabled : '',
        styles[props.level || 'normal'],
      ].join(' ')}
      type={props.type}
      disabled={_disabled}
      onClick={onClick}
    >
      {context.slots.default?.()}
    </button>
  );
};
Button.defaultProps = {
  level: 'normal',
  type: 'button',
  disabled: false,
  autoSelfDisabled: false,
  onClick: undefined,
};
export default Button;
