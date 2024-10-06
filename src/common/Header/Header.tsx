import s from "./Header.module.css";
import { useState } from "react";
import classNames from "classnames";
import { menuItems, MenuItemsProps } from "../../routing/menuItems.ts";
import { RootMenuItem } from "../Menu/Menu.tsx";
import { Logo } from "../Logo/Logo.tsx";

type HeaderProps = {
  items?: MenuItemsProps[];
  logo?: React.ReactNode;
};

// Компонент Header, который принимает массив пунктов меню
export const Header = (props: HeaderProps) => {
  const { items = menuItems, logo = <Logo /> } = props;
  const [showMobileHeader, setShowMobileHeader] = useState<boolean>(false);
  const clickHandler = () => {
    setShowMobileHeader(!showMobileHeader);
  };

  const rootMenus = items.map((menuItem) => (
    <div className={s.rootMenu} key={menuItem.rootMenuName}>
      <RootMenuItem
        rootMenuName={menuItem.rootMenuName}
        subMenu={menuItem.subMenu}
      />
    </div>
  ));

  return (
    <div
      className={classNames(s.root, showMobileHeader && s.active)}
      onClick={clickHandler}
    >
      {logo && logo}
      {rootMenus}
    </div>
  );
};
