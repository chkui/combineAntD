import {listService} from '../../src/service/listService'
import {StateCode} from './listReducer'

/**
 * 更新当前表单的结构（样式）数据
 * @param {object} stateCode 标记状态编码{@link stateCode}
 * @param {object|boolean} list 列表相关数据, false表示列表数据不存在
 * @param {number} list.total 返回在当前查询条件下行总数
 * @param {array}  list.docs 返回的行数据
 * @param {object} list.where 详见{@link listData}where的参数说明
 * @param {object} list.options 详见{@link listData}options的参数说明
 */
export const listDataAction = (stateCode, list = false) => ({
    type: 'combineListData',
    stateCode: stateCode,
    list: list
});

/**
 * 加载当前列表数据
 * where和options结构说明详见{@link listData}
 * @param {string} fsId
 * @param {string} fsType
 * @param {object} where 查询条件 详见{@link https://github.com/louischatriot/nedb}find部分说明
 * @param {object} options 排序分页扩增操作
 * @param {object} options.sort 指定排序字段，格式为{column: 'desc'或'asc'}
 * @param {number} options.curPage 当前在第几页
 * @param {number} options.size 单页的数据个数
 * @returns {function(*)}
 */
export const loadListDataAction = (fsId, fsType, where, options) => {
    return dispatch => {
        dispatch(listDataAction(StateCode.init));
        listService.find(fsId, fsType, where, options, (err, total, docs) => {
            if (err) {
                dispatch(listDataAction(StateCode.err));
            } else {
                dispatch(listDataAction(StateCode.suc, {
                    total,
                    docs: docs,
                    where: where,
                    options: options
                }));
            }
        })
    }
};

/**
 * 将表头搜索组件特定的数据帮顶到列表数据中。
 * @param {string} column 要绑定的列
 * @param {all} data 对应的数据，根据组件需要可以是任何结构
 */
export const combineListSearchDataAction = (column, data) => {
    console.log('action :', column, data);
    return {
        type: 'combineListSearchData',
        column,
        data
    }
};