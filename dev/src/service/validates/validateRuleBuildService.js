/**
 * 校验规则生成工厂，用于校验表单的内容。
 * Antd基于开源项目async-validator（https://github.com/yiminghe/async-validator/）已经预设了丰富多样的校验规则。
 * 验证器的目的是结合已有校验工具和业务要求新开发的校验工具：1.给予表单逻辑的验证、2.给予数据库字段数据的验证、3.二次开发的验证。
 * 每个表单域的验证器是一个列表，同一个表单域可以同时设置多个验证规则。
 *
 */

/**
 *
 * @param validates [{type:'enum',value:['Alice','Bob','Chk']}]
 * @constructor
 */
export function ValidateRuleBuildService(validates) {
    if (Array.isArray(validates)) {
        this.list = validates;
    } else {
        throw `ValidateType Error! The validates params must be an Array, but is ${typeof validates}`
    }
}

/**
 * 执行验证
 */
ValidateRuleBuildService.prototype.validate = function () {
    const rules = [];
    for(let rule of this.list){

    }
};

const validateType = {
    enumType:{

    }
}
