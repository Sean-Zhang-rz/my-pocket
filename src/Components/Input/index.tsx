import { FC } from "react";
import styles from './index.module.scss'

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text';
  value?: string | number;
  error?: string;
  className?: string;
  onChange?: (value: string | number) => void;
}

export const Input: FC<InputProps> = (props) => {
  const { placeholder, type, value, onChange, className } = props

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className={[styles.input, className].join(' ')}
    />
  )
}