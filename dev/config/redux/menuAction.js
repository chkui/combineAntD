/**
 * 更新整个Menu的数据。
 * @param menuTree
 */
export const menuAction = (menus) => ({
    type: 'menuTreeData',
    menus: menus
})