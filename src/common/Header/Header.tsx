import s from "./Header.module.css";
import { useState } from "react";
import classNames from "classnames";
import { MenuItemsProps } from "./menuItems.ts";

type HeaderProps = {
  items: MenuItemsProps[];
  logo?: React.ReactNode;
};

// Компонент Header, который принимает массив пунктов меню
export const Header = (props: HeaderProps) => {
  const { items, logo } = props;
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

export const RootMenuItem = (props: MenuItemsProps) => {
  const { rootMenuName, subMenu } = props;
  const [menuIsActive, setMenuIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setMenuIsActive(!menuIsActive);
  };

  return (
    <div className={classNames(s.item)} onClick={handleClick}>
      <div className={s.rootMenuName}>{rootMenuName}</div>
      {menuIsActive && subMenu && (
        <ul className={classNames(s.subMenu, menuIsActive && s.active)}>
          {subMenu.map((subItem) => (
            <li key={subItem.itemName}>
              <MenuItem
                key={subItem.itemName}
                itemName={subItem.itemName}
                link={subItem.link}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

type NestedMenuProps = {
  itemName: string;
  link: string;
};

function MenuItem(props: NestedMenuProps) {
  const { itemName, link } = props;
  return (
    <a href={link} className={s.subMenu}>
      {itemName}
    </a>
  );
}
