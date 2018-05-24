/**
 * 数据库中有几个必填字段：
 * id:主键
 * label:标题
 * createTime: 1527040262519, 创建时间
 * createUser: 'admin', 创建人
 * modifyTIme: 1527040262519, 修改时间
 * modifyUser: 'admin', 修改人
 * OP: 'ENABLE', //ENABLE,DISABLE,DELETE 操作标记[启用,停用,删除]
 */

import BrowserEmDataBase from 'nedb'
import {fluent} from 'es-optional'
import {site} from '../../../data/db/site'
import {menu} from '../../../data/db/menu'
import {form} from '../../../data/db/form'
import {log} from '../common/log'

const _asyncLoadList = [],
    asyncLoad = (cb) => {
        if (_siteInit && _menuInit && _formInit) {
            cb();
        }else{
            _asyncLoadList.push(cb);
        }
    },
    asyncExecute = ()=>{
        if (_siteInit && _menuInit && _formInit){
            for(let cb of _asyncLoadList){
                cb();
            }
        }
    };
let _siteInit = false,
    _menuInit = false,
    _formInit = false;

/**
 * 前端内存数据库。
 * 1)结构为 db.[table].[object] 数据库.表.标内容。
 * @type {{d_site: (*|Datastore), d_menu: (*|Datastore)}}
 */
const db = {
    d_site: new BrowserEmDataBase(),
    d_menu: new BrowserEmDataBase(),
    d_form: new BrowserEmDataBase()
};
db.d_site.loadDatabase((err) => {
    if (!err) {
        db.d_site.insert(site, (err, newDoc) => {
            _siteInit = true;
            asyncExecute();
            log('init site data: ');
            log(newDoc);
        })
    }
});
db.d_menu.loadDatabase((err) => {
    if (!err) {
        db.d_menu.insert(menu, (err, newDoc) => {
            _menuInit = true;
            asyncExecute();
            log('init menu data: ');
            log(newDoc);
        })
    }
});
db.d_form.loadDatabase((err) => {
    if (!err) {
        db.d_form.insert(form, (err, newDoc) => {
            _formInit = true;
            asyncExecute();
            log('init form data: ');
            log(newDoc);
        })
    }
});

//查询方法
const query = (tableName, options, cb) => {
    fluent(db[tableName]).then(table => {
        asyncLoad(()=>table.find(options, cb));
        return true;
    }).else(() => {
        cb(`table ${tableName} no exists`);
    })
};

//只获取查询的一条数据
const one = (tableName, options, cb) => {
    fluent(db[tableName]).then(table => {
        asyncLoad(()=>table.findOne(options, cb));
        return true;
    }).else(() => {
        cb(`table ${tableName} no exists`);
    })
};

//添加
const insert = (tableName, rows, cb) => {
    if(!db[tableName]){
        const table = db[tableName] = new BrowserEmDataBase();
        table.loadDatabase(err=>{
            if(err){
                cb(err);
            }else{
                table.insert(rows, cb)
            }
        })
    }
    asyncLoad(()=>db[tableName].insert(rows, cb));
}

export default {
    query,
    one,
    insert
};

/**
 * 唯一与后端交互的接口。
 * 1)前端可以作为一个独立的"站点运行"，一切交互过程通过表单，权限、菜单展开。
 * 2)前端之关注权限关联的展示以及操作，所有的提交和查询接口后端都必须做一次权限验证。验证结果需要能够在固定化数据中告知前端。
 * 3)
 * @constructor
 */
function DataBase() {

}

DataBase.prototype.get = function (form) {

};

DataBase.prototype.query = function (form) {

};

DataBase.prototype.submit = function (form) {

};

DataBase.prototype.delete = function (form) {

};

function DaraBaseStatic() {

}