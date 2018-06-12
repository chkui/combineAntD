import {rulerCollectService} from "../../service/rulerCollectService";

const unIdentical = options =>{
    return (rule, value, cb) => {
        rulerCollectService.checkTableSameValueExists(options.formId, options.formType, rule.field, value, (isExists) => {
            isExists ? cb(`${value} 已经存在`) : cb();
        })
    }
}