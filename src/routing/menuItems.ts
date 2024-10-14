export type MenuItemsProps = {
  subMenu?: SubMenu[];
  rootMenuName: string;
};
type SubMenu = {
  itemName: string;
  link: string;
  subMenu?: SubMenu;
};

export const menuItems: MenuItemsProps[] = [
  {
    rootMenuName: "Tasks",
    subMenu: [
      { itemName: "2.1. Предикатор скорости", link: "predicator" },
      {
        itemName: "2.3. Множественная линейная регрессия",
        link: "multiple-linear-regression",
      },
    ],
  },
  { rootMenuName: "Menu 2" },
];
