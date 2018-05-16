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
 * @param props.opts 下拉菜单结构。
 *    1)[{id:'', name: ''}..]
 *    2)[{
 *          id:'' 菜单选择值
 *          type:'option', 下拉菜单类型 option表示是一个下拉菜单选项
 *          name:'', 菜单名称
 *      }, {
 *          id:'',
 *          type:'group', group表示是一个下拉菜单分组标记
 *          name:'Group', 分组显示的名称
 *          children:{ 子菜单
 *              id:'' 菜单选择值
 *              type:'option',
 *              name:''
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
        <SelectWrapper opts={props.opts}/>
    </BaseEntryItem>);
StandardEntry.defaultProps = {
    rules: [{required: false, message: '请选择相关内容',}]
};
StandardEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string,
    opts: PropTypes.array.isRequired
};
StandardEntry.attribute = {
    type:'email'
}

/**
 * 支持一级或二级菜单，如果是多级联动，请选择Cascader
 * @param {array} props.opts 下拉菜单选项，分组选项。
 *      列表结构：[{
 *          id:'' 菜单选择值
 *          type:'option', 下拉菜单类型 option表示是一个下拉菜单选项
 *          name:'', 菜单名称
 *      }, {
 *          id:'',
 *          type:'group', group表示是一个下拉菜单分组标记
 *          name:'Group', 分组显示的名称
 *          children:{ 子菜单
 *              id:'' 菜单选择值
 *              type:'option',
 *              name:''
 *      }}]
 */
class SelectWrapper extends React.Component {
    render() {
        const opts = this.props.opts;
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
    return ('group' === opt.type) ?
        (<OptGroup key={opt.id} label={opt.name}>{buildSelect(opt.children)}</OptGroup>) :
        (<Option key={opt.id} value={opt.id}>{opt.name}</Option>)
})