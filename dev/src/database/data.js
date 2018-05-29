/*
 用于数据CRUD的接口，所有的数据都必须通过这个接口来进行CRUD操作，针对表单的类型['flow'|'asset'|'static']对应的表也有错差异
 */
import db from './db'
import {FormStructureType} from '../../config/sysDefConfig'

/**
 * 多数据查询方法
 * @param fsId 表单ID
 * @param fsType 表单类型 [flow,asset,static]
 * @param where 查询条件 详见{@link https://github.com/louischatriot/nedb}find部分说明
 * @param options
 * @param options.sort 指定排序字段，格式为{column: -1或1}
 * @param options.start 指定查询返回开始位置
 * @param options.end 指定查询返回结束位置
 * @param cb (err, docs)
 */
export const query = (fsId, fsType, where, options, cb) => {
    if (FormStructureType.static === fsType) {
        staticCrud[fsId].query(fsId, fsType, where, options, cb)
    }
}

/**
 * 支持数据集总数递归的查询。也支持分页
 * @param fsId
 * @param fsType
 * @param where 查询条件 详见{@link https://github.com/louischatriot/nedb}find部分说明
 * @param options 排序分页扩增操作
 * @param options.sort 指定排序字段，格式为{column: -1或1}
 * @param options.curPage 当前在第几页
 * @param options.size 单页的数据个数
 * @param cb (err, {
 *      total:总个数
 * })
 */
export const listQuery = (fsId, fsType, where, options, cb) => {
    let table = false;
    if (FormStructureType.static === fsType) {
        table = staticCrud[fsId]
    }
    table.count(fsId, fsType, where, (err, count)=>{
        if(err){
            cb(err);
        }else{
            table.query(fsId, fsType, where, options, (err, docs)=>{
                if(err){
                    cb(err);
                }else{
                    cb(null, {
                        total: count,
                        docs: docs,
                        where: where,
                        options: options
                    });
                }
            })
        }
    })
}

/**
 * 想数据表添加数据
 * @param fsId
 * @param fsType
 * @param rows
 * @param cb
 */
export const add = (fsId, fsType, rows, cb) => {
    if (FormStructureType.static === fsType) {
        staticCrud[fsId].insert(fsId, fsType, rows, cb);
    }
}

/**
 *
 * @type {{static_d_site: {query: (function(*, *, *=, *=)), insert: (function(*, *, *=, *=))}}}
 */
const staticCrud = {
    'static_d_site': {
        query: (formId, formType, where, options, cb) => {
            db.query('d_site', where, options, cb);
        },
        count:(formId, formType, where, cb) => {
            db.count('d_site', where, cb);
        },
        insert: (fsId, fsType, rows, cb) => {
            db.insert('d_site', rows, cb);
        }
    }
}

export default {
    query,
    listQuery,
    add
}