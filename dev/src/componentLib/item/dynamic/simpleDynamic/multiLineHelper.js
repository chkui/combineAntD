import {FormItemType} from "../../../../../config/sysDefConfig";

/**
 * 将数据根据type切换为展示格式。
 * @param valueAndTypes
 */
export const valueAndTypes2View = valueAndTypes => {
    return valueAndTypes ? (Array.isArray(valueAndTypes) ? array(valueAndTypes) : one(valueAndTypes)):[];
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

export const view2ValueAndTypes = valueAndType =>{
    const {value, type} = valueAndType;
    switch (type) {
        case FormItemType.DOUBL:
            return value.replace(/,/g, 'o');
        case FormItemType.MONEY:
            return `￥${paramsNumber(value)}`;
        default:
            return value;
    }
}