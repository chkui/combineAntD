import {fluent} from 'es-optional'
import {serialFuture} from '../../common/serialFuture'
import {QueryOpt} from '../../../config/sysDefConfig'
import {getLastFormStructure} from '../../database/formStructureDao'
import {queryFormStructureItem} from '../../database/formStructureItemDao'
import {getFormStructureItemRulesByItemIds} from '../../database/formStructureItemRulesDao'

/**
 * 根据ID获取表单结构
 * @param params
 * @param callback
 */
export const getStructureById = (params, callback) => {
    serialFuture().then({
        form: (result, cb) => {
            getLastFormStructure(params.id, cb)
        }
    }).then({
        items: (result, cb) => {
            const row = result.form[0];
            queryFormStructureItem([{
                column: 'fsid',
                value: row.id,
                opts: QueryOpt.EQU
            }, {
                column: 'fsver',
                value: row.ver,
                opts: QueryOpt.EQU
            }], false, cb)
        }
    }).then({
        rules: (result, cb) => {
            const items = result.items, ids = [];
            for (let item of items) {
                ids.push(item.id)
            }
            getFormStructureItemRulesByItemIds(ids, cb);
        }
    }).then({
        combine: (result, cb) => {
            const form = result.form[0],
                items = result.items,
                rules = result.rules;
            console.log(form);
            console.log(items);
            console.log(rules);
            const formStructure = {
                    id: form.id,
                    ver: form.ver,
                    label: form.label,
                    type: form.type,
                    list: {
                        view: form.l_view,
                        new: form.l_new,
                        delete: form.l_delete,
                        search: form.l_search
                    },
                    createTime: form.createtime,
                    createUser: form.createuser,
                    modifyTIme: form.modifytime,
                    modifyUser: form.modifyuser,
                    OP: form.op,
                },
                formItems = [];
            for(let item of items){
                const id = item.id,
                    meta = {
                        id:item.id,
                        category:item.comp_category,
                        type:item.comp_type,
                        column:item.column,
                        label:item.label,
                        listShow:item.l_show,
                        sort:item.l_sort,
                        search:item.l_search,
                        tip:item.tip,
                        dataType:item.type
                    },
                    metaRules = [];
                for(let rule of rules){
                    if(id === rule.itemid){
                        metaRules.push(rule);
                    }
                }
                metaRules && 0 < metaRules.length && (meta.rules = rules)
                formItems.push(meta)
            }
            formStructure.itemMeta = formItems;
            callback(null, formStructure)
        }
    }).error((result, err) => {
        callback(err)
    });
}