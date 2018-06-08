import {iocService} from '../service/iocService'
import {initCreateTableSql, initDropTableSql} from './initSqlTabel'
import {serialFuture} from '../common/serialFuture'

/**
 * 模拟实现MySql数据库的操作功能。
 * 1)该功能仅用于开发原型时模拟MySql的各项功能，不能用于任何实际生产
 * @constructor
 */
function MySqlSupport() {
    if (!openDatabase) {
        console.error('Current browser not support HTML5 Database!')
    }
    this.db = openDatabase('Palmgee', '1.0', 'PalmGee Database', 5 * 1024 * 1024);
    this.init();
}

MySqlSupport.prototype.init = function () {
    this.db.transaction((tx) => {
        const insert = ()=>{
            for (let sql of initCreateTableSql) {
                tx.executeSql(sql, [], () => {
                }, (t, e) => {
                    console.error('SQL ERROR:', sql, '!Error info:', e.message)
                    cb(e.message)
                })
            }
        }
        insert();
        let count = 0;
        const len = initDropTableSql.length;
        /*for (let sql of initDropTableSql){
            tx.executeSql(sql, [], () => {
                if(++count ===len){
                    insert()
                }
            }, (t, e) => {
                console.error('SQL ERROR:', sql, '!Error info:', e.message)
                cb(e.message)
            })
        }*/
    })
}

/**
 * 执行一条添加或修改语句，会开启事物
 * @param sql sql语句
 * @param params 参数列表
 * @param sucCb 成功回调 {@link https://www.w3.org/TR/webdatabase/#dom-sqltransaction-executesql}
 * @param errCb 失败回调 {@link https://www.w3.org/TR/webdatabase/#dom-sqltransaction-executesql}
 */
MySqlSupport.prototype.executeSql = function (sql, params, sucCb, errCb) {
    this.db.transaction((tx) => {
        tx.executeSql(sql, params, sucCb, errCb)
    })
}

MySqlSupport.prototype.executeQuery = function (sql, params, sucCb, errCb) {
    this.db.readTransaction((tx) => {
        tx.executeSql(sql, params, sucCb, errCb)
    })
}

/**
 *
 * @param cb (tx)=>{tx.executeSql()}
 */
MySqlSupport.prototype.queryTransaction = function (cb) {
    this.db.readTransaction(cb)
}

/**
 *
 * @param cb (tx)=>{tx.executeSql()}
 */
MySqlSupport.prototype.transaction = function (cb) {
    this.db.transaction(cb)
}

/**
 * {@link MySqlSupport}
 */
export const mySqlSupport = iocService.addBean(MySqlSupport);