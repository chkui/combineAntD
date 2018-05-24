/*
表单查询接口，用于对表单的结构数据进行CRUD操作
 */
import db from './db'

/**
 * 根据ID获取单个表单
 * @param formId
 * @param cb
 */
export const oneForm = (formId, cb) => {
    db.one('d_form', {OP: 'ENABLE', id: formId}, cb);
}

export const queryForm = (formId, cb) => {

}

export const addForm = (menu) => {

}

export const modifyForm = (menu) => {

}

export const deleteForm = (menu) => {

}