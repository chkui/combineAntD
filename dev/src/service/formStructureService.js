import {iocService} from './iocService'
import {QueryOpt} from '../../config/sysDefConfig'
import {query} from '../database/formStructureDao'

function FormStructureService() {

}

/**
 * 根据ID组装表单结构
 * @param fsid
 * @param cb
 */
FormStructureService.prototype.getStructureById = function (fsid, cb) {
    query([{column:'id', value:fsid, opts:QueryOpt.EQU}], false, cb);
}


/**
 * {@link FormStructureService}
 */
export const formStructureService = iocService.addBean(FormStructureService);