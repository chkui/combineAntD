import {rulerCollectService} from '../service/rulerCollectService'

/**
 * 该项用于校验数据提交
 */

/**
 * 单项规则收集，用于标记数据提时的规则
 * @type {{single: {require: (function({msg: boolean}))}}}
 */
export const single = {
    /**
     * 能输入字符串的最大长度，只适用于输入字符或数字的Input框
     * @param options.len
     * @param options.msg
     * @param options.type 限定校验类型 [string|number] 字符串或数字
     */
    max: (options) => {
        options.type || (options.type = 'string');
        options.msg || (options.msg = `最多输入${options.len}个字符`)
        return {type: options.type, max: options.len, message: options.msg}
    },
    /**
     * 启用该规则时，该域会成为必选或必填项目，在submit时会检查提交数据是否为空。
     * @param {boolean} opts.msg 当域为空时，提示的内容
     * @returns {{required: *}}
     */
    require: (options) => {
        return {required: true, whitespace: true, type: options.type || 'string', message: options.msg || '请输入数据'}
    },
    /**
     *检查在指定的表和字段处是否存在相同数据
     *
     * @param options.itemId 表单id
     * @param options.formType 表单类型
     */
    unIdentical: (options) => {
        return (rule, value, cb) => {
            rulerCollectService.checkTableSameValueExists(options.itemId, value, (err, isExists) => {
                isExists ? cb(`${value} 已经存在`) : cb();
            })
        }
    }
}

export default {
    single
}