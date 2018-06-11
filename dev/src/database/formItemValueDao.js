import {crudSupport} from './crudSupport'
import {QueryOpt} from "../../config/sysDefConfig";

const MainRowSql = 'SELECT [COLUMN] FROM B_ROW r'
const SubItemValueSql = 'SELECT FROM B_ROW_VALUE '

/**
 *
 * @param {array} viewItemList 表需要显示的所有行数据，列表中每一个item都是一个 B_FORM_ITEM的一行结果集数据。
 * @param {array} conditionList [{column, value, opts}] 查询字段\查询条件\查询操作:LIK|EQU，模糊匹配，精准匹配
 * @param {array} [conditionList] 查询条件
 * @param {string} [conditionList.itemId] 字段对应的id
 * @param {array} [conditionList.values] 要搜索的值，多个值之间是并列关系(OR)
 * @param {string} [conditionList.opts] 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {object} sortList 排序操作
 * @param {string} [sortList.column] 排序字段
 * @param {string} [sortList.flag] 排序字段，取值['ASC'|'DESC']：升序或降序。默认'ASC'
 * @param {object} pager 分页标识
 * @param {string} pager.curPage 当前页
 * @param {string} pager.size 单页数据个数
 * @param {function} callback 查询回调 (err)
 */
export const formItemValueResultQuery = (viewItemList, conditionList, sortList, pager, callback) => {
    let columnSql = '', conditionSql = '';
    const conditionIndex = [];
    //组装显示字段
    //
    for (let item of viewItemList) {
        columnSql += `(SELECT rv.value FROM B_ROW_VALUE rv WHERE rv.itemid = ? AND rv.rowid = r.id) AS '${item.column}',`;
        conditionIndex.push(item.id);
    }
    columnSql = columnSql.substr(0, columnSql.length - 1) + ' ';
    if (conditionList && 0 < conditionList.length) {
        for (let condition of conditionList) {
            conditionSql += 'AND (r.id IN (SELECT v.rowid FROM B_ROW_VALUE v WHERE 1 = 1';
            if (QueryOpt.LIK === condition.opts) {
                conditionSql += ` AND ${condition.itemId} LIKE ?`;
                conditionIndex.push(`%${i.value}%`);
            } else {
                let values = condition.values;
                !Array.isArray(values) && (values = [values]);
                for (let value of condition.values) {
                    conditionSql += ' OR (v.value = ? AND v.itemid = ?)';
                    conditionIndex.push(value);
                    conditionIndex.push(condition.itemId);
                }
            }
            conditionSql += ') ';
        }
    }
    crudSupport.exeQuery(`SELECT r.id AS id, ${columnSql} FROM B_ROW r WHERE 1 = 1 ${conditionSql}`,
        conditionIndex,
        (tx, result) => {
            callback(null, result);
        },
        (tx, error) => {
            callback(error.message);
        })
}
