import { FC, ReactElement, ReactNode } from 'react';
import { IconName } from '../Icon';
import NavBar from '@/pages/NavBar';
import { Outlet } from 'react-router-dom';
interface MainLayoutProps {
  title: string;
  icon: IconName;
  children: ReactElement;
}
export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div>
      <NavBar title={props.title} icon={props.icon} />
      {props.children}
      <Outlet />
    </div>
  );
};

export default MainLayout;
