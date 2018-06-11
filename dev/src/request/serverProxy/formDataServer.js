import {QueryOpt, SysFlag} from '../../../config/sysDefConfig'
import {queryFormItemValue} from '../../database/rowValueDao'
import {getLastFormStructure} from '../../database/formStructureDao'
import {resultToList} from './commonServer'
import {serialFuture} from "../../common/serialFuture";
import {queryFormItem} from "../../database/formItemDao";
import {formItemValueResultQuery} from '../../database/formItemValueDao'

/**
 *
 * @param params
 * @param params.fsId
 * @param params.rowId
 * @param params.itemId
 * @param callback
 */
export const getAssociated = (params, callback) => {
    const {fsId, rowId, itemId} = params;

    queryFormItemValue([{
        column:'rowid',
        value:rowId,
        opts:QueryOpt.EQU
    },{
        column:'itemid',
        value:itemId,
        opts:QueryOpt.EQU
    }], false, (err, resultSet) => {
        if(!err){
            const list = resultToList(resultSet).map(item=>{
                item.fsid = fsId;
                return item;
            });
            callback(null, list)
        }else{
            callback(err);
        }
    }, false);
}

/**
 * 根据搜索、排序、分页条件进行条件查询。查询分为以下三步。
 * 1)根据表单编号获取最新的表单结构。
 * 2)根据最新的表单结构和编号获取对应的item（字段）列表。
 * 3)使用各种条件组装查询语句
 * @param {object} params
 * @param {string} params.fsId 表单
 * @param {array} [params.cond] 查询条件
 * @param {string} params.cond.itemId 字段对应的id
 * @param {string} params.cond.value 要搜索的值
 * @param {string} params.cond.opts 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {object} [params.sort] 排序操作
 * @param {string} params.sort.column 排序字段
 * @param {string} params.sort.flag 排序字段，取值['ASC'|'DESC']：升序或降序。默认'ASC'
 * @param {object} params.page 分页标识
 * @param {string} params.page.curPage 当前页
 * @param {string} params.page.size 单页数据个数
 * @param {function} callback (err, result)
 *      result.rows 分页对应的行
 *      result.total 分页对应的数据量总数
 */
export const listQuery = (params, callback) =>{
    serialFuture().then({
        form: (result, cb) => {
            getLastFormStructure(params.fsId, cb)
        }
    }).then({
        items: (result, cb) => {
            const row = result.form[0];
            queryFormItem([{
                column: 'fsid',
                value: row.id,
                opts: QueryOpt.EQU
            }, {
                column: 'fsver',
                value: row.ver,
                opts: QueryOpt.EQU
            }], false, cb)
        }
    }).then({
        query:(result, cb)=>{
            const items = result.items, viewList = [];
            for(let item of items){
                if(SysFlag.ENABLE === item.l_show){
                    viewList.push(item);
                }
            }
            formItemValueResultQuery(viewList, [], [], {} ,(err, result)=>{
                callback(err, resultToList(result.rows))
            });
            console.log(result)
        }
    })
}