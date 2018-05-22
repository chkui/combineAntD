/**
 *
 * @type {{type: string, bussId: string, columnMetaSet: *[]}}
 */
export const site = {
    //表单所属业务类型，['flow'|'asset'|'static'] 流程表单|资产表单|固定表单。
    // 1)固定表单由开发人员预设的表单，具备特殊的功能，已经预先开发到前端系统中。
    type: 'asset',
    // 当前表单的标识字段
    column: 'optionsSiteConfig',
    // list用于标记该项的入口页面是否为一个列表。
    // 1)如果有列表，对应的列表页面为 /list/${column}
    // 2)如果没有列表，点击这个表单对应的菜单时，会直接使用/${column}来访问，不携带任何参数。
    list: {
        options:[
            'view', //可查看，点击具体项目之后会提供详情页面访问,跳转路径 /[assert|flow]/${column}/${当前数据的主键值}
            'new', //可列表新建
            'delete', //可列表删除
            'search' //可搜索
        ],
    },
    options: {
        query:'', //列表查询接口，如果有列表，必须组装这个选项
        get:'', //单项数据获取接口
        submit:'' //数据提交接口
    },
    // 表单的项目字段名称
    //
    itemMetaSet: [
        {
            category: 'Input',
            type: 'Text',
            column: 'siteCode',
            label: '站点编码(code)',
            listShow: 1,
            rules: [],
        }, {
            category: 'Input',
            type: 'Text',
            column: 'siteName',
            label: '站点名称',
            rules: [{
                type:'string', max: 64, message: '请用最多使用64个字符'
            }],
        }, {
            category: 'Input',
            type: 'Text',
            column: 'parentSiteCode',
            label: '上级站点',
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