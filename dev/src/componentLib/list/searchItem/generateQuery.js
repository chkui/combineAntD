import {QueryOpt} from '../../../../config/sysDefConfig'

/**
 * 默认创建搜索条件的方法，每个组件都会构建自己的搜索条件
 * 关于每个字段的内容详见 {@link listData} where的说明
 * @param column 字段
 * @param value 数据
 *
 * @return {{
 *
 * }} 如果返回 false等非数值，表示删除数据
 */
const generateQuery = (column, value) => {
    return (value && '' !== value.replace(/ /g, '')) ?
        {
            column,
            value,
            opt: QueryOpt.LIK
        } : false
};

module.exports = generateQuery;