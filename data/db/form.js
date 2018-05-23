export const form = [
    {
        id: '1a4d65685e4e11e8bfd8b1edbfd13392',
        type: 'asset',
        list: {
            options: ['view', 'new', 'delete', 'search'],
        },
        itemMetaSet: [ //描述字段-名称-组件-长度限定，{}
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
        }
    }
]