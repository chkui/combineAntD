import {iocService} from './iocService'
import {dataBindService} from './dataBindService'
import {post} from '../request/net'
import {urlBuilder, decode} from '../../config/url'

function FormDataService() {
}

/**
 * 单项表单数据提交服务。
 * @param fsId 表单ID
 * @param fsVer 表单版本
 * @param fsData 数据项 {key:data}
 * @param cb 回调方法
 */
FormDataService.prototype.submit = function (fsId, fsVer, fsData, cb) {
    const submitData = dataBindService.buildRegularMetaNew(fsData);
    post(urlBuilder.formData.submitData(), {fsId, fsVer, data: submitData}, result=>{
        if(0 === result.code){
            cb(null, decode(result.data));
        }else{
            cb(result.msg)
        }
    })
}

/**
 * {@link FormDataService}
 */
export const formDataService = iocService.addBean(FormDataService);