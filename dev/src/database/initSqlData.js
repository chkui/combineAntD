import {MenuLinkType, SysFlag, FormItemType, FormRegularItemOptions} from '../../config/sysDefConfig'

/**
 * 添加基本数据
 * @type {[null]}
 */
export const insertMenu = [{
    id: 'ca9ff02b5e6411e89b17a388ea92ae70',
    label: '桌面',
    code: 'portals',
    parent: '',
    link_type: MenuLinkType.LINK,
    link_url: '/',
    sort: 0
}, {
    id: '488789365e6511e88ce87fae8ccec962',
    label: '管理员功能',
    code: 'options',
    parent: '',
    link_type: MenuLinkType.GROUP,
    sort: 10
}, {
    id: '631bbc395e6511e8bec9c3e1038a5664',
    label: '数据字典',
    code: 'DDConfig',
    parent: '488789365e6511e88ce87fae8ccec962',
    link_type: MenuLinkType.FORM,
    link_url: 'static_form_dd_2018_6_6_14_52',
    sort: 20
}, {
    id: 'e67a2fdc696911e897e3652a66429879',
    label: '导航菜单配置',
    code: 'navConfig',
    parent: '488789365e6511e88ce87fae8ccec962',
    link_type: MenuLinkType.LINK,
    link_url: '/sysConfig/navigation',
    sort: 40
}]

/**
 * 添加基本表单结构
 * @type {[null]}
 */
export const insertFormStructure = [{
    id: 'static_form_menu_2018_6_6_14_52',
    ver: 1528267976927,
    label: '系统导航菜单',
    l_new: SysFlag.DISABLE,
    l_view: SysFlag.DISABLE,
    l_search: SysFlag.DISABLE,
    l_delete: SysFlag.DISABLE
}, {
    id: 'static_form_dd_2018_6_6_14_52',
    ver: 1528274292559,
    label: '系统数据字典',
    l_new: SysFlag.ENABLE,
    l_view: SysFlag.ENABLE,
    l_search: SysFlag.ENABLE,
    l_delete: SysFlag.ENABLE
}]

export const insertFormItem = [
    {
        id: '8fb176c3695c11e88f144b664ac6f5cd',
        fsid: 'static_form_menu_2018_6_6_14_52',
        fsver: 1528267976927,
        type: FormItemType.VCHAR,
        f_fsid: '',
        f_rowid: '',
        f_itemid: '',
        comp_category: 'Input',
        comp_type: 'PK',
        label: '序列号',
        column: 'id',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip: '',
        sort: 0
    }, {
        id: '61ae549c695d11e8b0e9dda5c1919fac',
        fsid: 'static_form_menu_2018_6_6_14_52',
        fsver: 1528267976927,
        type: FormItemType.VCHAR,
        f_fsid: '',
        f_rowid: '',
        f_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '名称',
        column: 'label',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip: '菜单名称',
        sort: 10
    }, {
        id: '912c889c695d11e899fc01f32e168695',
        fsid: 'static_form_menu_2018_6_6_14_52',
        fsver: 1528267976927,
        type: FormItemType.VCHAR,
        f_fsid: '',
        f_rowid: '',
        f_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '编码',
        column: 'column',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip: '编码，可以根据需要对菜单项进行编码，便于系统间数据统一',
        sort: 20
    }, {
        id: 'b6271612695d11e8b381e7f74a290c6d',
        fsid: 'static_form_menu_2018_6_6_14_52',
        fsver: 1528267976927,
        type: FormItemType.VCHAR,
        f_fsid: '',
        f_rowid: '',
        f_itemid: '',
        comp_category: 'Select',
        comp_type: 'Standard',
        label: '父级菜单',
        column: 'parent',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip: '',
        sort: 50
    }, {
        id: '861f89a7696411e8a492935266224f65',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.VCHAR,
        f_fsid: '',
        f_rowid: '',
        f_itemid: '',
        comp_category: 'Input',
        comp_type: 'PK',
        label: '序列号',
        column: 'id',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip: '',
        sort: 0
    }, {
        id: '12fc5e7f6a0511e89aff79eafa1ffa12',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.VCHAR,
        f_fsid: '',
        f_rowid: '',
        f_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '编码',
        column: 'code',
        l_show: SysFlag.ENABLE,
        l_search: SysFlag.ENABLE,
        l_sort: SysFlag.ENABLE,
        tip: '编码，可以根据需要对菜单项进行编码，便于系统间数据统一',
        sort: 10
    }, {
        id: '21aa9bd76a0511e8a81f078e4028a66a',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.VCHAR,
        f_fsid: '',
        f_rowid: '',
        f_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '名称',
        column: 'label',
        l_show: SysFlag.ENABLE,
        l_search: SysFlag.ENABLE,
        l_sort: SysFlag.ENABLE,
        tip: '数据字典数据项的名称，用于标记该项数据的内容，例如性别。',
        sort: 20
    }, {
        id: '2b5dabe16a0511e8838a57a01308399f',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.DYNAM,
        f_fsid: '',
        f_rowid: '',
        f_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '数据',
        column: 'values',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip: '数据字典一个数据项的数据，可以是单条数据、多条数据或树。',
        sort: 30
    }, {
        id: '3e319e2f6a0511e8a81449dd5c0583b8',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.VCHAR,
        f_fsid: 'static_form_dd_2018_6_6_14_52',
        f_rowid: 'aa401ea06ad411e89b304f2f8aebc133',
        f_itemid: '2b5dabe16a0511e8838a57a01308399f',
        comp_category: 'Switch',
        comp_type: 'TFSwitch',
        label: '启用',
        column: 'op',
        l_show: SysFlag.ENABLE,
        l_search: SysFlag.ENABLE,
        l_sort: SysFlag.ENABLE,
        tip: '',
        sort: 40
    }
]

