import {iocService} from './iocService'
import {get} from '../request/net'
import {urlBuilder} from '../../config/url'

function FormStructureService() {
}

/**
 * 根据ID组装表单结构
 * @param fsid
 * @param cb
 */
FormStructureService.prototype.getStructureById = function (fsid, cb) {
    get(urlBuilder.formStructure.getOneById({id: fsid}), (err, result)=>{

    })
}


/**
 * {@link FormStructureService}
 */
export const formStructureService = iocService.addBean(FormStructureService);