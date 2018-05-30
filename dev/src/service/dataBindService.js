import {userService} from './userService'
import {DataFlag, RegularItemMeta, OPData} from '../../config/sysDefConfig'
import {fluent} from 'es-optional'

/**
 * 用于处理数据绑定转换的服务对象
 * 处理过程：
 *      1)数据从数据库列表转换为页面列表结构。
 *      2)数据从组件表单转换为提交数据的表单。
 * 1)需要对PK（外键）字段进行处理。
 * 2)需要对OP字段进行转换处理。
 * @constructor
 */
function DataBindService() {
}

/**
 * 列表数据库->列表组件转换。
 * 1)处理OP字段的数据格式/
 * 2)处理所有PK字段。
 * @param formStructure 表单结构
 * @param formDocs 查询结果集
 */
DataBindService.prototype.listData2Comp = function (formStructure, formDocs) {
    const metas = formStructure.itemMeta,
        fks = metas.filter(meta => !!meta.fk) || [];
    return formDocs.map(d => {
        const doc = Object.assign({}, d);//防止数据突变
        doc.key = doc.id;
        if (doc.OP) {
            doc.OP = OPData.Data2Comp[doc.OP] || false;//如果包含OP，必须将OP的字符串表述转换为true|false
        }
        for (let fk of fks) { //处理PK的数据，注意外键关联结构rel:{id, label};
            fluent(doc[fk.column]).then(rel => doc[fk.column] = rel.label).else(false);
        }
        return doc;
    })
}

/**
 * 提交表单时进行数据帮顶转换
 * 1)由于Form组件提交的数据是一个扁平结构，现在需要对fk字段进行处理，变成{id, label}结构
 * 2)将OP字典从boolean转换为特定枚举
 * @param formStructure
 * @param formDoc 处理的单条数据，方法会在原始数据上进行修改，注意苏话剧突变的问题。
 * @constructor
 */
DataBindService.prototype.Comp2formDoc = function (formStructure, formDoc) {
    const itemMeta = formStructure.itemMeta;
    let value, options;
    for (let item of itemMeta) {
        //处理下拉菜单的关联外键盘
        if (item.fk && (value = formDoc[item.column]) && (DataFlag.EMPTY !== value) && (options = item.selectOptions)) {
            const i = options.filter(opt => value === opt.value)[0];
            formDoc[item.column] = {id: value, label: i.label};
        }
        if (RegularItemMeta.OP === item.column) {
            formDoc[item.column] = formDoc[item.column] ? OPData.Comp2Data.true : OPData.Comp2Data.false
        }
    }
    return formDoc;
}

/**
 * 帮顶新建数据的固定字段
 * @param formDoc 会直接修改原始数据，注意数据突变。
 */
DataBindService.prototype.buildRegularMetaNew = function (formDoc) {
    !formDoc[RegularItemMeta.createUser] && (formDoc[RegularItemMeta.createUser] = userService.currentUser);
    formDoc[RegularItemMeta.modifyUser] = formDoc[RegularItemMeta.createUser];
    !formDoc[RegularItemMeta.createTime] && (formDoc[RegularItemMeta.createTime] = new Date().getTime());
    formDoc[RegularItemMeta.modifyTime] = formDoc[RegularItemMeta.createTime];
    return formDoc;
}

/**
 * 绑定编辑数据的固定字段
 * @param formDoc 会直接修改原始数据，注意数据突变。
 */
DataBindService.prototype.buildRegularMetaEdit = function (formDoc) {
    !formDoc[RegularItemMeta.modifyUser] && (formDoc[RegularItemMeta.modifyUser] = userService.currentUser);
    !formDoc[RegularItemMeta.modifyTime] && (formDoc[RegularItemMeta.modifyTime] = new Date().getTime());
    return formDoc;
}


export const dataBindService = new DataBindService();
export default DataBindService