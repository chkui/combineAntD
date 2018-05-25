import db from '../database/data'
import {fluent} from 'es-optional'

function ItemService() {
}

/**
 * 获取下拉菜单相关的构建数据
 * @param formid
 * @param formType
 * @param ids
 * @param cb
 */
ItemService.prototype.selectedOptions = function (formid, formType, ids, cb) {
    const options = fluent(ids).then(list => list.map(i => ({id: i}))).then(list => ({$or: list})).else({});
    db.query(formid, formType, options, cb);
}

export const itemService = new ItemService();
export default ItemService