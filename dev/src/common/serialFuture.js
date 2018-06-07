/**
 * 串行处理方法。方法的作用是将一系列需要回调处理的串行方法整理成一串并行的回调。
 * 该方法与Promise不同，并不需要任何浏览器原声支持，并且依然保持回调结构而非RX结构。
 * 使用方法：
 * import {serialFuture} From 'es-optional'
 *
 * serialFuture().then({key2:(pre, cb)=>{
 *    //异步代码获取 result
 *    cb(null, result);
 * }}).then({key2:(pre, cb)=>{
 *    console.log(pre); //输出=>key1:result
 *    //result2
 *    cb(null, result2);
 * }}).error((result, errInfo)=>{
 *    //result表示之前正常处理的结果。
 *    //errInfo是任意位置调用cb('错误')时传递的信息
 * })
 * @param {boolean} inner 默认情况下不必使用这个参数。当设定为true时，不会自动启动异步调用。
 * 需要获取SerialFuture实力并调用run方法。
 * @constructor
 */
export function SerialFuture(inner) {
    this.callAble = false;
    this.errCallAble = false;
    this.result = {};
    this.next = false;
    if(!inner){
        const _this = this;
        setTimeout(()=>{
            _this.run()
        }, 100);
    }
}

/**
 * 输入处理数值
 * @param {object} params {key:callback}
 *    callback(err, result) result是之前处理的结果集合：{key:result}。
 */
SerialFuture.prototype.then = function (params) {
    this.name = Object.keys(params)[0];
    this.callAble = params[this.name];
    this.next = new SerialFuture(true);
    return this.next;
};
/**
 * 运行
 */
SerialFuture.prototype.run = function(){
    this.onNotify(this.result);
};

SerialFuture.prototype.notify = function(){
    this.next && this.next.onNotify(this.result);
};

SerialFuture.prototype.onNotify = function(result){
    this.result = result;
    const _this = this,
        cb = (err, ret) => {
            if(err){
                let cur = _this;
                while(!cur.errCallAble){
                    cur = cur.next;
                }
                cur.errCallAble && cur.errCallAble(_this.result, err)
            }else{
                _this.result[_this.name] = ret;
                _this.notify();
            }
        };
    _this.callAble(_this.result, cb);
};

/**
 *
 * @param cb (result ,err)
 */
SerialFuture.prototype.error = function (cb) {
    this.errCallAble = cb;
};

/**
 * 快速创建串行处理方法
 * @returns {SerialFuture}
 */
export function serialFuture() {
    return new SerialFuture();
}

export default {serialFuture, SerialFuture}