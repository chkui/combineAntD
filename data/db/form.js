import {ListOption} from '../../dev/config/sysDefConfig'

export const form = [
    {
        //表单对应的ID
        id: 'static_d_site',
        //资产项id，当菜单对应的是一个单页面时，这一项的数据为单一的资产项数据，
        data: '',
        //版本信息
        //用表单创建时候的时间戳表示版本号
        ver: 1527147766581,
        //表单标题名称
        label: '站点配置',
        //表单所属业务类型，['flow'|'asset'|'static'] 流程表单|资产表单|固定表单。
        // 1)'static'固定表单由开发人员预设的表单，具备特殊的功能，已经预先开发到前端系统中。包括数据字典、站点信息、人员、组织结构、权限。
        // 2)当是固定表单'static'时，对应的CRUD操作都必须独立编写，colum与方法必须一一对应。
        type: 'static',
        // list用于标记该项的入口页面是否为一个列表。
        // 1)如果有列表，对应的列表页面为 /list/${column}
        // 2)如果没有列表，点击这个表单对应的菜单时，会直接使用/${column}来访问，不携带任何参数。
        list: {
            options: [
                ListOption.VIEW, //可查看，点击具体项目之后会提供详情页面访问,跳转路径 /[assert|flow]/${column}/${当前数据的主键值}
                ListOption.NEW, //可列表新建
                ListOption.DELETE, //可列表删除
                ListOption.SEARCH //可搜索
            ],
        },
        // 表单的项目字段名称
        itemMeta: [
            {
                category: 'Input', //组件分类
                type: 'PK', //组件类型
                column: 'id', //字段标记，标记对应的字段
                label: 'ID', //字段现实的名字
                listShow: 0, //列表现实标记，标记在列表上是否可以显示
                /**
                 * 可搜索标记。
                 * 搜索标记如果是有一个有效标记（非[0,false,null,undefined]则会启用搜索功能。
                 * 搜索标记如果是一个对象，则会按照{@link searchs}的结构进行加载，对象目标不存在则使用默认组件
                 */
                search: 0,
                sort: 0 //可排序标记
            }, {
                category: 'Input',
                type: 'Text',
                column: 'code',
                label: '站点编码(code)',
                listShow: 1,
                rules: [{category: 'single', type: 'require', options: {msg: '请输入站点编码'}},
                    {
                        category: 'single',
                        type: 'unIdentical',
                        options: {formId: 'static_d_site', formType: 'static', column: 'code'}
                    }
                ], //提交过滤规则
                tip: '可以使用一个常用的业务编码来标记站点信息，用于和其他系统进行呢数据合并', //tip表示提示信息
                search: {category:'Input',type:'Text'},
                sort: 1
            }, {
                category: 'Input',
                type: 'Text',
                column: 'label',
                label: '站点名称',
                rules: [{category: 'single', type: 'require', options: {msg: '请输入站点名称'}},
                    {category: 'single', type: 'max', options: {len: 32}}
                ],
                tip: '输入公司、企业、组织的名称',
                listShow: 1,
                search: 1,
                sort: 1
            }, {
                category: 'Input',
                type: 'Text',
                column: 'shortLabel',
                label: '站点简称',
                rules: [
                    {category: 'single', type: 'require', options: {msg: '请输入站点简称'}},
                    {category: 'single', type: 'max', options: {len: 6, msg: '简称最多使用6个字符'}}
                ],
                tip: '输入公司、企业、组织的简称',
                listShow: 1,
                search: 1,
                sort: 1
            }, {
                category: 'Select',
                type: 'Standard',
                column: 'fkParent',
                label: '上级站点',
                tip: '站点的从属关系，该站点从属与上级站点',
                // fk表示外关联表单、字段以及数据项数据
                // 关联数据可以是标准的站点数据、数据字典、人员、权限、资产项、流程项。
                // 通常情况下数据项关联只关联主键，所以column不必填写
                fk: {
                    fsId: 'static_d_site', //关联表单
                    fsType: 'static', //关联表单类型
                    column: false, //TODO 保留字段：通常情况下外键数据项只关联主键，所以column暂时不启用
                    ids: false //[]，可以进行多项数据关联，如果关联字段不存在或为空，则全表关联
                },
                // 各种选择框的的操作属性。
                select: {
                    empty: 1, //是否支持空选项
                },
                //下拉操作项目，通常由大前端根据fk字段进行组装（node，browser）
                //也可以直接预设为固定结构，如果有预设，不会装载数据
                selectOptions: 0,
                listShow: 1,
                search: 1,
                sort: 1
            }, {
                category: 'Switch',
                type: 'TFSwitch',
                column: 'OP',
                label: '启用&停用',
                tip: '设定该站点是否停止使用',
                listShow: 1,
                search: 0,
                sort: 0
            }
        ],
        /**
         * 固定字符配置
         */
        regularItemMeta: {
            createUser: 'READ', //READ\EDIT
            createTime: 'READ',
            modifyUser: 'READ',
            modifyTime: 'READ',
            OP: 'EDIT'
        },
        createTime: 1527040262519, //表单创建时间
        createUser: 'admin', //表单创建人
        modifyTIme: 1527040262519, //表单修改时间
        modifyUser: 'admin', //表单修改人
        OP: 'ENABLE', //ENABLE,DISABLE,DELETE
    }, {
        id: '1a4d65685e4e11e8bfd8b1edbfd13392',
        data: '',
        type: 'asset',
        label: '表单案例',
        itemMeta: [ //描述字段-名称-组件-长度限定，{}
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
                rules: [{
                    type: 'string', max: 3, message: '姓名不能超过3个字符'
                }],
            }, {
                category: 'Input',
                type: 'Text',
                column: 'secondName',
                label: '名',
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
                        }, {
                            value: 'baiyun',
                            label: '白云',
                        }, {
                            value: 'yuexiu',
                            label: '越秀',
                        }],
                    }, {
                        value: 'shenzhen',
                        label: '深圳',
                        children: [{
                            value: 'futian',
                            label: '福田',
                        }, {
                            value: 'baoan',
                            label: '保安',
                        }, {
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
            }, {
                category: 'Switch',
                type: 'TFSwitch',
                column: 'OP',
                label: '启用&停用',
                tip: '设定该站点是否停止使用'
            },
        ],
        regularMetaSet: {
            createUser: 'READ', //READ\EDIT
            createTime: 'READ',
            modifyUser: 'READ',
            modifyTime: 'READ',
            OP: 'EDIT'
        },
        createTime: 1527040262519,
        createUser: 'admin',
        modifyTIme: 1527040262519,
        modifyUser: 'admin',
        OP: 'ENABLE', //ENABLE,DISABLE,DELETE
    }, {
        id: 'abcd65685e4e11e8bfd8b1edbfd13392',
        type: 'asset',
        label: '列表案例',
        list: {
            options: ['view', 'new', 'delete', 'search'],
        },
        itemMeta: [
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
                rules: [{
                    type: 'string', max: 3, message: '姓名不能超过3个字符'
                }],
            }, {
                category: 'Input',
                type: 'Text',
                column: 'secondName',
                label: '名',
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
                        }, {
                            value: 'baiyun',
                            label: '白云',
                        }, {
                            value: 'yuexiu',
                            label: '越秀',
                        }],
                    }, {
                        value: 'shenzhen',
                        label: '深圳',
                        children: [{
                            value: 'futian',
                            label: '福田',
                        }, {
                            value: 'baoan',
                            label: '保安',
                        }, {
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
            }, {
                category: 'Switch',
                type: 'TFSwitch',
                column: 'OP',
                label: '启用&停用',
                tip: '设定该站点是否停止使用'
            },
        ],
        regularMetaSet: {
            createUser: 'READ', //READ\EDIT
            createTime: 'READ',
            modifyUser: 'READ',
            modifyTime: 'READ',
            OP: 'EDIT'
        },
        createTime: 1527040262519,
        createUser: 'admin',
        modifyTIme: 1527040262519,
        modifyUser: 'admin',
        OP: 'ENABLE', //ENABLE,DISABLE,DELETE
    }
]