export const insertRow = [
    {
        id: 'aa401ea06ad411e89b304f2f8aebc133',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        label: '启停',
        code: '',
        sort: 0
    }
]

export const insertRowValue = [
    {
        id: '3cc49a606ae611e8a3bdc34c85b0b4f1',
        parent:'',
        rowid: 'aa401ea06ad411e89b304f2f8aebc133',
        itemid: '861f89a7696411e8a492935266224f65',
        itemtype: FormItemType.VCHAR,
        type: FormItemType.VCHAR,
        value: 'a27a5a706ae611e88c7e11040ba987ef',
    }, {
        id: 'bedf2ec76ae611e894d97109c206da96',
        parent:'',
        rowid: 'aa401ea06ad411e89b304f2f8aebc133',
        itemid: '12fc5e7f6a0511e89aff79eafa1ffa12',
        itemtype: FormItemType.VCHAR,
        type: FormItemType.VCHAR,
        value: 'start',
    }, {
        id: 'fdec15106ae611e884c41dd4189b4164',
        parent:'',
        rowid: 'aa401ea06ad411e89b304f2f8aebc133',
        itemid: '21aa9bd76a0511e8a81f078e4028a66a',
        itemtype: FormItemType.VCHAR,
        type: FormItemType.VCHAR,
        value: '启用/停用',
    }, {
        id: '455c0bdd6ae711e88cdb53482776c712',
        parent:'',
        rowid: 'aa401ea06ad411e89b304f2f8aebc133',
        itemid: '2b5dabe16a0511e8838a57a01308399f',
        itemtype: FormItemType.DYNAM,
        type: FormItemType.ARRAY,
        value: '启用',
    }, {
        id: '7185bda36ae711e8b3e97780241392f5',
        parent:'',
        rowid: 'aa401ea06ad411e89b304f2f8aebc133',
        itemid: '2b5dabe16a0511e8838a57a01308399f',
        itemtype: FormItemType.DYNAM,
        type: FormItemType.ARRAY,
        value: '停用',
    }, {
        id: '94cde0336ae711e895f57778a1c4ff53',
        parent:'',
        rowid: 'aa401ea06ad411e89b304f2f8aebc133',
        itemid: '3e319e2f6a0511e8a81449dd5c0583b8',
        itemtype: FormItemType.VCHAR,
        type: FormItemType.VCHAR,
        f_fsid: 'static_form_dd_2018_6_6_14_52',
        f_rowid: 'aa401ea06ad411e89b304f2f8aebc133',
        f_itemid: '3e319e2f6a0511e8a81449dd5c0583b8',
        f_valueid: '455c0bdd6ae711e88cdb53482776c712',
        value: '启用',
    }
]

export const insertFormItemRules = [
    {
        id: '332da458696611e8b786e7ebbc04ad3c',
        itemid: '12fc5e7f6a0511e89aff79eafa1ffa12',
        rule_category: 'single',
        rule_type: 'require',
        expression: encodeURI(JSON.stringify({msg: '请输入数据编码'})),
        sort: 0
    }, {
        id: '3d5d9014696711e8ae623de7ffa85bfa',
        itemid: '12fc5e7f6a0511e89aff79eafa1ffa12',
        rule_category: 'single',
        rule_type: 'unIdentical',
        expression: encodeURI(JSON.stringify({formId: 'static_form_dd_2018_6_6_14_52', column: 'code'})),
        sort: 10
    }, {
        id: '4dd12429696711e88355e9ce8cd50ffb',
        itemid: '21aa9bd76a0511e8a81f078e4028a66a',
        rule_category: 'single',
        rule_type: 'require',
        expression: encodeURI(JSON.stringify({msg: '请输入数据名称'})),
        sort: 20
    }, {
        id: '522bf2cc696711e8823d0b0f1d5a5463',
        itemid: '21aa9bd76a0511e8a81f078e4028a66a',
        rule_category: 'single',
        rule_type: 'max',
        expression: encodeURI(JSON.stringify({len: 32})),
        sort: 30
    }
]