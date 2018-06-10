import {crudSupport} from './crudSupport'
import {insertFormStructure} from './initSqlData'

const Column = 'id,ver,label,l_new,l_view,l_search,l_delete,op,createuser,createtime,modifyuser,modifytime,site'
const CountSql = 'SELECT COUNT(*) AS count FROM B_FORM_STRUCTURE WHERE 1 = 1';
const QuerySql = `SELECT ${Column} FROM B_FORM_STRUCTURE WHERE 1 = 1`
const GetLastSql = `SELECT ${Column} FROM B_FORM_STRUCTURE fs WHERE fs.id = ? AND fs.ver = (SELECT MAX(B.ver) FROM B_FORM_STRUCTURE B WHERE B.id = ?)`

export const insert = (id, ver, label, type, l_new, l_view, l_search, l_delete, callback) => {
}

/**
 * 通用单表条件查询
 * @param condition
 * @param sort
 * @param cb
 * @param tx
 */
export const queryFormStructure = (condition, sort, cb, tx) => {
    crudSupport.query(QuerySql, condition, false, (tx, result) => {
        cb(null, result.rows);
    }, (tx, err) => {
        console.error('Sql:', QuerySql, err);
        cb(err.message);
    })
}

/**
 * 根据id获取最新版的表单结构
 * @param fsid
 * @param cb (err ,resultSet)
 * @param tx
 */
export const getLastFormStructure = (fsid, cb, tx) => {
    crudSupport.exeQuery(GetLastSql, [fsid, fsid], (tx, result) => {
        cb(null, result.rows);
    }, (tx, err) => {
        console.error('Sql:', GetLastSql, err);
        cb(err.message);
    })
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
            0 === count && crudSupport.insertBatch('B_FORM_STRUCTURE', insertFormStructure, (err, result) => {
                !err && (console.log('init menu success!'))
            });
        }
    })
})();