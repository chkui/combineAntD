import {iocService} from './iocService'
import {List} from 'immutable'
import {get} from '../request/net'
import {urlBuilder} from '../../config/url'

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
 * })
 *
 * //返回的是一个 immutable/List对象。
 */
MenuService.prototype.build = function (cb) {
    get(urlBuilder.menu.getAll(), (err, resultSet) => {
        if (!err) {
            const menus = [], residue = [];
            for (let doc of resultSet) {
                if(doc.parent){
                    residue.push(transDb2Comp(doc));
                }else{
                    menus.push(transDb2Comp(doc));
                }
            }
            for(let node of menus){
                iterMenu(node, residue)
            }
            cb(List(menus));
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
    for(let index = 0; index < residue.length; index++){
        const item = residue[index];
        if(id === item.parent){
            node.children.push(item);
            iterMenu(item, residue.splice(index, 1))
        }
    }
};

/**
 * 将单行数据从数据库的结构转换为组件应用的结构
 * @param item
 */
const transDb2Comp = (item)=>({
    id:item.id,
    label:item.label,
    parent:item.parent,
    type:item.link_type,
    url:item.link_url,
    column:item.column
})
//---------------------------------------------------------

//---------------------------------------------------------
MenuService.prototype.add = function (menu, cb) {

}
/**
 * {@link ListService}
 */
export const menuService = iocService.addBean(MenuService);