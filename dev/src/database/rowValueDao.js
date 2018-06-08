import {crudSupport} from './crudSupport'
import {insertRowValue} from './initSqlData'

const Column = 'id,parent,rowid,itemid,itemtype,type,f_fsid,f_rowid,f_itemid,f_valueid,value,op,createuser,createtime,modifyuser,modifytime,site';
const CountSql = 'SELECT COUNT(*) AS count FROM B_ROW_VALUE WHERE 1 = 1';
const QuerySql = `SELECT ${Column} FROM B_ROW_VALUE WHERE 1 = 1`;

/**
 * 通用查询接口
 * @param {array|boolean} condition 查询条件
 * @param {string} condition.column 要查询的字段
 * @param {string} condition.value 要查询的值
 * @param {string} condition.opts 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {array|boolean} sort 排序参数。
 * @param {string} [sort.column] 排序字段
 * @param {string} [sort.flag] 排序字段，取值['ASC'|'DESC']：升序或降序。默认'ASC'
 * @param {function} cb:[in] ，(err, resultSet){@link mySqlSupport}
 * @param {object} tx 事物对象
 */
export const queryFormItemValue = (condition, sort, cb, tx) => {
    crudSupport.query(QuerySql, condition, false, (tx, result) => {
        cb(null, result.rows);
    }, (tx, err) => {
        console.error('Sql:', QuerySql, err);
        cb(err.message);
    })
};

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
        console.error('Sql:', CountSql, err);
        cb(err.message);
    })
}

(() => {
    getCount([], (err, count) => {
        if (!err) {
            0 === count && crudSupport.insertBatch('B_ROW_VALUE', insertRowValue, (err, result)=>{
                !err && (console.log('init menu success!'))
            });
        }
    })
})();