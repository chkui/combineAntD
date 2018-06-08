import db from '../database/data'
import {iocService} from './iocService'
import {get} from '../request/net'
import {urlBuilder, decode} from '../../config/url'
import {fluent} from 'es-optional'

/**
 * 每一个item相关的处理service。
 *
 * @constructor
 */
function ItemService() {
}

/**
 * 根据Item的标记获取关联数据
 *      1)如果只传递fsId，会使用表label字段对应的所有数据。
 *      2)如果传递fsId, rowId，会直接使用该行的 label数据。
 *      3)如果传递的fsId，itemId，会使用所有itemid字段对应的数据。
 *      3)如果传递的fsId，rowId，itemId，会使用所有itemid字段对应的改行数据。
 * @param fsId 关联表单
 * @param rowId 关联行
 * @param itemId 关联列
 * @param cb 回调 (errInfo, [{fsId, rowId, itemId, value, children:[{}]}])
 *      children如果对象是一个树结，回放置在children结构中。
 */
ItemService.prototype.getAssociated = function (fsId, rowId, itemId, cb) {
    get(urlBuilder.formData.getAssociated({fsId,rowId,itemId}), result=>{
        if(0 === result.code){
            cb(null, decode(result.data))
        }else{
            cb(result.msg)
        }
    })
};


/**
 * 获取下拉菜单相关的构建数据
 * //TODO 目前只支持关联到表的主键-Label（pk），暂时不支持关联到具体字段
 * @param fsId 关联表单id
 * @param fsType 关联表单类型
 * @param fsFkIds 限定只关联某个会某几个数据
 * @param cb 处理回调
 */
ItemService.prototype.selectedOptions = function (fsId, rowId, itemId, cb) {
    const where = fluent(fsFkIds).then(list => list.map(i => ({id: i}))).then(list => ({$or: list})).else({});
    db.query(fsId, fsType, where, {}, (err, docs) => {
        if (!err) {
            cb(false, docs.map(doc => ({value: doc.id, label: doc.label})));
        } else {
            cb(err);
        }
    });
}

/**
 * {@link ItemService}
 */
export const itemService = iocService.addBean(ItemService);