import db from '../database/data'
import {fluent} from 'es-optional'

/**
 * 每一个item相关的处理service。
 *
 * @constructor
 */
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
    db.query(formid, formType, options, (err, docs) => {
        if(!err){
            cb(false, docs.map(doc => ({value: doc.id, label: doc.label})));
        }else{
            cb(err);
        }
    });
}

export const itemService = new ItemService();
export default ItemService