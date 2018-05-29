import {listService} from '../../src/service/listService'
import {StateCode} from './listReducer'

/**
 * 更新当前表单的结构（样式）数据
 * @param stateCode 标记状态编码{@link stateCode}
 * @param list
 */
export const listDataAction = (stateCode, list) => ({
    type: 'listData',
    stateCode: stateCode,
    list: list
});

/**
 * 加载当前列表数据
 * @param {string} fsId
 * @param {string} fsType
 * @param {object} where 查询条件 详见{@link https://github.com/louischatriot/nedb}find部分说明
 * @param {object} options 排序分页扩增操作
 * @param {object} options.sort 指定排序字段，格式为{column: -1或1}
 * @param {number} options.curPage 当前在第几页
 * @param {number} options.size 单页的数据个数
 * @returns {function(*)}
 */
export const loadListDataAction = (fsId, fsType, where, options) => {
    return dispatch => {
        dispatch(listDataAction(StateCode.init));
        listService.find(fsId, fsType, where, options, (err, fromDocs) => {
            if (err) {
                dispatch(listDataAction(StateCode.err));
            } else {
                dispatch(listDataAction(StateCode.suc, fromDocs));
            }
        })
    }
};