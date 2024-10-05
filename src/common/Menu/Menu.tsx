import { MenuItemsProps } from "../../routing/menuItems.ts";
import { useState } from "react";
import s from "../Header/Header.module.css";
import classNames from "classnames";

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
