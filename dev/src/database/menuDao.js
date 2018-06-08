import {crudSupport} from './crudSupport'
import {SysFlag, QueryOpt} from '../../config/sysDefConfig'
import {insertMenu} from './initSqlData'
const CountSql = 'SELECT COUNT(*) AS count FROM B_MENU WHERE 1 = 1';
const QuerySql = 'SELECT id,label,code,parent,link_type,link_url,op,sort,createuser,createtime,modifyuser,modifytime FROM B_MENU WHERE 1 = 1'

/**
 * 添加一行菜单数据
 * @param id
 * @param label
 * @param column
 * @param parent
 * @param type
 * @param url
 * @param op
 * @param user
 * @param callback
 * @param tx
 */
export const insert = (id, label, column, parent, type, url, op, user, callback, tx) =>{
    crudSupport.insertOne('B_MENU', {
        id,
        label,
        column,
        parent,
        type,
        url,
        op
    },callback)
}

/**
 * 根据查询条件获取总数
 * @param {array} condition [{column, value, opts}] 查询字段\查询条件\查询操作:LIK|EQU，模糊匹配，精准匹配
 * @param {string} condition.column 要查询的字段
 * @param {string} condition.value 要查询的值
 * @param {string} condition.opts 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {function} cb (err, count)
 * @param {object} tx 事物对象
 */
export const getCount = (condition, cb, tx) => {
    crudSupport.query(CountSql, condition, false, (tx, result) => {
        cb(null, result.rows[0].count);
    }, (tx, err) => {
        console.error('Sql:', sql, err);
        cb(err.message);
    })
}
/**
 * 根据查询条件获取结果集
 * @param {array} condition [{column, value, opts}] 查询字段\查询条件\查询操作:LIK|EQU，模糊匹配，精准匹配
 * @param {string} condition.column 要查询的字段
 * @param {string} condition.value 要查询的值
 * @param {string} condition.opts 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {array|boolean} sort 排序参数。
 * @param {string} [sort.column] 排序字段
 * @param {string} [sort.flag] 排序字段，取值['ASC'|'DESC']：升序或降序。默认'ASC'
 * @param {function} cb (err, resultSet)
 * @param {object} tx 事物对象
 */
export const getResultSet = (condition, sort, cb, tx) => {
    crudSupport.query(QuerySql, condition, false, (tx, result) => {
        cb(null, result.rows);
    }, (tx, err) => {
        console.error('Sql:', QuerySql, err);
        cb(err.message);
    })
}

(() => {
    getCount([], (err, count) => {
        if (!err) {
            0 === count && crudSupport.insertBatch('B_MENU', insertMenu, (err, result)=>{
                !err && (console.log('init menu success!'))
            });
        }
    })
})();

