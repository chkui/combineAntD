import {query} from '../database/data'

/**
 *
 * @constructor
 */
function RulerCollectService() {

}

/**
 * 检查在指定的表和字段中是否有相同的数据存在，会排除空格
 * @param formId
 * @param formType
 * @param column
 * @param value
 * @param cb (true|false)
 */
RulerCollectService.prototype.checkTableSameValueExists = function (formId, formType, column, value, cb) {
    const ops = {};
    ops[column] = value;
    query(formId, formType, ops, (err, docs)=>{
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