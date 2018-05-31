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
 * @param {object} state 详见{@link StateCode} 说明
 * @param {object} action 详见{@link listDataAction}、{@link combineListSearchDataAction} 参数说明
 * @returns {*}
 */
export const listDataReducer = (state = {stateCode: StateCode.init, search: false, list: false}, action) => {
    switch (action.type) {
        case 'combineListData':
            return {
                stateCode: action.stateCode,
                search: state.search,
                list: action.list
            }
        case 'combineListSearchData':
            const search = state.search || {};
            search[action.column] = action.data;
            return {
                stateCode: state.stateCode,
                search: search,
                list: state.list
            };
        default:
            return state;
    }
}