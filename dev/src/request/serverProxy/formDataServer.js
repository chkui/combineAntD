import {QueryOpt} from '../../../config/sysDefConfig'
import {queryFormItemValue} from '../../database/rowValueDao'
import {resultToList} from './commonServer'

/**
 *
 * @param params
 * @param params.fsId
 * @param params.rowId
 * @param params.itemId
 * @param callback
 */
export const getAssociated = (params, callback) => {
    const {fsId, rowId, itemId} = params;

    queryFormItemValue([{
        column:'rowid',
        value:rowId,
        opts:QueryOpt.EQU
    },{
        column:'itemid',
        value:itemId,
        opts:QueryOpt.EQU
    }], false, (err, resultSet) => {
        if(!err){
            const list = resultToList(resultSet).map(item=>{
                item.fsid = fsId;
                return item;
            });
            callback(null, list)
        }else{
            callback(err);
        }
    }, false);
}