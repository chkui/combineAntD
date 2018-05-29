export const SIZE = {
    S: 'small',
    M: 'middle',
    L: 'large'
};

/**
 * 列表展示相关的配置
 * @type {{pageLength: number, table: {size: string}, button: {size: string}}}
 */
export const ListConfig = {
    pageLength: 10, //默认单页显示个数
    //table的样式
    table: {
        size: SIZE.M //表单格式，宽松:'middle'.紧凑'small'.
    },
    button: {
        size: SIZE.M //表单按钮大小
    }
}

/**
 * 系统全局Op的定义
 * @type {{Data2Comp: {ENABLE: boolean, DISABLE: boolean, DELETE: boolean}, Comp2Data: {true: string, false: string}}}
 */
export const OPData = {
    Data2Comp: {
        ENABLE: true,
        DISABLE: false,
        DELETE: false
    },
    Comp2Data:{
        true:'ENABLE',
        false:'DISABLE'
    }
};

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

export default {
    ListConfig,
    OPData,
    ListOption,
    DataFlag,
    FormStructureState,
    FormStructureType,
    RegularItemMeta
}