import _Config from '../../config/sysDefConfig'
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
function DataBindService(){}

/**
 * 列表数据库->列表组件转换。
 * 1)处理OP字段的数据格式/
 * 2)处理所有PK字段。
 * @param form
 * @param docs
 */
DataBindService.prototype.listData2Comp = function (form, docs) {
    const metas = form.itemMetaSet,
        pks = metas.filter(meta=>!!meta.pk) || [];
    return docs.map(doc => {
        doc.key = doc.id;
        if(doc.OP){
            doc.OP = _Config.OPData[doc.OP] || false;//如果包含OP，必须将OP的字符串表述转换为true|false
        }
        for(let pk of pks){ //处理PK的数据，注意外键关联结构rel:{id, label};
            fluent(doc[pk.column]).then(rel=>doc[pk.column] = rel.label).else(false);
        }
        return doc;
    })
}

export const dataBindService = new DataBindService();
export default DataBindService