import menuConfig from '../../config/menu'
import {iocService} from './iocService'
import {List} from 'immutable'
import {allMenu} from '../database/menu'
import {oneFormStructure} from '../database/form'

function MenuService() {
}

/**
 * 构建菜单
 * @param {function} cb (List(menus)) //返回的是一个 immutable/List对象。
 */
MenuService.prototype.build = function (cb) {
    allMenu((err, docs) => {
        if (!err) {
            combineFormData(docs, (combineResults)=>{
                const cusMenu = buildDB(combineResults),
                    menus = List(menuConfig.before.concat(cusMenu, menuConfig.after))
                cb(menus);
            })
        }
    })
};
const combineFormData = (docs, callback) => {
    const result = [], optsList = [];
    let count = 0;
    for (let doc of docs) {
        if(doc.form){
            const opts = {
                id:doc.form,
                cb:(err, form)=>{
                    if(!err){
                        doc.list = form.list;
                        doc.label = form.label;
                        count--;
                        if(0 === count){
                            callback(result);
                        }
                    }
                }
            }
            optsList.push(opts);
        }
        result.push(doc);
    }
    for(let opts of optsList){
        oneFormStructure(opts.id, opts.cb);
        count++;
    }
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
    menu.list && (i.list = menu.list);
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
/**
 * {@link ListService}
 */
export const menuService = iocService.addBean(MenuService);