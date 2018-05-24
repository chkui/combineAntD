import {listService} from '../../src/service/listService'
import {StateCode} from './listReducer'

/**
 * 更新当前表单的结构（样式）数据
 * @param stateCode 标记状态编码{@link stateCode}
 * @param form
 */
export const listDataAction = (stateCode, list) => ({
    type: 'listData',
    stateCode: stateCode,
    list: list
});

/**
 * 加载当前列表数据
 * @param {string} formId
 * @param {string} formType
 * @param {object} options 查询操作
 * @param {number} options.length 单页显示查询的项目个数
 * @param {number} options.start 当前页面查询开始位置
 * @param {array} options.column 查询字段及其对应的数值[{label:'', value:''}]
 * @returns {function(*)}
 */
export const loadListDataAction = (formId, formType, options) => {
    return dispatch => {
        dispatch(listDataAction(StateCode.init));
        listService.find(formId, formType, options, (err, docs) => {
            if (err) {
                dispatch(listDataAction(StateCode.err));
            } else {
                dispatch(listDataAction(StateCode.suc, docs));
            }
        })
    }
};