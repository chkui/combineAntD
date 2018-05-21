import {category} from './component'

/**
 * 表单配置信息表，
 * 页面表单布局采用横向转换4-2-1布局（思考是否需要贪心算法步进位置），组件根据需要会占据4到1格的位置
 * @type {{type: string, column: *[]}}
 */

/**
 *
 * @type {{type: string, bussId: string, columnMetaSet: *[]}}
 */
export const oneForm = {
    type: 'flow', //表单所属业务类型，['flow'|'asset'] 流程表单|资产表单
    bussId: '123456',//所属业务关键主键，标识该表单对应的业务或流程
    columnMetaSet: [ //描述字段-名称-组件-长度限定，{}
        {
            category: 'Input',
            type: 'Email',
            column: 'email',
            label: '电子邮件',
            rules: [],
        }, {
            category: 'Input',
            type: 'Text',
            column: 'firstName',
            label: '姓',
            rules: [],
        }, {
            category: 'Input',
            type: 'Text',
            column: 'secondName',
            label: '名',
            rules: [],
        }, {
            category: 'Select',
            type: 'Standard',
            column: 'sex',
            label: '性别',
            options: [{value: 'male', label: '男'}, {value: 'female', label: '女'}],
            rules: [],
        }, {
            category: 'Select',
            type: 'Cascader',
            column: 'address',
            label: '住址',
            options: [{
                value: 'guangdong',
                label: '广东',
                children: [{
                    value: 'guangzhou',
                    label: '广州',
                    children: [{
                        value: 'tianhe',
                        label: '天河',
                    },{
                        value: 'baiyun',
                        label: '白云',
                    },{
                        value: 'yuexiu',
                        label: '越秀',
                    }],
                },{
                    value: 'shenzhen',
                    label: '深圳',
                    children: [{
                        value: 'futian',
                        label: '福田',
                    },{
                        value: 'baoan',
                        label: '保安',
                    },{
                        value: 'nanshan',
                        label: '南山',
                    }],
                }],
            }, {
                value: 'jiangsu',
                label: '江苏',
                children: [{
                    value: 'nanjing',
                    label: '南京',
                    children: [{
                        value: 'zhonghuamen',
                        label: '中华门',
                    }],
                }],
            }],
            rules: [],
        }
    ]
}

/**
 * 表单中一个栏目项的配置说明。组件的目标是只控制功能，不控制样式。
 * @type {{label: string, isRequire: boolean}}
 */
const ItemDefine = {
    column: '', //等效于Item组件的ID
    label: '', //标题
    isRequire: false, //对于表单来说是否为必填
    emptyInfo: '', //当输入内容为空时需要显示的内容
    errorInfo: '', //当输入内容错误时需要显示的内容
    type: '', //组件类型['textInput'|]
    validates: [],//按照验证顺序进行当前字段的表单验证
}