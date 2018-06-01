import {idGenerator} from "./idgenerator"
import {mySqlSupport} from './mySqlSupport'
import {SysFlag, QueryOpt} from '../../config/sysDefConfig'
import {insertMenu} from './initSql'

const InsertOneMenuSql = 'INSERT INTO B_MENU(ID,LABEL,COLUMN,PARENT,LINK_TYPE,LINK_URL,OP,CREATEUSER,CREATETIME,MODIFYUSER,MODIFYTIME)' +
    'VALUES(?,?,?,?,?,?,?,?,?,?,?)';

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
    !op && (op = SysFlag.ENABLE);
    const timestamp = new Date().getTime(),
        params = [id, label, column, parent, type, url, op, user, timestamp, user, timestamp];
    mySqlSupport.executeSql(InsertOneMenuSql, params, (tx, record) => {
        cb(null, record);
    }, (tx, err) => {
        console.log(err);
        cb(err.message);
    })
};

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

const CountSql = 'SELECT COUNT(*) AS count FROM B_MENU WHERE 1 = 1'

/**
 * 根据查询条件获取总数
 * @param {array} query [{column, value, opts}] 查询字段\查询条件\查询操作:LIK|EQU，模糊匹配，精准匹配
 * @param {string} query.column 要查询的字段
 * @param {string} query.value 要查询的值
 * @param {string} query.opts 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {function} cb (err, count)
 */
export const getCount = (query, cb) => {
    let where = '', cond = [];
    for (let i of query || []) {
        if (QueryOpt.LIK === i.opts) {
            where += ` AND ${i.column} LIKE ?`
            cond.push(`%${i.value}%`);
        } else {
            where += ` AND ${i.column} = ?`
            cond.push(i.value);
        }
    }
    const sql = CountSql + where;
    mySqlSupport.executeSql(CountSql + where, cond, (tx, result) => {
        cb(null, result.rows[0].count);
    }, (tx, err) => {
        console.error('Sql:', sql, err);
        cb(err.message);
    })
}

(() => {
    getCount([{column: 'label', value: '桌', opts: QueryOpt.LIK}], (err, count) => {
        if (!err) {
            0 > count && insertBatchMenu(insertMenu);
        }
    })
})();

