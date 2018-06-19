import {FormItemType} from "../../../../../config/sysDefConfig";

/**
 * 过滤纯数字
 * @param valueAndType
 * @return {{type: *, value: *}}
 */
export const checkNumber = valueAndType => {
    const {type, value} = valueAndType;
    return {type, value: type === FormItemType.VCHAR ? value : value.replace(/[^0-9]/ig, '')};
}

/**
 * 将数据根据type切换为展示格式。
 * @param valueAndTypes
 */
export const valueAndTypes2View = valueAndTypes => {
    return valueAndTypes ? (Array.isArray(valueAndTypes) ? array(valueAndTypes) : one(valueAndTypes)) : [];
};

const array = valueAndTypes => valueAndTypes.map(v_t => one(v_t))

const one = valueAndType => {
    const {value, type} = valueAndType;
    switch (type) {
        case FormItemType.DOUBL:
            return paramsNumber(value);
        case FormItemType.MONEY:
            return `￥${paramsNumber(value)}`;
        default:
            return value;
    }
};

const paramsNumber = value => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 将视图转换为数据
 * @param valueAndType
 * @return {*}
 */
export const view2ValueAndTypes = valueAndType => {
    const {value, type} = valueAndType;
    switch (type) {
        case FormItemType.DOUBL:
            return {value: value.replace(/,/g, 'o'), type: valueAndType.type};
        case FormItemType.MONEY:
            return {value: value.replace(/￥/g, 'o'), type: valueAndType.type};
        default:
            return valueAndType;
    }
}