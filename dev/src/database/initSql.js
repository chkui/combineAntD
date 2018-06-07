import {MenuLinkType, SysFlag, FormItemType} from '../../config/sysDefConfig'

/**
 * 创建Menu
 * @type {string}
 */
export const createMenuTable = 'CREATE TABLE IF NOT EXISTS B_MENU(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'label VARCHAR(32) NOT NULL,' +
    'column VARCHAR(32) NOT NULL,' +
    'parent VARCHAR(20) NOT NULL,' +
    'link_type CHAR(1) NOT NULL,' + //菜单跳转类型，L=一个纯URL跳转，F=内部表单跳转，G=父组件，有叶节点，没有跳转功能
    'link_url VARCHAR(64),' + //跳转地址
    'sort INT(10) NOT NULL,' + //排序字段
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL' +
    ')';

/**
 * 添加基本数据
 * @type {[null]}
 */
export const insertMenu = [{
    id: 'ca9ff02b5e6411e89b17a388ea92ae70',
    label: '桌面',
    column: 'portals',
    parent: '',
    link_type: MenuLinkType.LINK,
    link_url: '/',
    sort: 0
}, {
    id: '488789365e6511e88ce87fae8ccec962',
    label: '管理员功能',
    column: 'options',
    parent: '',
    link_type: MenuLinkType.GROUP,
    sort: 50
}, {
    id: '631bbc395e6511e8bec9c3e1038a5664',
    label: '数据字典',
    column: 'DDConfig',
    parent: '488789365e6511e88ce87fae8ccec962',
    link_type: MenuLinkType.FORM,
    link_url: 'static_form_dd_2018_6_6_14_52',
    sort: 0
}, {
    id: 'e67a2fdc696911e897e3652a66429879',
    label: '导航菜单配置',
    column: 'navConfig',
    parent: '488789365e6511e88ce87fae8ccec962',
    link_type: MenuLinkType.LINK,
    link_url: '/sysConfig/navigation',
    sort: 0
}]

//行数据表
const createDataTable = 'CREATE TABLE IF NOT EXISTS B_DATA_ROW(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'fsid VARCHAR(32) NOT NULL,' + //关联表单结构表ID
    'fsver INT(15) NOT NULL,' +  //关联表单版本号
    'label VARCHAR(32) NOT NULL,' +
    'column VARCHAR(32) NOT NULL,' +
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL' +
    ')';

//列数据表
const createDataItem = 'CREATE TABLE IF NOT EXISTS B_DATA_COLUMN(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'rowid VARCHAR(32) NOT NULL,' + //关联B_DATA_TABLE的主键
    'itemid VARCHAR(32) NOT NULL,' + //关联B_FORM_ITEM_STRUCTURE或B_DATA_ITEM的主键
    'column VARCHAR(32) NOT NULL,' +
    'label VARCHAR(32) NOT NULL,' +
    /**
     * TYPE表示当前数据域的数据类型，由选择组件的时候确定。类型通过枚举确定。
     * 1)'VCHAR':VALUE储存独立字符串
     * 2)'INTER':VALUE存储正负整型数字，16位置
     * 3)'DOUBL':VALUE存储正负小数点数字，保留小数点后6位到前16位置。
     * 4)'MONEY':VALUE存储价钱，存储方式与DOUBLE一致。组件表现形式存在差异
     * 5)'ARRAY':VALUE无数据，需要到 B_DATA_ITEM 中查询 B_DATA_ITEM.TABLEID = B_DATA_ITEM.TABLEID, B_DATA_ITEM.ITEMID = B_DATA_ITEM.ID的对应的一组列表数据
     * 6)'TREES':VALUE无数据，需要到 B_DATA_ITEM 中查询 B_DATA_ITEM.TABLEID = B_DATA_ITEM.TABLEID, B_DATA_ITEM.ITEMID = B_DATA_ITEM.ID的对应的一组树形结构数据
     * 7)'SFORM':该项数据关联另外一张指定的表单数据。此时VALUE = B_DATA_TABLE.ID
     * 8)'MFORM':数据关联到一组表单数据。在B_DATA_ITEM_FORM表建立关联
     * 9)'DYNAM':数据关联到一组表单数据。在B_DATA_ITEM_FORM表建立关联
     */
    'type CHAR(5) NOT NULL,' +
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL' +
    ')';

const createDataItemValue = 'Create Table IF NOT EXISTS B_DATA_VALUE(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'rowid VARCHAR(32) NOT NULL,' +
    'columnid VARCHAR(32) NOT NULL,' + 
    'columntype CHAR(5) NOT NULL,' +
    'value VARCHAR(255) NOT NULL,' +
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL' +
    ')';


/**
 * 数据项关联多个表单的查询表。
 * @type {string}
 */
