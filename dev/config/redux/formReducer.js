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

export const formStructureReducer = (state = {stateCode: StateCode.init, formStructure: false}, action) => {
    switch (action.type) {
        case 'formStructure':
            return {
                stateCode: action.stateCode,
                formStructure: action.formStructure
            }
        case 'combineFormItemSet':
            const formStructure = Object.assign({}, state.formStructure),
                metas = formStructure.itemMeta;
            for(let pos = 1; pos < metas.length; pos++){
                if(metas[pos].column === action.column){
                    metas[pos][action.key] = action.value;
                }
            }
            return {
                stateCode: state.stateCode,
                formStructure: formStructure
            };
        default:
            return state;
    }
}