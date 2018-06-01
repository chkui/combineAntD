import {MenuLinkType} from '../../config/sysDefConfig'

const createMenu = 'CREATE TABLE IF NOT EXISTS B_MENU(' +
    'ID VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'LABEL VARCHAR(32) NOT NULL,' +
    'COLUMN VARCHAR(32) NOT NULL,' +
    'PARENT VARCHAR(20) NOT NULL,' +
    'LINK_TYPE CHAR(1) NOT NULL,' + //菜单跳转类型，L=一个纯URL跳转，F=内部表单跳转，G=父组件，有叶节点，没有跳转功能
    'LINK_URL VARCHAR(64),' + //跳转地址
    'OP CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'CREATEUSER VARCHAR(32) NOT NULL,' +
    'CREATETIME INT(15) NOT NULL,' +
    'MODIFYUSER VARCHAR(32) NOT NULL,' +
    'MODIFYTIME INT(15) NOT NULL' +
    ')';

/**
 *
 * @type {[null]}
 */
export const insertMenu = [{
    id:'ca9ff02b5e6411e89b17a388ea92ae70',
    label: '桌面',
    column: 'portals',
    parent: '',
    type: MenuLinkType.LINK,
    link: '/'
},{
    id:'488789365e6511e88ce87fae8ccec962',
    label: '管理员功能',
    column: 'options',
    parent: '',
    type: MenuLinkType.GROUP,
},{
    id:'631bbc395e6511e8bec9c3e1038a5664',
    label: '导航菜单配置',
    column: 'navConfig',
    parent: '488789365e6511e88ce87fae8ccec962',
    type: MenuLinkType.LINK,
}]

const createDataTable = 'CREATE TABLE IF NOT EXISTS B_DATA_TABLE(' +
    'ID VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'FSID VARCHAR(32) NOT NULL,' + //关联表单结构表ID
    'FSVER INT(15) NOT NULL,' +  //关联表单版本号
    'LABEL VARCHAR(32) NOT NULL,' +
    'COLUMN VARCHAR(32) NOT NULL,' +
    'OP CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'CREATEUSER VARCHAR(32) NOT NULL,' +
    'CREATETIME INT(15) NOT NULL,' +
    'MODIFYUSER VARCHAR(32) NOT NULL,' +
    'MODIFYTIME INT(15) NOT NULL' +
    ')';

const createDataItem = 'CREATE TABLE IF NOT EXISTS B_DATA_ITEM(' +
    'ID VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'TABLEID VARCHAR(32) NOT NULL,' + //关联B_DATA_TABLE的主键
    'ITEMID VARCHAR(32) NOT NULL,' + //关联B_FORM_ITEM_STRUCTURE或B_DATA_ITEM的主键
    'LABEL VARCHAR(32) NOT NULL,' +
    'COLUMN VARCHAR(32) NOT NULL,' +
    /**
     * TYPE表示当前数据域的数据类型，由选择组件的时候确定。类型通过枚举确定。
     * 1)'VARCHA':VALUE储存独立字符串
     * 2)'INTER':VALUE存储正负整型数字，16位置
     * 3)'DOUBLE':VALUE存储正负小数点数字，保留小数点后6位到前16位置。
     * 4)'MONEY':VALUE存储价钱，存储方式与DOUBLE一致。组件表现形式存在差异
     * 5)'ARRAY':VALUE无数据，需要到 B_DATA_ITEM 中查询 TABLEID = TABLEID, ITEMID = ID的对应的一组列表数据
     * 6)'SIGFORM':该项数据关联另外一张指定的表单数据。此时VALUE = B_DATA_TABLE.ID
     * 7)'MULFORM':数据关联到一组表单数据。
     */
    'TYPE VARCHAR(10) NOT NULL,' +
    'VALUE VARCHAR(255) NOT NULL,' +
    'OP CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'CREATEUSER VARCHAR(32) NOT NULL,' +
    'CREATETIME INT(15) NOT NULL,' +
    'MODIFYUSER VARCHAR(32) NOT NULL,' +
    'MODIFYTIME INT(15) NOT NULL' +
    ')';

/**
 * 数据项关联多个表单的查询表。
 * @type {string}
 */
