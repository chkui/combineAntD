import React from 'react'
import PropTypes from 'prop-types';
import {Select, Tooltip, Icon} from 'antd';
import {BaseEntryItem} from '../baseItem'

const {Option, OptGroup} = Select;

/**
 * 基础录入功能
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @param props.options 下拉菜单结构。
 *    1)[{value:'', label: ''}..]
 *    2)[{
 *          value:'' 菜单选择值
 *          label:'option', 下拉菜单类型 option表示是一个下拉菜单选项
 *          name:'', 菜单名称
 *      }, {
 *          value:'',
 *          label:'Group', 分组显示的名称
 *          children:{ 子菜单
 *              value:'' 菜单选择值
 *              label:'option'
 *      }}]
 * @returns {*}
 * @constructor
 */
export const StandardEntry = props =>
    (<BaseEntryItem
        column={props.column}
        label={props.label}
        form={props.form}
        tip={props.tip}
        rules={props.rules}
        hasFeedback>
        <SelectWrapper options={props.options}/>
    </BaseEntryItem>);
StandardEntry.defaultProps = {
    rules: [{required: false, message: '请选择相关内容',}]
};
StandardEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string,
    options: PropTypes.array.isRequired
};
StandardEntry.attribute = {
    category:'select',
    type: 'standard'
}

/**
 * 支持一级或二级菜单，如果是多级联动，请选择Cascader
 * @param props.options 下拉菜单结构。
 *    1)[{value:'', label: ''}..]
 *    2)[{
 *          value:'' 菜单选择值
 *          label:'option', 下拉菜单类型 option表示是一个下拉菜单选项
 *          name:'', 菜单名称
 *      }, {
 *          value:'',
 *          label:'Group', 分组显示的名称
 *          children:{ 子菜单
 *              id:'' 菜单选择值
 *              type:'option',
 *              name:''
 *      }}]
 */
class SelectWrapper extends React.Component {
    render() {
        const opts = this.props.options;
        if (opts) {
            return (<Select>{buildSelect(opts)}</Select>)
        } else {
            throw 'Input select opts is invalid. please check config! current value:' + opts;
        }
    }
}

/**
 * 构建组件
 * @param opts
 */
const buildSelect = opts => opts.map(opt => {
    return opt.children ?
        (<OptGroup key={opt.value} label={opt.label}>{buildSelect(opt.children)}</OptGroup>) :
        (<Option key={opt.value} value={opt.value}>{opt.label}</Option>)
})