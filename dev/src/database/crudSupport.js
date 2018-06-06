import {iocService} from '../service/iocService'
import {mySqlSupport} from './mySqlSupport'
import * as UUID from 'uuidjs'
import {SysFlag, QueryOpt} from '../../config/sysDefConfig'

function CrudSupport() {
}

/**
 *
 * @param {string} table insert的表名。
 * @param {object} params 参数。一个字段对应一条数据，例如{id:'aaaa',label:'label'}
 * @param {function} callback (err, result) ,err为非时表示没有错误
 * @param {object} transaction 事物对象
 */
CrudSupport.prototype.insertOne = function (table, params, callback, transaction) {
    params = preInsertParams(params);
    const keys = Object.keys(params);
    let column = '', index = '', cond = [];
    for (let key of keys) {
        column += `${key},`;
        index += '?,';
        cond.push(params[key]);
    }
    const sql = `INSERT INTO ${table}(${column.substring(0, column.length)})VALUES(${index.substring(0, index.length)})`,
        support = transaction ? transaction : mySqlSupport;
    support.executeSql(sql, cond, (tx, result) => {
        callback(null, result);
    }, (tx, err) => {
        callback(err.message);
    });
};

/**
 * 批量添加数据
 * @param table
 * @param paramsList 参数列表，多个字段对应数据。例如[{id:'aaaa',label:'label'}]
 * @param {function} callback (err, result) ,err为非时表示没有错误
 */
CrudSupport.prototype.insertBatch = function (table, paramsList, callback) {
    if (paramsList && 0 < paramsList.length) {
        const params = preInsertParams(paramsList[0]);
        preInsertParams(params);
        const keys = Object.keys(params);
        let column = '', index = '', cond = [];
        for (let key of keys) {
            column += `${key},`;
            index += '?,';
        }
        const sql = `INSERT INTO ${table}(${column.substring(0, column.length - 1)})VALUES(${index.substring(0, index.length - 1)})`;
        mySqlSupport.transaction(tx => {
            for (let params of paramsList) {
                const cond = [];
                params = preInsertParams(params);
                for (let key of keys) {
                    cond.push(params[key])
                }
                tx.executeSql(sql, cond, (tx, result) => {

                }, (tx, err) => {
                    console.error(err)
                    callback(err.message);
                })
            }
        })
    } else {
        callback('参数列表不存在或数据为空!')
    }
};

/**
 * 预处理insert的参数
 * @param params
 * @return {*}
 */
function preInsertParams(params) {
    !params.id && (params.id = UUID.genV1().hexNoDelim);
    !params.createuser && (params.createuser = 'admin');
    !params.modifyuser && (params.modifyuser = 'admin');
    !params.createtime && (params.createtime = new Date().getTime());
    !params.modifytime && (params.modifytime = new Date().getTime());
    !params.op && (params.op = SysFlag.ENABLE);
    !params.site && (params.site = 'ALL');
    return params;
}

//----------------------------------------------------------------------------------


CrudSupport.prototype.update = function () {

};

CrudSupport.prototype.delete = function () {

}

/**
 * 通用查询接口
 * @param {string} sql:[in] 数据集的SQL语句，包含整个SQL语句
 * @param {array|boolean} condition 查询条件
 * @param {string} condition.column 要查询的字段
 * @param {string} condition.value 要查询的值
 * @param {string} condition.opts 查询操作:LIK|EQU，模糊匹配，精准匹配 {@link QueryOpt}
 * @param {array|boolean} sort 排序参数。
 * @param {string} [sort.column] 排序字段
 * @param {string} [sort.flag] 排序字段，取值['ASC'|'DESC']：升序或降序。默认'ASC'
 * @param {function} sucCb:[in] 成功回掉，(tx, resultSet){@link mySqlSupport}
 * @param {function} errCb:[in] 错误回掉，(tx, errObject){@link mySqlSupport}
 * @param {object} transaction 事物对象
 */
CrudSupport.prototype.query = function (sql, condition, sort, sucCb, errCb, transaction) {
    let where = '', cond = [];
    if(condition && 0 < condition.length){
        for (let i of condition) {
            if (QueryOpt.LIK === i.opts) {
                where += ` AND ${i.column} LIKE ?`;
                cond.push(`%${i.value}%`);
            } else {
                where += ` AND ${i.column} = ?`;
                cond.push(i.value);
            }
        }
    }
    if (sort && 0 < sort.length) {
        where += ' ORDER BY ';
        let column, flag;
        for (let s of sort) {
            column = s.column;
            flag = s.flag;
            column && (where += `${column} ${flag ? flag.toUpperCase() : 'ASC'}`);
        }
    }
    const exeSql = sql + where,
        support = transaction ? transaction : mySqlSupport;
    support.executeSql(exeSql, cond, sucCb, errCb);
};

CrudSupport.prototype.pageQuery = function () {

};
/**
 * {@link MySqlSupport}
 */
export const crudSupport = iocService.addBean(CrudSupport);