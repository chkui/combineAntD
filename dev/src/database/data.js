/*
 用于数据CRUD的接口，所有的数据都必须通过这个接口来进行CRUD操作，针对表单的类型['flow'|'asset'|'static']对应的表也有错差异
 */
import db from './db'

/**
 * 多数据查询方法
 * @param formId 表单ID
 * @param formType 表单类型 [flow,asset,static]
 * @param options {@link https://github.com/louischatriot/nedb}
 * @param cb (err, docs)
 */
export const query = (formId, formType, options, cb) => {
    if ('static' === formType) {
        staticCrud[formId].query(formId, formType, options, cb)
    }
}

const staticCrud = {
    'static_d_site': {
        query: (formId, formType, options, cb) => {
            db.query('d_site', options, cb);
        }
    }
}

export default {
    query
}