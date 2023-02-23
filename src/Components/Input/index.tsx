import { Children, cloneElement, FC, ReactElement, useMemo } from "react";
import styles from './index.module.scss'

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'button';
  value?: string | number;
  error?: string;
  className?: string;
  children?: ReactElement;
  onChange?: (value: string | number) => void;
}

export const Input: FC<InputProps> = (props) => {
  const { placeholder, type, value, onChange, className, children } = props

  return (
    <div className={styles.container}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className={[
          styles.input,
          type === 'button' ? styles.input_with_button : '',
          className
        ].join(' ')}
      />
      {type === 'button' ? children : null}
    </div>
  )
}