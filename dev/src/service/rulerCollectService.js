import {query} from '../database/data'

/**
 *
 * @constructor
 */
function RulerCollectService() {

}

/**
 * 检查在指定的表和字段中是否有相同的数据存在，会排除空格
 * @param fsId
 * @param fsType
 * @param column
 * @param value
 * @param cb (true|false)
 */
RulerCollectService.prototype.checkTableSameValueExists = function (fsId, fsType, column, value, cb) {
    const where = {};
    where[column] = value;
    query(fsId, fsType, where, {}, (err, docs)=>{
        if(!err){
            cb(docs.length)
        }
    })
}

/**
 *
 * @type {RulerCollectService}
 */
export const rulerCollectService = new RulerCollectService();
export default RulerCollectService