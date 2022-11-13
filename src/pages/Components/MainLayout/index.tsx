import { FC } from 'react';

interface MainLayoutProps {
  title: string;
  icon: string;
}
export const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div>
      <NavBar title={props.title} icon={props.icon} />
      {/* {props.children} */}
    </div>
  );
};

export default MainLayout;
