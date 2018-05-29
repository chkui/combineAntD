import db from '../database/data'
import {dataBindService} from './dataBindService'
import {fluent} from 'es-optional'

function ListService() {}

/**
 * 搜索数据
 * @param {string} fsId
 * @param {string} fsType
 * @param {object} where 查询条件 详见{@link https://github.com/louischatriot/nedb}find部分说明
 * @param {object} options 排序分页扩增操作
 * @param {object} options.sort 指定排序字段，格式为{column: -1或1}
 * @param {number} options.curPage 当前在第几页
 * @param {number} options.size 单页的数据个数
 * @param {function} cb (err, docs, total, start, end) 查询成功的回调
 *     err 错误信息
 *     docs返回的文档
 *     total 数据总量
 *     start 查询结果的开始位置
 *     end 查询结果的结束位置
 */
ListService.prototype.find = function(fsId, fsType, where, options, cb){
    db.listQuery(fsId, fsType, where, options, cb);
}

/**
 * 将进入列表的数据进行一次转换以符合列表的要求。
 * 1)将所有的id字段映射到key。
 * 2)处理固定字段'OP'，将ENABLE/DISABLE/DELETE映射到true/false/false。当出现非ENABLE/DISABLE/DELETE的字符串时，均映射为false。
 *
 * @param formStructure 每一个表单项的属性
 * @param formDocs 数据列表
 */
ListService.prototype.bindData = function (formStructure, formDocs) {
    return dataBindService.listData2Comp(formStructure, formDocs);
};


/**
 *
 * @type {ListService}
 */
export const listService = new ListService();
export default ListService