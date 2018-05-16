/**
 * antd预设的类型和处理模板
 * @type {{enum: (function(*))}}
 */
export const antdPreinstallType = {
    enum: enumType,

}

const buildDefAttr = options =>{
    return {
        required:options.required,

    }
}

/**
 * 枚举类型
 * @param {object} options
 * @param {string} options.type 'enum'
 * @param {array} options.values ['Alice','Bob','Chk']
 * @param {boolean} options.required 数值必须存在的标记
 */
export const enumType = options => {
    return {type: 'enum', enum: options.values}
}