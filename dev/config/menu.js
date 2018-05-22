const userDesk = [{
    column:'portals',
    label:'桌面',
    url:'/'
}];
const options = [{
    column:'options',
    label:'管理员功能',
    children:[
        {column:'siteConfig', label:'站点', url:'/site-config/list'},
        {column:'dtConfig', label:'数据字典', url:'/dt-config/list'}
    ]
}]


/**
 * 组装框架菜单
 * @param menuTree
 */
export const combineMenu = (menuTree) =>{

}