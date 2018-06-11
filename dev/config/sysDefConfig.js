/**
 * 系统数据操作标记
 * @type {{ENABLE: string, DISABLE: string, DELETE: string}}
 */
export const SysFlag = {
    ENABLE: 'E', //启用,允许
    DISABLE: 'N', //停用，禁止
    DELETE: 'D' //删除
}

export const SIZE = {
    S: 'small',
    M: 'middle',
    L: 'large'
};

/**
 * 列表展示相关的配置
 * @type {{pageLength: number, table: {size: string}, button: {size: string}, options: {view: string, new: string, delete: string, search: string}}}
 */
export const ListConfig = {
    pageLength: 10, //默认单页显示个数
    //table的样式
    table: {
        size: SIZE.M //表单格式，宽松:'middle'.紧凑'small'.
    },
    button: {
        size: SIZE.M //表单按钮大小
    },
    options:{//列表操作选项
        view:'view',
        new:'new',
        delete:'delete',
        search:'search'
    }
}

/**
 * 系统全局Op的定义
 * //todo delete
 * @type {{Data2Comp: {ENABLE: boolean, DISABLE: boolean, DELETE: boolean}, Comp2Data: {true: string, false: string}}}
 */
export const OPData = {
    Data2Comp: {
        ENABLE: true,
        DISABLE: false,
        DELETE: false
    },
    Comp2Data: {
        true: 'ENABLE',
        false: 'DISABLE'
    }
};

/**
 * 菜单类型配置
 * @type {{LINK: string, FORM: string, GROUP: string}}
 */
export const MenuLinkType = {
    LINK: 'L', //直接的URL链接
    FORM: 'F', //指向一个配置的表单列表
    GROUP: 'G', //是一个分组菜单，还包含更多的子菜单
    SINGLE_FORM: 'S' //是一个独立的表单，没有关联任何列表
}

/**
 * 表单结构中的item类型
 * @type {{VCHAR: string, TIMES: string, INTER: string, DOUBL: string, MONEY: string, ARRAY: string, TREES: string, SFORM: string, MFORM: string, DYNAM: string}}
 */
export const FormItemType = {
    VCHAR: 'VCHAR', //最大255长度的字符串
    TIMES: 'TIMES', //时间戳格式，15位INT
    INTER: 'INTER', //最大15长度的正负整型数字
    DOUBL: 'DOUBL', //正负小数点数字，保留小数点后6位到前15位
    MONEY: 'MONEY', //价钱，存储方式与DOUBLE一致。组件表现形式存在差异
    ARRAY: 'ARRAY', //列表，需要到 B_DATA_ITEM 中查询 B_DATA_ITEM.TABLEID = B_DATA_ITEM.TABLEID, B_DATA_ITEM.ITEMID = B_DATA_ITEM.ID的对应的一组列表数据
    TREES: 'TREES', //树，需要到 B_DATA_ITEM 中查询 B_DATA_ITEM.TABLEID = B_DATA_ITEM.TABLEID, B_DATA_ITEM.ITEMID = B_DATA_ITEM.ID的对应的一组树形结构数据
    SFORM: 'SFORM', //关联到一个表单，该项数据关联另外一张指定的表单数据。此时VALUE = B_DATA_TABLE.ID
    MFORM: 'MFORM', //关联到多个表单，
    DYNAM: 'DYNAM'  //动态结构，可以是以上任何类型，根据在具体数据项中存储数据而定。动态数据不能参与列表排序与查询。
}

/**
 * 表单固定字段操作标记。
 * 没一行数据的固定字段都记录在B_ROW表上。标记记录在B_FORM_STRUCTURE表
 * @type {{READ: string, WRITE: string, LISTREAD: string, LISTWRITE: string}}
 */
export const FormRegularItemOptions = {
    READ: 'R', //只读
    WRITE: 'W', //读写
    LISTREAD: 'L', //列表显示并且表单可读
    LISTWRITE: 'T' //列表显示并且表单可读写
}



//--------------------------------------------------------------------------------------------------------------------

/**
 * OP字段的定义参数。
 * @type {{Data2Comp: {E: boolean, N: boolean, D: boolean}, Comp2Data: {true: string, false: string}}}
 */
export const OPTrans = {
    Data2Comp: {
        E: true, //启用
        N: false, //停用
        D: false //删除
    },
    Comp2Data: {
        true: 'E',
        false: 'N'
    }
}

/**
 * 数据集固定字段，所有的数据集都必须包含子些字段
 * @type {{id: string, label: string, OP: string, createUser: string, createTime: string, modifyUser: string, modifyTime: string}}
 */
export const RegularItemMeta = {
    /**
     * 主键，使用19位Object-id
     */
    id: 'id',
    /**
     * 标题名称，用于标记业务内容
     */
    label: 'label',
    /**
     * 操作标志
     * {@link OPData}
     */
    OP: 'OP',
    /**
     * 该项数据的创建者
     */
    createUser: 'createUser',
    /**
     * 数据创建时间，时间戳
     */
    createTime: 'createTime',
    /**
     * 该项数据的最后修改者
     */
    modifyUser: 'modifyUser',
    /**
     * 该项数据的最后修改时间，时间戳
     */
    modifyTime: 'modifyTime'
}

/**
 * 列表提供的可选操作
 * @type {{NEW: string, DELETE: string, VIEW: string, SEARCH: string}}
 */
export const ListOption = {
    NEW: 'NEW',
    DELETE: 'DELETE',
    VIEW: 'VIEW',
    SEARCH: 'SEARCH'
}

/**
 * 表单状态，用于在URL中显示表单对应的状态
 * @type {{new: string, edit: string, view: string}}
 */
export const FormStructureState = {
    new: 'new', //新建
    edit: 'edit',//编辑
    view: 'view'//查看（只读）
}

/**
 * 表单类型
 * @type {{static: string, asset: string, flow: string}}
 */
export const FormStructureType = {
    static: 'static',//预定义表单
    asset: 'asset',//资产表单
    flow: 'flow'//流程表单
}

/**
 * 特殊的数据标记，用于标记一些空、非数据
 * @type {{EMPTY: string}}
 */
export const DataFlag = {
    EMPTY: 'EMPTY' //空数据，表示用户未输入内容或下拉菜单选择了空选项
}

/**
 * 查询相关的规则
 * @type {{EQU: string, LIK: string, DESC: string, ASC: string}}
 */
export const QueryOpt = {
    EQU: 'QUE', //完全相等匹配
    LIK: 'LIK', //模糊匹配
    DESC: 'DESC', //上升排序
    ASC: 'ASC' //下降排序
}

export default {
    ListConfig,
    OPData,
    ListOption,
    DataFlag,
    FormStructureState,
    FormStructureType,
    RegularItemMeta,
    QueryOpt
}