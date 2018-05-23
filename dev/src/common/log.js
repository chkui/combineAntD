function Log() {
    this.innerLog = console.log
}
Log.prototype.info = function (msg) {
    this.innerLog(msg)
}
const _ins = new Log()

export const info = msg => _ins.info(msg);
export const log = info;

export default {info, log}