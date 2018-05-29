export const StateCode = {
    init: {
        code: 'init',
        msg: '列表数据加载中...'
    },
    suc: {
        code: 'suc',
        msg: '列表数据加载完成！'
    },
    err: {
        code: 'err',
        msg: '列表数据加载错误，请联系管理员！'
    }
}

/**
 *
 * @param state 状态
 * @param action
 * @param {string} action.type 'listData'
 * @param {object} action.list 列表信息
 * @param {number} action.list.total 数据量总数
 * @param {number} action.list.start 数据在全体结果集的开始位置
 * @param {number} action.list.end 数据在全体结果集的结束位置
 * @param {array} action.list.docs 单页数据
 * @param {object} action.list.sort 排序字段
 * @returns {*}
 */
export const listDataReducer = (state = {stateCode: StateCode.init, list: false}, action) => {
    switch (action.type) {
        case 'listData':
            return {
                stateCode: action.stateCode,
                list: action.list
            }
        default:
            return state;
    }
}