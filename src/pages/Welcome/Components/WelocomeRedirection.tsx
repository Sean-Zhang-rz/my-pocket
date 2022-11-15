import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const WelcomeRedirection: FC = () => {
  const hasRead = localStorage.getItem('skipFeature') === 'yes';
  return <>{hasRead ? <Navigate to="/start" /> : <Outlet />}</>;
};

export default WelcomeRedirection;