const createDataItemMultForm = 'CREATE TABLE IF NOT EXISTS B_DATA_ITEM_FORM(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'itemid VARCHAR(32) NOT NULL,' + //关联B_DATA_TABLE的主键
    'fsid VARCHAR(32) NOT NULL,' + //关联B_FORM_ITEM_STRUCTURE或B_DATA_ITEM的主键
    'fsver INT(15) NOT NULL,' +
    'dataid VARCHAR(32) NOT NULL,' + //对应的数据项ID
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL' +
    ')';

/**
 * 创建表单结构表
 * @type {string}
 */
const createFormStructure = 'CREATE TABLE IF NOT EXISTS B_FORM_STRUCTURE(' +
    'id VARCHAR(32) NOT NULL, ' +
    'ver INT(15) NOT NULL,' + //表单版本号，版本号用于标记表单的新旧顺序以及关联关系，使用时间戳
    'label VARCHAR(32) NOT NULL,' +
    'type VARCHAR(10) NOT NULL,' +
    'l_new CHAR(1) NOT NULL,' + //列表是否可以新建 以下4项以后要配合权限来开发。
    'l_view CHAR(1) NOT NULL,' + //是否可以查看详情
    'l_search CHAR(1) NOT NULL,' + //搜索
    'l_delete CHAR(1) NOT NULL,' + //删除
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL,' +
    'PRIMARY KEY(id,ver)' + //id与ver组成联合主键
    ')';

/**
 * 添加基本表单结构
 * @type {[null]}
 */
export const insertFormStructure = [{
    id: 'static_form_menu_2018_6_6_14_52',
    ver: 1528267976927,
    label: '系统导航菜单',
    type: '',
    l_new: SysFlag.DISABLE,
    l_view: SysFlag.DISABLE,
    l_search: SysFlag.DISABLE,
    l_delete: SysFlag.DISABLE
}, {
    id: 'static_form_dd_2018_6_6_14_52',
    ver: 1528274292559,
    label: '系统数据字典',
    type: '',
    l_new: SysFlag.ENABLE,
    l_view: SysFlag.ENABLE,
    l_search: SysFlag.ENABLE,
    l_delete: SysFlag.ENABLE
}]


const createFormItemStructure = 'CREATE TABLE IF NOT EXISTS B_FORM_ITEM_STRUCTURE(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'fsid VARCHAR(32) NOT NULL,' + //关联B_FORM_STRUCTURE的ID
    'fsver INT(15) NOT NULL,' + //关联B_FORM_STRUCTURE的VER
    'type VARCHAR(10) NOT NULL,' +
    'f_table VARCHAR(32),' + //关联的table数据
    'f_row VARCHAR(32),' +
    'f_column VARCHAR(32),' +
    'comp_category VARCHAR(32) NOT NULL,' + //关联B_FORM_ITEM_STRUCTURE的主键
    'comp_type VARCHAR(32) NOT NULL,' +
    'label VARCHAR(32) NOT NULL,' +
    'column VARCHAR(32) NOT NULL,' +
    'l_show CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用
    'l_search CHAR(1) NOT NULL,' + //是否在列表中可以搜索 E启用、N停用
    'l_sort CHAR(1) NOT NULL,' + //是否在列表中可以搜索
    'tip VARCHAR(255),' + //组件输入提示信息
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL' +
    ')';

/*export const createMenuTable = 'CREATE TABLE IF NOT EXISTS B_MENU(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'label VARCHAR(32) NOT NULL,' +
    'column VARCHAR(32) NOT NULL,' +
    'parent VARCHAR(20) NOT NULL,' +
    'link_type CHAR(1) NOT NULL,' + //菜单跳转类型，L=一个纯URL跳转，F=内部表单跳转，G=父组件，有叶节点，没有跳转功能
    'link_url VARCHAR(64),' + //跳转地址
    'sort INT(10) NOT NULL,' + //排序字段
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL' +
    ')';*/

