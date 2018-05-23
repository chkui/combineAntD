import menuConfig from '../../config/menu'
import {List} from 'immutable'
import {allMenu} from '../database/menu'

function MenuService() {
}

export default MenuService

/**
 * 构建菜单
 * @param {function} cb (List(menus)) //返回的是一个 immutable/List对象。
 */
MenuService.prototype.build = function (cb) {
    allMenu((err, docs) => {
        if (!err) {
            const cusMenu = buildDB(docs),
                menus = List(menuConfig.before.concat(cusMenu, menuConfig.after))
            cb(menus);
        }
    })
};
/**
 * 构建自定义菜单
 * 1) 输入是一个一维列表
 * 2) 输出为一个层级关系
 *      [{code, label, children:[]}]
 */
const buildDB = function (docs) {
    const menus = [], surplus = [];
    for (let menu of docs) {
        if (menu.parent) {
            surplus.push(menu);
        } else {
            menus.push(buildDBOne(menu));
        }
    }
    buildDBIter(menus, surplus);
    return menus;
};
/**
 * 构建单个菜单
 * @param menu
 */
const buildDBOne = menu => {
    const i = {id: menu.id, label: menu.label};
    menu.url && (i.url = menu.url);
    menu.form && (i.form = menu.form);
    menu.code && (i.code = menu.code);
    return i;
}
/**
 * 构建菜单的迭代器
 * @param menus
 * @param surplus
 */
const buildDBIter = (menus, surplus) => {
    for (let menu of menus) {
        if (!menu.form && !menu.url) {
            const id = menu.id;
            menu.children = [];
            for (let pos = 0; pos < surplus.length; pos++) {
                const item = surplus[pos];
                if (id === item.parent) {
                    menu.children.push(buildDBOne(item))
                    surplus.splice(pos, 1);
                    buildDB(menu.children, surplus);
                }
            }
        }
    }
};

//---------------------------------------------------------
MenuService.prototype.add = function (menu, cb) {

}