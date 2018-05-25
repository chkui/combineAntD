/**
 * 全局url配置
 * @type {{list: {match: string, params: {form: string}, build: (function(*): string)}, formView: {match: string, params: {form: string, data: string}, build: (function(*, *): string)}, formNew: {match: string, params: {form: string, data: string}, build: (function(*): string)}, formEdit: {match: string, params: {form: string}, build: (function(*, *): string)}}}
 */
export const routes = {
    list:{
        match:'/list/:form',
        params:{
            form:'form'
        },
        build:(form) =>`/list/${form}`,
    },
    formView:{
        match:'/form/view/:form/:data',
        params:{
            form:'form',
            data:'data'
        },
        build:(form, data) =>`/form/view/${form}/${data}`
    },
    formNew:{
        match:'/form/new/:form',
        params:{
            form:'form',
            data:'data'
        },
        build:(form) =>`/form/new/${form}`
    },
    formEdit:{
        match:'/form/edit/:form/:data',
        params:{
            form:'form'
        },
        build:(form, data) =>`/form/edit/${form}/${data}`
    }
}