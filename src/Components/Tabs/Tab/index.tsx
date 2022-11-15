import { FC, ReactNode } from "react";

interface TabProps {
  id: string;
  name: string;
  onClick: Function;
  children?: ReactNode;
}
const Tab: FC<TabProps> = (props) => {
  return <div onClick={props?.onClick?.()}>{props.children}</div>;
};

export default Tab;