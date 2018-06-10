import {urlBase, decode, encode} from '../../config/url'
import {menuGetAll} from './serverProxy/menuServer'
import {getFormStructureById} from './serverProxy/formStructureServer'
import {getAssociated} from './serverProxy/formDataServer'
import {listQuery} from './serverProxy/formDataServer'

/**
 * 代理模式，浏览器模式或网络服务器模式
 * @type {{Browser: number, Net: number}}
 */
export const ProxyMode = {
    Browser: 1,
    Net: 2
}

/**
 * 代理工厂 //TODO目前只支持本地server模式
 * @param mode
 * @returns {LocalServerProxy}
 */
export const proxyFactory = (mode) => {
    return new LocalServerProxy();
}

/**
 * 用于代理请求，切换在服务端运行和前端运行的数据访问
 * @param mode 运行模式
 * @constructor
 */
function NetProxy(mode) {
}

NetProxy.prototype.get = function (url, cb) {

}
NetProxy.prototype.post = function (url, cb) {

}

function LocalServerProxy(mode) {
    this.mode = mode;
    const map = this.LocalServerMapping = {},
        menu = urlBase.menu,
        formStructure = urlBase.formStructure,
        formData = urlBase.formData;
    map[menu.module + menu.options.getAll] = menuGetAll;
    map[formStructure.module + formStructure.options.getOneById] = getFormStructureById;
    map[formData.module + formData.options.getAssociated] = getAssociated;
    map[formData.module + formData.options.listQuery] = listQuery;
}

/**
 * 服务器GET接口
 *
 * @param {string} url:[in] 访问后台的路径：例如 '/api/path/param'
 *      get请求尽量不要使用query格式：/api/path?column=label&value=标题&opts=LIK。复杂参数用URL路径的包装一个JSON字符串。
 *      例如：`/api/path/${encodeURI(JSON.stringify([{column:'label',value:'标题',opts:'LIK'}]))}
 *      后台如果是Java切记JsonObject的冒号转换问题和中文编码解码。
 * @param cb ({
 *    code:
 *    msg:
 *    data:
 * })
 */
LocalServerProxy.prototype.get = function (url, cb) {
    const pos = url.lastIndexOf('/'),
        path = url.substring(0, pos),
        params = url.substring(pos + 1);
    this.LocalServerMapping[path](decode(params), (err, result) => {
        if (err) {
            cb({code: -1, msg: err})
        } else {
            cb({
                code: 0,
                data: encode(result)
            })
        }
    })
};
LocalServerProxy.prototype.post = function (url, cb) {

};


export default {
    ProxyMode,
    proxyFactory
}

