import {iocService} from './iocService'
import {get} from '../request/net'
import {urlBuilder, decode} from '../../config/url'

function FormStructureService() {
}

/**
 * 根据ID组装表单结构
 * @param fsid
 * @param cb (err, fs)
 */
FormStructureService.prototype.getStructureById = function (fsid, cb) {
    get(urlBuilder.formStructure.getOneById({id: fsid}), (ret)=>{
        if(0 === ret.code){
            cb(null, decode(ret.data))
        }else{
            cn(ret.msg)
        }
    })
}


/**
 * {@link FormStructureService}
 */
export const formStructureService = iocService.addBean(FormStructureService);