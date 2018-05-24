import db from '../database/data'

function ListService() {}

/**
 * 搜索数据
 * @param {string} formId
 * @param {string} formType
 * @param {object} options 查询操作
 * @param {number} options.length 单页显示查询的项目个数
 * @param {number} options.start 当前页面查询开始位置
 * @param {array} options.column 查询字段及其对应的数值[{label:'', value:''}]
 * @param {function} cb (err, docs, total, start, end) 查询成功的回调
 *     err 错误信息
 *     docs返回的文档
 *     total 数据总量
 *     start 查询结果的开始位置
 *     end 查询结果的结束位置
 */
ListService.prototype.find = function(formId, formType, options, cb){
    db.query(formId, formType, options.column, cb);
}

export const listService = new ListService();
export default ListService