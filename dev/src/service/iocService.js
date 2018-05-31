/**
 * 前端小型的IOC容器类，为所有的service相互依赖提供支持
 * //TODO 目前之支持静态应用
 * @constructor
 */
function IocService() {
    this.symbolMap = {};
    this.beanMap = {};
}

/**
 * 想容器内添加一个bean
 * @param bean 类、方法
 * @param beanName 要申明的单例名称
 * @returns {*}
 */
IocService.prototype.addBean = function (bean, beanName) {
    const name = beanName || bean.name;
    const singleton = Symbol.for(name);
    this.symbolMap[singleton] && console.warn(`Bean ${beanName} has exists! check addBean function!`)
    this.symbolMap[singleton] = new bean();
    this.beanMap[bean] = this.symbolMap[singleton];
    return this.symbolMap[singleton]
};

IocService.prototype.getBean = function (bean) {
    return this.beanMap[bean];
};

IocService.prototype.getBeanByName = function (beanName) {
    const singleton = Symbol.for(beanName);
    return this.symbolMap[singleton];
};

const singleton = Symbol.for('iocService'),
    service = {
        [singleton]: new IocService(),
        IocService
    };

export const buildSingleton = (cla, claName) =>{
    const symbol = Symbol.for(claName),
        singleton = {
            [symbol]: new cla()
        };

}

export const iocService = service[singleton];
export default service;