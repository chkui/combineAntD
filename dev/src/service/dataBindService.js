import {userService} from './userService'
import {DataFlag, RegularItemMeta, SysFlag} from '../../config/sysDefConfig'
import {iocService} from './iocService'
import {decode} from '../../config/url'

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
 * B_ROW_VALUE表数据转换为前端可操作数据
 * @param docs
 * @return {*}
 */
DataBindService.prototype.dataValue2Options = function (docs) {
    return docs && docs.map(i=>({
        id: i.id,
        fsId: i.fsid,
        rowId: i.rowid,
        itemId: i.itemid,
        value:i.value
    }))
}


/**
 * ruler数据从数据库字段转换为前端组件使用的字段
 * @param docs
 * @return {*}
 */
DataBindService.prototype.ruleDoc2Comp = function (docs) {
    return docs && docs.map(i=>({
        category:i.rule_category,
        type:i.rule_type,
        options:decode(i.expression)
    }))
}

/**
 * 列表数据库->列表组件转换。
 * 1)处理OP字段的数据格式/
 * 2)处理所有PK字段。
 * @param formStructure 表单结构
 * @param formDocs 查询结果集
 */
/*DataBindService.prototype.listData2Comp = function (formStructure, formDocs) {
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
}*/

/**
 * 提交表单时进行数据帮顶转换
 * 1)由于Form组件提交的数据是一个扁平结构，现在需要对fk字段进行处理，变成{id, label}结构
 * 2)将OP字典从boolean转换为特定枚举
 * @param formStructure
 * @param formDoc 处理的单条数据，方法会在原始数据上进行修改，注意苏话剧突变的问题。
 * @constructor
 */
/*DataBindService.prototype.Comp2formDoc = function (formStructure, formDoc) {
    const itemMeta = formStructure.itemMeta;
    let value, options;
    for (let item of itemMeta) {
        //处理下拉菜单的关联外键
        if (item.fk && (value = formDoc[item.column]) && (DataFlag.EMPTY !== value) && (options = item.selectOptions)) {
            const i = options.filter(opt => value === opt.value)[0];
            formDoc[item.column] = {id: value, label: i.label};
        }
        if (RegularItemMeta.OP === item.column) {
            formDoc[item.column] = formDoc[item.column] ? OPData.Comp2Data.true : OPData.Comp2Data.false
        }
    }
    return formDoc;
}*/

/**
 * 绑定新建数据的固定字段
 * @param formDoc 会直接修改原始数据，注意数据突变。
 */
DataBindService.prototype.buildRegularMetaNew = function (formDoc) {
    formDoc[RegularItemMeta.createuser] = userService.currentUserId();
    formDoc[RegularItemMeta.modifyuser] = userService.currentUserId();
    formDoc[RegularItemMeta.createtime] = new Date().getTime();
    formDoc[RegularItemMeta.modifytime] = formDoc[RegularItemMeta.createtime];
    formDoc[RegularItemMeta.op] = formDoc[RegularItemMeta.op] ? SysFlag.ENABLE : SysFlag.DISABLE;
    return formDoc;
}

/**
 * 绑定编辑数据的固定字段
 * @param formDoc 会直接修改原始数据，注意数据突变。
 */
DataBindService.prototype.buildRegularMetaEdit = function (formDoc) {
    !formDoc[RegularItemMeta.modifyuser] && (formDoc[RegularItemMeta.modifyuser] = userService.currentUser);
    !formDoc[RegularItemMeta.modifytime] && (formDoc[RegularItemMeta.modifytime] = new Date().getTime());
    return formDoc;
}


/**
 * {@link DataBindService}
 */
export const dataBindService = iocService.addBean(DataBindService);