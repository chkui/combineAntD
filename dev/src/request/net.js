import {proxyFactory, ProxyMode} from './proxy'

const proxy = proxyFactory(ProxyMode.Browser);

/**
 * 服务器GET接口
 *
 * @param {string} url:[in] 访问后台的路径：例如 '/api/path/param'
 *      get请求尽量不要使用query格式：/api/path?column=label&value=标题&opts=LIK。复杂参数用URL路径的包装一个JSON字符串。
 *      例如：`/api/path/${encodeURI(JSON.stringify([{column:'label',value:'标题',opts:'LIK'}]))}
 *      后台如果是Java切记JsonObject的冒号转换问题和中文编码解码。
 * @param cb (err, result)
 */
export const get = (url, cb) => {
    proxy.get(url, cb)
};
export const post = (url, params, cb) => {
    proxy.post(url, params, cb)
};
