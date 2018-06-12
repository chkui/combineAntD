import {query} from '../database/data'
import {iocService} from './iocService'

/**
 *
 * @constructor
 */
function RulerCollectService() {

}

/**
 * 检查在指定的表和字段中是否有相同的数据存在，会排除空格
 * @param item
 * @param cb (result)
 */
RulerCollectService.prototype.checkTableSameValueExists = function (item, cb) {

}

/**
 * {@link RulerCollectService}
 */
export const rulerCollectService = iocService.addBean(RulerCollectService);