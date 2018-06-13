import {query} from '../database/data'
import {iocService} from './iocService'
import {get} from '../request/net'
import {urlBuilder, decode} from '../../config/url'

/**
 *
 * @constructor
 */
function RulerCollectService() {

}

/**
 * 检查在指定的表和字段中是否有相同的数据存在，会排除空格
 * @param itemId 要查询数据的itemId
 * @param value 要查询的数据
 * @param cb (result)
 */
RulerCollectService.prototype.checkTableSameValueExists = function (itemId, value, cb) {
    get(urlBuilder.formData.checkItemDataExists({itemId,value}), result=>{
        if(0 === result.code){
            cb(null, 0 < parseInt(result.data))
        }else{
            cb(result.msg)
        }
    })
}

/**
 * {@link RulerCollectService}
 */
export const rulerCollectService = iocService.addBean(RulerCollectService);