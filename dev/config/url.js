import {FormStructureState} from './sysDefConfig'

/**
 * 全局url配置
 * @type {{list: {match: string, params: {form: string}, build: (function(*): string)}, form: {match: string, params: {state: string, form: string, data: string}, build: (function(*, *, *): string), buildNew: (function(*, *): string), buildView: (function(*, *): string), buildEdit: (function(*, *): string)}}}
 */
export const routes = {
    list: {
        match: '/list/:form',
        params: {
            form: 'form'
        },
        build: formId => `/list/${formId}`,
    },
    form: {
        match: '/form/:state/:form/:data',
        params: {
            state: 'state', //new|edit|view
            form: 'form',
            data: 'data'
        },
        build: (state, form, data) => `/form/${state}/${form}/${data}`,
        buildNew: (form) => `/form/${FormStructureState.new}/${form}/get`,
        buildView: (form, data) => `/form/${FormStructureState.view}/${form}/${data}`,
        buildEdit: (form, data) => `/form/${FormStructureState.edit}/${form}/${data}`
    }
}

export const urlBase = {
    menu:{
        module:'/api/menu',
        options:{
            getAll:'/getAllMenu'
        }
    },
    formStructure:{
        module:'/api/formStructure',
        options:{
            getOneById:'/getOne'
        }
    }
}
export const encode = text => encodeURI(JSON.stringify(text));

export const decode = code => JSON.parse(decodeURI(code));

const none = encodeURI(JSON.stringify('none'));

/**
 * url命名暂定 '/api/模块[menu|site|formStrut]/操作[allMenu|list]等/传递参数[encodeURI(JSON.stringify(json))]'
 *      或 '/api/模块/子模块/传递参数[encodeURI(JSON.stringify(json))]'
 * @type {{menu: {getAll: (function(*=): string)}, formStructure: {getOneById: (function(*): string)}}}
 */
export const urlBuilder = {
    menu:{
        getAll:(params)=>`${urlBase.menu.module}${urlBase.menu.options.getAll}/${params || none}`
    },
    formStructure:{
        getOneById:(id)=>`${urlBase.formStructure.module}${urlBase.formStructure.options.getOneById}/${encode(id)}`
    }
}
