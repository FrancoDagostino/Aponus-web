import { FC } from "react";
import "./styles/layoutStyle.css";
import SideMenuComponent from "../sideMenu/SideMenu.component";
import ContainerCard from "../ContainerCard";

interface ILayoutComponentProps {
  children?: JSX.Element;
}

const LayoutComponent: FC<ILayoutComponentProps> = (props) => {
  return (
    <>
      <SideMenuComponent />
      <main className="mainContent">
        <ContainerCard>
          {props.children}
        </ContainerCard>
      </main>
    </>
  );
};

export default LayoutComponent;
