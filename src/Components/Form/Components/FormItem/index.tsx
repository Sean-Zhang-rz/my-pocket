import { cloneElement, CSSProperties, FC, useMemo, useState } from 'react';
import FormDataProps, { Rules } from '@/api/types/form';
// import { DatetimePicker, Popup } from 'vant';
import Button from '@/Components/Button';
import { Time } from '@/utils/time';
import styles from './index.module.scss';
import { Children } from 'react';
import { ReactElement } from 'react';

interface FormItemProps {
  prop?: string;
  value?: string | number;
  label?: string;
  rule?: Rules;
  type?: 'date' | 'validation' | 'select';
  options?: { value: string; text: string }[];
  error?: string;
  placeholder?: string;
  style?: CSSProperties;
  button?: ReactElement;
  onClick?: ((e: MouseEvent) => void) | undefined;
  children?: ReactElement
}
const FormItem: FC<FormItemProps> = (props) => {
  const [refDateVisible, setRefDateVisible] = useState(false);
  const content = useMemo(() => {
    return (
      <div className={styles.form_item_value}>
        {props.children ? (
          Children.map(props.children, (c) => c
            ? cloneElement(c, { className: props.error?.length! > 1 ? styles.error : '' }) : null
          )
        ) : (
          <>
            {props.type === 'select' ? (
              <select
                className={[styles.form_item, styles.select].join(' ')}
                value={props.value}
                onChange={(e: any) => {
                  // context.emit('update:modelValue', e.target.value);
                }}
              >
                {props.options?.map((option) => (
                  <option value={option.value}>{option.text}</option>
                ))}
              </select>
            ) : (
              <>
                {' '}
                <input
                  value={props.value}
                  readOnly={props.type === 'date'}
                  placeholder={props.placeholder}
                  onInput={(e: any) => {
                    // context.emit('update:modelValue', e.target.value);
                  }}
                  onClick={() => {
                    if (props.type === 'date') {
                      setRefDateVisible(true)
                    }
                  }}
                  className={[
                    styles.form_item,
                    styles.input,
                    props.button ? styles.input_with_button : '',
                    props.error?.length! > 1 ? styles.error : '',
                  ].join(' ')}
                />
                {props.type === 'date' ? (
                  // <Popup position="bottom" v-model:show={refDateVisible} teleport="body">
                  //   <DatetimePicker
                  //     modelValue={props.modelValue ? new Date(props.modelValue) : new Date()}
                  //     type="date"
                  //     title="选择年月日"
                  //     onConfirm={(date: Date) => {
                  //       context.emit('update:modelValue', new Time(date).format());
                  //       refDateVisible.value = false;
                  //     }}
                  //     onCancel={() => (refDateVisible.value = false)}
                  //   />
                  // </Popup>
                  null
                ) : null}
                {props.button ? <div className={styles.slots_button}>{props.button}</div> : null}
              </>
            )}
          </>
        )}
      </div>
    );
  }, [props.children, props.type, props.value]);

  return (
    <div className={styles.form_row} style={props.style}>
      <label className={styles.form_label}>
        <span className={styles.form_item_name}>{props.label}</span>
        {content}
        <div className={styles.form_item_errorHint}>
          <span>{props.error}</span>
        </div>
      </label>
    </div>
  );
}
export default FormItem