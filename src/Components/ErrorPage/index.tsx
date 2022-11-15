import { FC } from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: FC = () => {
  const error: any = useRouteError();

  return (
    <div id="error-page">
      <h1>哎哟！</h1>
      <p>不好意思，出现一个错误</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
export default ErrorPage;
