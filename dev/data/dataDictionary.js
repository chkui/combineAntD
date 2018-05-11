/**
 * 全局通用数据字典。
 * 1)数据字典可以是全站通用，也可以是仅仅与站点相关。全站通用用特殊的站点标识来标记，比如‘siteAll’。
 * 2)全站管理员可以配置全站以及站点数据字典，站点管理员仅仅可以配置站点数据字典。
 * @type {{}}
 */
export const dataType = {
    sex: {
        code: 'sex',
        type: 'array',
        name: '性别',
        data: [{
            type: 'string',
            code: 'male',
            data: '男性'
        }, {
            type: 'string',
            code: 'female',
            data: '女性'
        }, {
            type: 'string',
            code: 'other',
            data: '未知'
        }]
    }
}