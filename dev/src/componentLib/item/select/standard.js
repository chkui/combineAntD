import React from 'react'
import PropTypes from 'prop-types';
import {Select, Tooltip, Icon} from 'antd';
import {BaseEntryItem} from '../baseItem'
import {itemService} from '../../../service/itemService'
import {DataFlag} from '../../../../config/sysDefConfig'

const {Option, OptGroup} = Select;

/**
 * 基础单项下拉菜单，提供分组功能。
 * 1)优先使用props.options传递的参数，如果参数不存在，则尝试夹在关联项
 * 2)
 *
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
 * @param select, 下拉菜单关联的数据项，如果options不存在，会从指定的表单项开始查数据
 * @returns {*}
 * @constructor
 */
export const StandardEntry = class extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {options: this.props.options}
    }

    componentDidMount() {
        const select = this.props.select;
        itemService.selectedOptions(select.form, select.type, select.ids, (err, docs)=>{
            const options = select.empty ? [{value:DataFlag.EMPTY, label: '未选择'}] : []
            this.setState({
                options:options.concat(docs.map(i=>({value:i.id, label:i.label})))
            })
        })
    }

    render() {
        const props = this.props,
            state = this.state;
        return (<BaseEntryItem
            column={props.column}
            label={props.label}
            form={props.form}
            tip={props.tip}
            rules={props.rules}
            loading={!state.options}>
            <Select>{buildSelect(state.options)}</Select>
        </BaseEntryItem>)
    }
};
StandardEntry.defaultProps = {
    rules: [{required: false, message: '请选择相关内容',}]
};
StandardEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string,
    options: PropTypes.array
};

/**
 * 构建组件
 * @param opts
 */
const buildSelect = opts => {
    return opts ? opts.map(opt => {
        return opt.children ?
            (<OptGroup key={opt.value} label={opt.label}>{buildSelect(opt.children)}</OptGroup>) :
            (<Option key={opt.value} value={opt.value}>{opt.label}</Option>)
    }):false;
}