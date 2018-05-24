import {oneForm} from '../../src/database/form'
import {StateCode} from './formReducer'

/**
 * 更新当前表单的结构（样式）数据
 * @param stateCode 标记状态编码{@link stateCode}
 * @param form
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