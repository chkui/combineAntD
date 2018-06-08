import {MenuLinkType, SysFlag, FormItemType} from '../../config/sysDefConfig'

/**
 * 创建Menu
 * @type {string}
 */
export const createMenuTable = 'CREATE TABLE IF NOT EXISTS B_MENU(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'label VARCHAR(32) NOT NULL,' +
    'code VARCHAR(32) NOT NULL,' +
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
 * 创建表单结构表
 * @type {string}
 */
const createFormStructure = 'CREATE TABLE IF NOT EXISTS B_FORM_STRUCTURE(' +
    'id VARCHAR(32) NOT NULL, ' +
    'ver INT(15) NOT NULL,' + //表单版本号，版本号用于标记表单的新旧顺序以及关联关系，使用时间戳
    'label VARCHAR(32) NOT NULL,' +
    'l_new CHAR(1) NOT NULL,' + //列表是否可以新建 以下4项以后要配合权限来开发。
    'l_view CHAR(1) NOT NULL,' + //是否可以查看详情
    'l_search CHAR(1) NOT NULL,' + //列表搜索
    'l_delete CHAR(1) NOT NULL,' + //列表删除
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL,' +
    'PRIMARY KEY(id,ver)' + //id与ver组成联合主键
    ')';

//行数据表
const createDataTable = 'CREATE TABLE IF NOT EXISTS B_ROW(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'fsid VARCHAR(32) NOT NULL,' + //关联表单结构表ID
    'fsver INT(15) NOT NULL,' +  //关联表单版本号
    'label VARCHAR(32) NOT NULL,' +
    'code VARCHAR(32),' +
    'op CHAR(1) NOT NULL,' + //是否在列表中显示 E启用、N停用、D删除
    'createuser VARCHAR(32) NOT NULL,' +
    'createtime INT(15) NOT NULL,' +
    'modifyuser VARCHAR(32) NOT NULL,' +
    'modifytime INT(15) NOT NULL,' +
    'site VARCHAR(32) NOT NULL' +
    ')';

const createFormItem = 'CREATE TABLE IF NOT EXISTS B_FORM_ITEM(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'fsid VARCHAR(32) NOT NULL,' + //关联B_FORM_STRUCTURE的ID
    'fsver INT(15) NOT NULL,' + //关联B_FORM_STRUCTURE的VER
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
     * 9)'DYNAM':数据为动态数据，每一行的数据在B_ROW_VALUE.type 二次指定
     */
    'type CHAR(5) NOT NULL,' +
    /**
     * f_fsid,f_rowid,f_itemid决定了在该表中数据的来源（外关联）。
     * f_fsid表示该项数据的来源表（表单）。如果仅仅只有这条数据存在，则表示关联表中的所有行数据，外关联值取B_FORM_STRUCTURE表的id，以及对应的B_ROW行id。对应取值为该行的label值,
     * f_rowid表示仅关联到表的每一行数据，通过f_fsid和f_rowid定位到某一行数据。
     * f_itemid表示取值字段：
     *      1)如果仅仅f_fsid + f_itemid存在，会取这个表中所有这一列的数据。
     *      2)如果仅仅f_fsid f_rowid f_itemid都存在，会取对应行的这一列数据。
     *      3)数据会根据type有不同的类型，关联之后，取值需要对关联项进行类型关联。
     */
    'f_fsid VARCHAR(32),' + //数据项关联的表单
    'f_rowid VARCHAR(32),' + //数据项关联的行数据，具体到某一行
    'f_itemid VARCHAR(32),' + //数据项关联的字段
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

const createDataItemValue = 'Create Table IF NOT EXISTS B_ROW_VALUE(' +
    'id VARCHAR(32) NOT NULL PRIMARY KEY, ' +
    'parent VARCHAR(32),' + //父级数据，用于构建树
    'rowid VARCHAR(32) NOT NULL,' +
    'itemid VARCHAR(32) NOT NULL,' +
    'itemtype CHAR(5) NOT NULL,' +
    'type CHAR(5) NOT NULL,' +
    'f_fsid VARCHAR(32),' + //数据项关联的表单
    'f_rowid VARCHAR(32),' + //数据项关联的行数据，具体到某一行
    'f_itemid VARCHAR(32),' + //数据项关联的字段
    'f_valueid VARCHAR(32),' + //数据项关联的字段
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

export const initDropTableSql = [
    'DROP TABLE IF EXISTS B_MENU',
    'DROP TABLE IF EXISTS B_ROW',
    'DROP TABLE IF EXISTS B_ROW_VALUE',
    'DROP TABLE IF EXISTS B_DATA_ITEM_FORM',
    'DROP TABLE IF EXISTS B_FORM_STRUCTURE',
    'DROP TABLE IF EXISTS B_FORM_ITEM',
    'DROP TABLE IF EXISTS B_FORM_ITEM_RULES'
]

export const initCreateTableSql = [
    createMenuTable,
    createDataTable,
    createDataItemValue,
    createDataItemMultForm,
    createFormStructure,
    createFormItem,
    createFormItemRules];