const createDataItemMultForm = 'CREATE TABLE IF NOT EXISTS B_DATA_ITEM_FORM(' +
    'ID VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'ITEMID VARCHAR(32) NOT NULL,' + //关联B_DATA_TABLE的主键
    'FSID VARCHAR(32) NOT NULL,' + //关联B_FORM_ITEM_STRUCTURE或B_DATA_ITEM的主键
    'FSVER INT(15) NOT NULL,' +
    'DATAID VARCHAR(32) NOT NULL,' + //对应的数据项ID
    'OP CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'CREATEUSER VARCHAR(32) NOT NULL,' +
    'CREATETIME INT(15) NOT NULL,' +
    'MODIFYUSER VARCHAR(32) NOT NULL,' +
    'MODIFYTIME INT(15) NOT NULL' +
    ')';

const createFormStructure = 'CREATE TABLE IF NOT EXISTS B_FORM_STRUCTURE(' +
    'ID VARCHAR(32) NOT NULL, ' +
    'VER INT(15) NOT NULL,' + //表单版本号，版本号用于标记表单的新旧顺序以及关联关系，使用时间戳
    'LABEL VARCHAR(32) NOT NULL,' +
    'TYPE VARCHAR(10) NOT NULL,' +
    'L_NEW CHAR(1) NOT NULL,' + //列表是否可以新建 以下4项以后要配合权限来开发。
    'L_VIEW CHAR(1) NOT NULL,' + //是否可以查看详情
    'L_SEARCH CHAR(1) NOT NULL,' + //搜索
    'L_DELETE CHAR(1) NOT NULL,' + //删除
    'OP CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'CREATEUSER VARCHAR(32) NOT NULL,' +
    'CREATETIME INT(15) NOT NULL,' +
    'MODIFYUSER VARCHAR(32) NOT NULL,' +
    'MODIFYTIME INT(15) NOT NULL,' +
    'PRIMARY KEY(ID,VER)' + //id与ver组成联合主键
    ')';

const createFormItemStructure = 'CREATE TABLE IF NOT EXISTS B_FORM_ITEM_STRUCTURE(' +
    'ID VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'FSID VARCHAR(32) NOT NULL,' + //关联B_FORM_STRUCTURE的ID
    'FSVER INT(15) NOT NULL,' + //关联B_FORM_STRUCTURE的VER
    'TYPE VARCHAR(10) NOT NULL,' +
    'FK_ITEMID VARCHAR(32),' + //数据来源的ITEM数据项，数据是从该ITEM处选择而来
    'COMP_CATEGORY VARCHAR(32) NOT NULL,' + //关联B_FORM_ITEM_STRUCTURE的主键
    'COMP_TYPE VARCHAR(32) NOT NULL,' +
    'LABEL VARCHAR(32) NOT NULL,' +
    'COLUMN VARCHAR(32) NOT NULL,' +
    'L_SHOW CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用
    'L_SEARCH CHAR(1) NOT NULL,' + //是否在列表中可以搜索 E启用、N停用
    'L_SORT CHAR(1) NOT NULL,' + //是否在列表中可以搜索
    'OP CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'CREATEUSER VARCHAR(32) NOT NULL,' +
    'CREATETIME INT(15) NOT NULL,' +
    'MODIFYUSER VARCHAR(32) NOT NULL,' +
    'MODIFYTIME INT(15) NOT NULL' +
    ')';

const createFormItemRules = 'CREATE TABLE IF NOT EXISTS B_FORM_ITEM_RULES(' +
    'ID VARCHAR(32) NOT NULL PRIMARY KEY,' +
    'ITEMID VARCHAR(32) NOT NULL,' + //关联的item项
    'RULE_CATEGORY VARCHAR(32) NOT NULL,' + //前端校验规则对应的分类
    'RULE_TYPE VARCHAR(32) NOT NULL,' + //对应的类型
    'EXPRESSION VARCHAR(32) NOT NULL,' + //校验对应的表达式，由前端直接传递JSON字符串
    'OP CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'CREATEUSER VARCHAR(32) NOT NULL,' +
    'CREATETIME INT(15) NOT NULL,' +
    'MODIFYUSER VARCHAR(32) NOT NULL,' +
    'MODIFYTIME INT(15) NOT NULL' +
    ')';


export const initCreateTableSql = [createMenu,
    createDataTable,
    createDataItem,
    createDataItemMultForm,
    createFormStructure,
    createFormItemStructure,
    createFormItemRules];