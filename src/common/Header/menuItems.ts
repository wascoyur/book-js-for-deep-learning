export type MenuItemsProps={
    subMenu?:SubMenu[]
    rootMenuName:string;
}
type SubMenu={
    itemName:string;
    link:string;
    subMenu?:SubMenu
}

export const menuItems:MenuItemsProps[]= [
    {
        rootMenuName: "Tasks",
        subMenu: [
            { itemName: "Предикатор скорости", link:'predicator'},
            { itemName: "Подпункт 1-2", link: 'empty-item' },
        ],
    },
    { rootMenuName: "Menu 2" },
]
