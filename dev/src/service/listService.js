import db from '../database/data'
import _Config from '../../config/sysDefConfig'
import {dataBindService} from './dataBindService'
import {fluent} from 'es-optional'

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

/**
 * 将进入列表的数据进行一次转换以符合列表的要求。
 * 1)将所有的id字段映射到key。
 * 2)处理固定字段'OP'，将ENABLE/DISABLE/DELETE映射到true/false/false。当出现非ENABLE/DISABLE/DELETE的字符串时，均映射为false。
 *
 * @param form 每一个表单项的属性
 * @param docs 数据列表
 */
ListService.prototype.bindData = function (form, docs) {
    return dataBindService.listData2Comp(form, docs);
};


/**
 *
 * @type {ListService}
 */
export const listService = new ListService();
export default ListService