import {iocService} from './iocService'
import {get} from '../request/net'
import {urlBuilder, decode} from '../../config/url'
import {MenuLinkType} from '../../config/sysDefConfig'
import {routes} from '../../config/url'

function MenuService() {
}

/**
 * 构建菜单
 * @param {function} cb (List(menus)=>{
 *   menus.id
 *   menus.label
 *   menus.parent
 *   menus.type
 *   menus.url
 *   menus.column
 *   menus.sort
 * })
 * {@link menuData}
 *
 * //返回的是一个 immutable/List对象。
 */
MenuService.prototype.build = function (cb) {
    get(urlBuilder.menu.getAll(), (result) => {
        if (0 === result.code) {
            const ret = decode(result.data), menus = [], residue = [], keys = Object.keys(ret);
            for (let doc of ret) {
                if (doc.parent) {
                    residue.push(transDb2Comp(doc));
                } else {
                    menus.push(transDb2Comp(doc));
                }
            }
            for (let node of menus) {
                iterMenu(node, residue)
            }
            cb(menus);
        }
    })
};

//---------------------------------------------------------
//用于build的私有方法
/**
 * 多层构建菜单的迭代器
 * @param node
 * @param residue
 */
const iterMenu = (node, residue) => {
    const id = node.id;
    node.children = [];
    let index = 0;
    while (index < residue.length) {
        const item = residue[index];
        if (id === item.parent) {
            node.children.push(item);
            residue.splice(index, 1);
            iterMenu(item, residue);
        } else {
            ++index;
        }
    }
};

/**
 * 将单行数据从数据库的结构转换为组件应用的结构
 * @param item
 */
const transDb2Comp = (item) => {
    const url = MenuLinkType.FORM === item.link_type ?
        routes.list.build(item.link_url) : item.link_url;
    return {
        id: item.id,
        label: item.label,
        parent: item.parent,
        type: item.link_type,
        url: url,
        column: item.column,
        sort: item.sort
    }
}
//---------------------------------------------------------

//---------------------------------------------------------
MenuService.prototype.add = function (menu, cb) {

}
/**
 * {@link ListService}
 */
export const menuService = iocService.addBean(MenuService);