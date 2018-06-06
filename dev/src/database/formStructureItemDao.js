import {crudSupport} from './crudSupport'
import {insertFormStructure} from './initSql'

const CountSql = 'SELECT COUNT(*) AS count FROM B_FORM_ITEM_STRUCTURE WHERE 1 = 1';

export const insert = (id, label, column, parent, type, url, op, user, callback) =>{
    crudSupport.insertOne('B_FORM_ITEM_STRUCTURE', {
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

(() => {
    getCount([], (err, count) => {
        if (!err) {
            0 === count && crudSupport.insertBatch('B_FORM_STRUCTURE', insertFormStructure, (err, result)=>{
                !err && (console.log('init menu success!'))
            });
        }
    })
})();