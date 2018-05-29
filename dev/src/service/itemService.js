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
 * //TODO 目前只支持关联到表的主键-Label（pk），暂时不支持关联到具体字段
 * @param fsId 关联表单id
 * @param fsType 关联表单类型
 * @param fsFkIds 限定只关联某个会某几个数据
 * @param cb 处理回调
 */
ItemService.prototype.selectedOptions = function (fsId, fsType, fsFkIds, cb) {
    const where = fluent(fsFkIds).then(list => list.map(i => ({id: i}))).then(list => ({$or: list})).else({});
    db.query(fsId, fsType, where, {}, (err, docs) => {
        if (!err) {
            cb(false, docs.map(doc => ({value: doc.id, label: doc.label})));
        } else {
            cb(err);
        }
    });
}

export const itemService = new ItemService();
export default ItemService