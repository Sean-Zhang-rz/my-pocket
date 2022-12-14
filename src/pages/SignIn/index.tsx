import { FC, FormEvent, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Rules } from '@/api/types/form';
import { Icon, Button, Form, FormItem, MainLayout } from '@/Components/index';
import { getValidationCode, signIn } from '@/api/common';
import { onError } from '@/utils/onError';
// import { useMeStore } from '@/stores/useMeStore';
// import { Toast } from 'vant';
import TimerButton from '../Components/TimerButton';
import styles from './index.module.scss';

const SignInPage: FC = () => {
  // const meStore = useMeStore();
  const [route] = useSearchParams();
  const nav = useNavigate();
  const refValidationCode = useRef<{ startCount: () => void }>(null);
  const [formData, setFormData] = useState({ email: '770899447@qq.com', code: '' });

  const rules: Rules[] = [
    { key: 'email', type: 'required', message: '必填' },
    { key: 'email', type: 'pattern', regex: /.+@.+/, message: '邮箱地址不正确' },
    { key: 'code', type: 'required', message: '必填' },
  ];

  const onClickSendValidationCode = async () => {
    if (!/.+@.+/.test(formData.email)) {
      // Toast('邮箱地址不正确');
      return;
    }
    await getValidationCode({ email: formData.email }).catch(onError);
    console.log('1. getValidationCode');

    if (refValidationCode.current) refValidationCode.current.startCount();
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const res = await signIn(formData).catch(onError);
    localStorage.setItem('jwt', res.data.jwt);
    const returnTo = route.get('return_to');
    // meStore.refreshMe();
    nav(returnTo || '/start', { replace: true });
  };

  return (
    <MainLayout title="登录" icon="none">
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Icon className={styles.icon} name="logo" />
          <h1 className={styles.appName}>山竹记账</h1>
        </div>
        <Form formData={formData} rules={rules} onSubmit={onSubmit}>
          <FormItem label="邮箱地址" prop="email" placeholder="请输入邮箱，然后点击发送验证码" />
          <FormItem
            label="验证码"
            prop="code"
            placeholder="请输入六位数字"
            button={
              <TimerButton
                ref={refValidationCode}
                disabled={!formData.email}
                onClick={onClickSendValidationCode}
              />
            }
          />
          <FormItem style={{ paddingTop: '96px' }}>
            <Button type="submit" className={styles.btn}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </MainLayout>
  );
};
export default SignInPage;
