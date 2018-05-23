/**
 *
 * @type {{type: string, bussId: string, columnMetaSet: *[]}}
 */
export const site = {
    //当前表单的数据绑定ID。
    // 1)在使用query时候，这个字段没用用处。
    // 2)在使用get、submit、delete时，这个字段用于标记当前操作的数据项
    dataBindId: '*',
    //表单所属业务类型，['flow'|'asset'|'static'] 流程表单|资产表单|固定表单。
    // 1)固定表单由开发人员预设的表单，具备特殊的功能，已经预先开发到前端系统中。包括数据字典、站点信息、人员、组织结构、权限、
    type: 'static',
    // 当前表单的标识字段
    column: 'site',
    // list用于标记该项的入口页面是否为一个列表。
    // 1)如果有列表，对应的列表页面为 /list/${column}
    // 2)如果没有列表，点击这个表单对应的菜单时，会直接使用/${column}来访问，不携带任何参数。
    list: {
        options: [
            'view', //可查看，点击具体项目之后会提供详情页面访问,跳转路径 /[assert|flow]/${column}/${当前数据的主键值}
            'new', //可列表新建
            'delete', //可列表删除
            'search' //可搜索
        ],
    },
    // 表单的项目字段名称
    //
    itemMetaSet: [
        {
            category: 'Input',
            type: 'Text',
            column: 'siteCode',
            label: '字段ID',
            pk: 1,
            readOnly: 0,
            listShow: 0,
        }, {
            category: 'Input',
            type: 'Text',
            column: 'siteCode',
            label: '站点编码(code)',
            listShow: 1,
            rules: [],
            tip: '可以使用一个常用的业务编码来标记站点信息，用于和其他系统进行呢数据合并'
        }, {
            category: 'Input',
            type: 'Text',
            column: 'siteName',
            label: '站点名称',
            rules: [{
                type: 'string', max: 64, message: '请用最多使用64个字符'
            }],
            tip: '输入公司、企业、组织的名称'
        }, {
            category: 'Input',
            type: 'Text',
            column: 'parentSiteCode',
            label: '上级站点',
            tip: '站点的从属关系，该站点从属与上级站点'
        }, {
            category: 'Switch',
            type: 'TFSwitch',
            column: 'OP',
            label: '启用&停用',
            tip: '设定该站点是否停止使用'
        }
    ],
    /**
     * 固定字符配置
     */
    regularMetaSet: {
        createUser: 'READ', //READ\EDIT
        createTime: 'READ',
        modifyUser: 'READ',
        modifyTime: 'READ',
        OP: 'EDIT'
    }
};