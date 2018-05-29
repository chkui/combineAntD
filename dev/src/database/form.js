/*
表单查询接口，用于对表单的结构数据进行CRUD操作
 */
import db from './db'

/**
 * 根据ID获取单个表单
 * @param fsId 要查询的表单ID
 * @param cb 查询回调
 */
export const oneFormStructure = (fsId, cb) => {
    db.one('d_form', {OP: 'ENABLE', id: fsId}, cb);
}

export const queryForm = (fsId, cb) => {

}

export const addOneForm = (fsId, fsType, formDoc) => {

}

export const modifyForm = (menu) => {

}

export const deleteForm = (menu) => {

}