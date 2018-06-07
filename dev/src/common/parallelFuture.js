/**
 * 用于整合一部调用集合的辅助类。将需要分布进行的并行异步调用整合到一个对象实例中去运行
 * 使用方法：
 * new ParallelFuture({foo1:(cb)=>{
 *    //do something then get result1
 *    cb(null, result2)
 * }}).run({foo2:cb=>{
 *    //do something then get result2
 *    cb(err)
 * }}).then(result=>{
 *    console.log(result.foo1) // = result1
 * }).else(err=>{
 *    console.log(err.foo2) // = err
 * })
 * @param {array} runAble {key:run} 一个键值对应一个可执行方法 可执行方法必回调一个数值
 * @constructor
 */
function ParallelFuture(runAble) {
    this.callAble = runAble ? runAble : {};
    this.result = false;
    this.error = false;
    this.thenCb = false;
    this.elseCb = false;
}

ParallelFuture.prototype.add = function (runAble) {
    const keys = Object.keys(runAble)
    for (let key of keys) {
        this.callAble[key] = runAble[key];
    }
    return this;
}
ParallelFuture.prototype.run = function () {
    const keys = Object.keys(this.callAble),
        _len = keys.length,
        result = {},
        _this = this;
    let count = 0;
    for (let key of keys) {
        this.callAble[key]((error, result) => {
            if (error) {
                !this.error && (this.error = {})
                this.error[key] = error;
            } else {
                !this.result && (this.result = {})
                this.result[key] = result;
            }
            ++count === _len && (() => {
                this.result && _this.thenCb && _this.thenCb(this.result);
                this.error && _this.elseCb && _this.elseCb(this.error);
            })();
        })
    }
    return this;
}
ParallelFuture.prototype.complete = function (callback) {
    this.thenCb = callback;
    return this;
}
ParallelFuture.prototype.else = function (callback) {
    this.elseCb = callback;
    return this;
}

/**
 * 快速创建串行处理方法
 * @param {object} runAble 可执行调用方法
 * @returns {ParallelFuture}
 */
function parallelFuture(runAble) {
    return new ParallelFuture(runAble);
}

export default {parallelFuture, ParallelFuture}