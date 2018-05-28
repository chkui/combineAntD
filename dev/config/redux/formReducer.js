export const StateCode = {
    init: {
        code: 'init',
        msg: '表单样式加载中...'
    },
    suc: {
        code: 'suc',
        msg: '表单样式加载完成！'
    },
    err: {
        code: 'err',
        msg: '表单样式加载错误，请联系管理员！'
    }
}

export const formStructureReducer = (state = {stateCode: StateCode.init, form: false}, action) => {
    switch (action.type) {
        case 'formStructure':
            return {
                stateCode: action.stateCode,
                form: action.form
            }
        case 'combineFormItemSet':
            const form = Object.assign({}, state.form),
                metas = form.itemMetaSet;
            for(let pos = 1; pos < metas.length; pos++){
                if(metas[pos].column === action.column){
                    metas[pos][action.key] = action.value;
                }
            }
            return {
                stateCode: state.stateCode,
                form: form
            };
        default:
            return state;
    }
}