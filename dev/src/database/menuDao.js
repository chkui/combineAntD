import {idGenerator} from "./idgenerator"
import {mySqlSupport} from './mySqlSupport'
import {SysFlag, QueryOpt} from '../../config/sysDefConfig'
import {insertMenu} from './initSql'

const InsertOneMenuSql = 'INSERT INTO B_MENU(id,label,column,parent,link_type,link_url,op,createuser,createtime,modifyuser,modifytime)' +
    'VALUES(?,?,?,?,?,?,?,?,?,?,?)';

const CountSql = 'SELECT COUNT(*) AS count FROM B_MENU WHERE 1 = 1';


const QuerySql = 'SELECT id,label,column,parent,link_type,link_url,op,createuser,createtime,modifyuser,modifytime FROM B_MENU WHERE 1 = 1';

/**
 *
 * @param id
 * @param label
 * @param column
 * @param parent
 * @param type
 * @param url
 * @param op
 * @param user
 * @param cb (err, record)
 */
export const insertOneMenu = (id, label, column, parent, type, url, op, user, cb) => {
    if(!id && 'string' !== typeof id) {
        idGenerator(genId=>{
            insertOneMenuWithId(genId, label, column, parent, type, url, op, user, cb);
        })
    }else{
        insertOneMenuWithId(id, label, column, parent, type, url, op, user, cb);
    }
};

const insertOneMenuWithId = (id, label, column, parent, type, url, op, user, cb) => {
    !op && (op = SysFlag.ENABLE);
    const timestamp = new Date().getTime(),
        params = [id, label, column, parent, type, url, op, user, timestamp, user, timestamp];
    mySqlSupport.executeSql(InsertOneMenuSql, params, (tx, record) => {
        cb(null, record);
    }, (tx, err) => {
        console.log(err);
        cb(err.message);
    })
}

/**
 * 批量添加数据
 * @param {array} list 结构见 {@link insertOneMenu}
 */
export const insertBatchMenu = (list) => {
    const foo = (tx, id, label, column, parent, type, url, op, user) => {
        const timestamp = new Date().getTime(),
            params = [id, label, column, parent, type, url, op, user, timestamp, user, timestamp];
        tx.executeSql(InsertOneMenuSql, params, null, (tx, err) => {
            console.error(err);
        })

    };
    mySqlSupport.transaction(tx => {
        for (let params of list) {
            foo(tx, params.id, params.label, params.column, params.parent, params.type, params.link, SysFlag.ENABLE, 'admin')
        }
    })
};

/**
 * 根据查询条件获取总数
 * @param {array} condition [{column, value, opts}] 查询字段\查询条件\查询操作:LIK|EQU，模糊匹配，精准匹配
 * @param {string} condition.column 要查询的字段
 * @param {string} condition.value 要查询的值
 * @param {string} condition.opts 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {function} cb (err, count)
 */
export const getCount = (condition, cb) => {
    query(CountSql, condition,(tx, result) => {
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
 * @param {function} cb (err, resultSet)
 */
export const getResultSet = (condition, cb) => {
    query(QuerySql, condition,(tx, result) => {
        cb(null, result.rows);
    }, (tx, err) => {
        console.error('Sql:', sql, err);
        cb(err.message);
    })
}

/**
 *
 * @param {string} sql:[in] 基本SQL，包含整个SQL语句
 * @param {array} condition 查询条件
 * @param {string} condition.column 要查询的字段
 * @param {string} condition.value 要查询的值
 * @param {string} condition.opts 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {function} sucCb:[in] 成功回掉，(tx, resultSet){@link mySqlSupport}
 * @param {function} errCb:[in] 错误回掉，(tx, errObject){@link mySqlSupport}
 */
const query = (sql, condition, sucCb, errCb) =>{
    let where = '', cond = [];
    for (let i of condition || []) {
        if (QueryOpt.LIK === i.opts) {
            where += ` AND ${i.column} LIKE ?`;
            cond.push(`%${i.value}%`);
        } else {
            where += ` AND ${i.column} = ?`;
            cond.push(i.value);
        }
    }
    const exeSql = sql + where;
    mySqlSupport.executeSql(exeSql, cond, sucCb, errCb);
}

(() => {
    getCount([], (err, count) => {
        if (!err) {
            0 === count && insertBatchMenu(insertMenu);
        }
    })
})();

