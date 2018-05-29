import {oneFormStructure} from '../../src/database/form'
import {StateCode} from './formReducer'

/**
 * 更新当前表单的结构（样式）数据
 * @param stateCode 标记状态编码{@link stateCode}
 * @param formStructure 切记修改form的任何数据都要新建一个对象。
 */
export const formStructureAction = (stateCode, formStructure) => ({
    type: 'formStructure',
    stateCode: stateCode,
    formStructure: formStructure
});

/**
 * 加载当前表单的结构数据
 * @param formId 表单ID
 * @returns {function(*)}
 */
export const loadFormStructureAction = (formId) => {
    return dispatch => {
        dispatch(formStructureAction(StateCode.init));
        oneFormStructure(formId, (err, formStructure) => {
            if (err) {
                dispatch(formStructureAction(StateCode.err));
            } else {
                dispatch(formStructureAction(StateCode.suc, formStructure));
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