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
        build: (form) => `/list/${form}`,
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