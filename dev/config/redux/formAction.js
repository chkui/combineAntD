import {oneForm} from '../../src/database/form'
import {fromJS} from 'immutable'
import {StateCode} from './formReducer'

/**
 * 更新当前表单的结构（样式）数据
 * @param stateCode 标记状态编码{@link stateCode}
 * @param form 切记修改form的任何数据都要新建一个对象。
 */
export const formStructureAction = (stateCode, form) => ({
    type: 'formStructure',
    stateCode: stateCode,
    form: form
});

/**
 * 加载当前表单的结构数据
 * @param formId 表单ID
 * @returns {function(*)}
 */
export const loadFormStructureAction = (formId) => {
    return dispatch => {
        dispatch(formStructureAction(StateCode.init));
        oneForm(formId, (err, form) => {
            if (err) {
                dispatch(formStructureAction(StateCode.err));
            } else {
                dispatch(formStructureAction(StateCode.suc, form));
            }
        })
    }
};

/**
 * 向表单结构标表中合并数据
 * @param column
 * @param key
 * @param value
 */
export const combineFormMetaSetAction = (column, key, value) => {
    return {
        type: 'combineFormItemSet',
        column: column,
        key: key,
        value: value
    }
}