import { FC, ReactNode, useMemo, useState } from 'react';
import FormDataProps, { Rules } from '@/api/types/form';
// import { DatetimePicker, Popup } from 'vant';
import Button from '@/Components/Button';
import { Time } from '@/utils/time';
import styles from './index.module.scss';

interface FormItemProps {
  prop: string;
  modelValue: string | number;
  label: string;
  rule: Rules;
  type: 'date' | 'validation' | 'select';
  options: { value: string; text: string }[];
  error: string,
  placeholder: string,
  onClick: ((e: MouseEvent) => void) | undefined;
  children?: ReactNode
}
const FormItem: FC<FormItemProps> = (props) => {

  // emits: ['update:modelValue'],

  const [refDateVisible, setRefDateVisible] = useState(false);
  const content = useMemo(() => {
    const children = props.children;
    // const button = context.slots.button?.();
    return (
      <div className={styles.form_item_value}>
        {children ? (
          // children.map((c) => <c class={props.error?.length! > 1 ? styles.error : ''} />)
          null
        ) : (
          <>
            {props.type === 'select' ? (
              <select
                className={[styles.form_item, styles.select].join(' ')}
                value={props.modelValue}
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
                  value={props.modelValue}
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
                    // button ? styles.input_with_button : '',
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
                {/* {button ? <div className={[styles.slots_button]}>{button}</div> : null} */}
              </>
            )}
          </>
        )}
      </div>
    );
  }, []);

  return (
    <div className={styles.form_row}>
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