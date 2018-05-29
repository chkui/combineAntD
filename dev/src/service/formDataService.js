import {add} from '../database/data'
import {DataFlag} from '../../config/sysDefConfig'
import {dataBindService} from './dataBindService'

function FormDataService() {
}

/**
 * 单项表单数据提交服务。
 * @param fs 表结构
 * @param fd 提交单项数据
 * @param cb 回调方法
 */
FormDataService.prototype.submit = function (fs, fd, cb) {
    try {
        add(fs.id, fs.type, dataBindService.buildRegularMetaNew(dataBindService.Comp2formDoc(fs, fd)), cb)
    } catch (err) {
        console.error(err);
        cb(err)
    }
}

export const formDataService = new FormDataService();
export default FormDataService