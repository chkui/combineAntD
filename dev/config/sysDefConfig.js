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
 * @type {{
 *      ENABLE: boolean, 启用
 *      DISABLE: boolean, 停用
 *      DELETE: boolean 逻辑删除
 * }}
 */
export const OPType = {
    ENABLE: true,
    DISABLE: false,
    DELETE: false
}

/**
 * 列表提供的可选操作
 * @type {{NEW: string, DELETE: string, VIEW: string, SEARCH: string}}
 */
export const ListOption = {
    NEW:'NEW',
    DELETE:'DELETE',
    VIEW:'VIEW',
    SEARCH:'SEARCH'
}

/**
 * 特殊的数据标记，用于标记一些空、非数据
 * @type {{EMPTY: string}}
 */
export const DataFlag = {
    EMPTY:'EMPTY' //空数据，表示用户未输入内容或下拉菜单选择了空选项
}

export default {
    ListConfig,
    OPType,
    ListOption,
    DataFlag
}