export const insertFormItemStructure = [
    {
        id: '8fb176c3695c11e88f144b664ac6f5cd',
        fsid: 'static_form_menu_2018_6_6_14_52',
        fsver: 1528267976927,
        type: FormItemType.VCHAR,
        fk_itemid: '',
        comp_category: 'Input',
        comp_type: 'PK',
        label: '序列号',
        column: 'id',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip:''
    }, {
        id: '61ae549c695d11e8b0e9dda5c1919fac',
        fsid: 'static_form_menu_2018_6_6_14_52',
        fsver: 1528267976927,
        type: FormItemType.VCHAR,
        fk_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '名称',
        column: 'label',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip:'菜单名称'
    }, {
        id: '912c889c695d11e899fc01f32e168695',
        fsid: 'static_form_menu_2018_6_6_14_52',
        fsver: 1528267976927,
        type: FormItemType.VCHAR,
        fk_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '编码',
        column: 'column',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip:'编码，可以根据需要对菜单项进行编码，便于系统间数据统一'
    }, {
        id: 'b6271612695d11e8b381e7f74a290c6d',
        fsid: 'static_form_menu_2018_6_6_14_52',
        fsver: 1528267976927,
        type: FormItemType.VCHAR,
        fk_itemid: '8fb176c3695c11e88f144b664ac6f5cd',
        comp_category: 'Select',
        comp_type: 'Standard',
        label: '父级菜单',
        column: 'parent',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip:'',
    }, {
        id: '861f89a7696411e8a492935266224f65',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.VCHAR,
        fk_itemid: '',
        comp_category: 'Input',
        comp_type: 'PK',
        label: '序列号',
        column: 'id',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip:'',
    }, {
        id: '12fc5e7f6a0511e89aff79eafa1ffa12',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.VCHAR,
        fk_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '编码',
        column: 'code',
        l_show: SysFlag.ENABLE,
        l_search: SysFlag.ENABLE,
        l_sort: SysFlag.ENABLE,
        tip:'编码，可以根据需要对菜单项进行编码，便于系统间数据统一'
    }, {
        id: '21aa9bd76a0511e8a81f078e4028a66a',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.VCHAR,
        fk_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '名称',
        column: 'label',
        l_show: SysFlag.ENABLE,
        l_search: SysFlag.ENABLE,
        l_sort: SysFlag.ENABLE,
        tip:'数据字典数据项的名称，用于标记该项数据的内容，例如性别。'
    }, {
        id: '2b5dabe16a0511e8838a57a01308399f',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.DYNAM,
        fk_itemid: '',
        comp_category: 'Input',
        comp_type: 'Text',
        label: '数据',
        column: 'values',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip:'数据字典一个数据项的数据，可以是单条数据、多条数据或树。'
    }, {
        id: '3e319e2f6a0511e8a81449dd5c0583b8',
        fsid: 'static_form_dd_2018_6_6_14_52',
        fsver: 1528274292559,
        type: FormItemType.VCHAR,
        fk_itemid: '',
        comp_category: 'Switch',
        comp_type: 'TFSwitch',
        label: '启停',
        column: 'op',
        l_show: SysFlag.DISABLE,
        l_search: SysFlag.DISABLE,
        l_sort: SysFlag.DISABLE,
        tip:''
    }
]

const createFormItemRules = 'CREATE TABLE IF NOT EXISTS B_FORM_ITEM_RULES(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY,' +
    'itemid VARCHAR(32) NOT NULL,' + //关联的item项
    'rule_category VARCHAR(32) NOT NULL,' + //前端校验规则对应的分类
    'rule_type VARCHAR(32) NOT NULL,' + //对应的类型
    'expression VARCHAR(32) NOT NULL,' + //校验对应的表达式，由前端直接传递JSON字符串
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL' +
    ')';

export const insertFormItemRules = [
    {
        id:'332da458696611e8b786e7ebbc04ad3c',
        itemid:'12fc5e7f6a0511e89aff79eafa1ffa12',
        rule_category:'single',
        rule_type:'require',
        expression:encodeURI(JSON.stringify({msg: '请输入数据编码'}))
    }, {
        id:'3d5d9014696711e8ae623de7ffa85bfa',
        itemid:'12fc5e7f6a0511e89aff79eafa1ffa12',
        rule_category:'single',
        rule_type:'unIdentical',
        expression:encodeURI(JSON.stringify({formId: 'static_form_dd_2018_6_6_14_52', column: 'code'}))
    }, {
        id:'4dd12429696711e88355e9ce8cd50ffb',
        itemid:'21aa9bd76a0511e8a81f078e4028a66a',
        rule_category:'single',
        rule_type:'require',
        expression:encodeURI(JSON.stringify({msg: '请输入数据名称'}))
    }, {
        id:'522bf2cc696711e8823d0b0f1d5a5463',
        itemid:'21aa9bd76a0511e8a81f078e4028a66a',
        rule_category:'single',
        rule_type:'max',
        expression:encodeURI(JSON.stringify({len: 32}))
    }
]

export const initDropTableSql = [
    'DROP TABLE B_MENU',
    'DROP TABLE B_DATA_TABLE',
    'DROP TABLE B_DATA_ITEM',
    'DROP TABLE B_DATA_ITEM_VALUE',
    'DROP TABLE B_DATA_ITEM_FORM',
    'DROP TABLE B_FORM_STRUCTURE',
    'DROP TABLE B_FORM_ITEM_STRUCTURE',
    'DROP TABLE B_FORM_ITEM_RULES',
    'DROP TABLE B_FORM_ITEM_RULES'
]

export const initCreateTableSql = [
    createMenuTable,
    createDataTable,
    createDataItem,
    createDataItemValue,
    createDataItemMultForm,
    createFormStructure,
    createFormItemStructure,
    createFormItemRules];