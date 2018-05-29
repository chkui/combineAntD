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
import {RegularItemMeta} from '../../config/sysDefConfig'
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
        const insertData = fluent(localStorage).then(store=>store.d_site).then(site=>JSON.parse(site)).else(site);
        db.d_site.insert(insertData, (err, newDoc) => {
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

/**
 * 默认排序字段
 * @type {{}}
 * @private
 */
const _defaultSort = {};
_defaultSort[RegularItemMeta.modifyTime] = -1;

/**
 *
 * @param tableName 查询表名称
 * @param where 查询条件 详见{@link https://github.com/louischatriot/nedb}find部分说明
 * @param options 排序分页扩增操作
 * @param options.sort 指定排序字段，格式为{column: -1或1}
 * @param options.curPage 当前在第几页
 * @param options.size 单页的数据个数
 * @param cb 回调 (err, docs)
 */
const query = (tableName, where, options, cb) => {
    const sort = options.sort || _defaultSort,
        skip = fluent(options.curPage).then(()=>options.size).then(()=>options.curPage * options.size).else(0),
        limit = options.size || 100; //如果不限制，最多返回100条数据

    fluent(db[tableName]).then(table => {
        asyncLoad(()=>table.find(where).sort(sort).skip(skip).limit(limit).exec(cb));
        return true;
    }).else(() => {
        cb(`table ${tableName} no exists`);
    })
};

/**
 * 计算总数 符合条件的查询总数
 * @param tableName 表名称
 * @param where 条件
 * @param cb 回调 (err, count)
 */
const count = (tableName, where, cb) => {
    fluent(db[tableName]).then(table => {
        asyncLoad(()=>table.count(where, cb));
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
    asyncLoad(()=>db[tableName].insert(rows, (err, doc)=>{
        db[tableName].find({}, (err, docs)=>{
            localStorage[tableName] = JSON.stringify(docs);
        })
        cb(err, doc);
    }));
}

export default {
    query,
    count,
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