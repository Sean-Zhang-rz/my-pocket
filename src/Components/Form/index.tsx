
import React, { FC, ReactElement, ReactNode, useState } from 'react';
import FormDataProps, { Rules } from '@/api/types/form';
import styles from './index.module.scss';
import { validate } from '@/utils/validateForm';


interface FormProps {
  formData: FormDataProps;
  rules: Rules[];
  onSubmit: (e: Event) => void;
  children?: ReactElement;
}
const Form: FC<FormProps> = (props) => {
  const [errors, setErrors] = useState<{ [k in keyof typeof props.formData]?: string[] }>({});
  const onSubmit = (e: Event) => {
    e.preventDefault();
    const validate = checkInput();
    if (validate) props.onSubmit?.(e)
  };
  const checkInput = () => {
    if (props.formData && props.rules) {
      Object.keys(props.formData).forEach(key => {
        setErrors((pre) => ({ ...pre, [key]: undefined }))
      })
      const err = validate(props.formData, props.rules)
      if (Object.keys(err).length) {
        Object.assign(errors, err);
        return false
      } else {
        return true
      }
    }
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {React.Children?.map(props.children, (c) => {
        // return (
        //   <c
        //   // formDara={FormData}
        //   // v-model={props.formData[c?.props?.prop]}
        //   // error={errors[c?.props?.prop] ? errors[c?.props?.prop]?.[0] : '　'}
        //   />
        // );
        const itemProps = {
          ...c.props,
          error: errors[c?.props?.prop] ? errors[c?.props?.prop]?.[0] : '　',
        }
        return React.cloneElement(c, c.props)
      })}
    </form>
  );

};
export default Form