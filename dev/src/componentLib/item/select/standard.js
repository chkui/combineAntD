import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Select, Tooltip, Icon} from 'antd';
import FormWrapper from '../formWrapper'
import {itemService} from '../../../service/itemService'
import {DataFlag} from '../../../../config/sysDefConfig'
import {combineFormMetaSetAction} from '../../../../config/redux/formAction'

const {Option, OptGroup} = Select;

/**
 * 基础下来菜单
 * {@link https://ant.design/components/select-cn/}
 * @param props
 * @constructor
 */
export const StandardSelectEntry = props =>(<Select {...props}/>)

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

class StandardSelectItemComp extends React.Component {
    componentDidMount() {
        const _this = this,
            props = this.props,
            select = props.select,
            options = props.selectOptions,
            fk = props.fk;
        !options && fk && itemService.selectedOptions(fk.fsId, fk.fsType, fk.ids, (err, docs) => {
            if (!err) {
                const options = select.empty ? [{value: DataFlag.EMPTY, label: '未选择'}] : []
                _this.props.onLoadOptions(props.column, 'selectOptions', options.concat(docs));
            }
        })
    }

    render() {
        const props = this.props,
            state = this.state;
        return (<FormWrapper
            column={props.column}
            label={props.label}
            form={props.form}
            tip={props.tip}
            rules={props.rules}
            loading={!props.selectOptions}>
            <Select>{buildSelect(props.selectOptions)}</Select>
        </FormWrapper>)
    }
}

StandardSelectItemComp.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string,
    options: PropTypes.array
};

export const StandardSelectItem = connect(
    () => ({}),
    (dispatch, props) => ({
        onLoadOptions: (column, key, value) => dispatch(combineFormMetaSetAction(column, key, value))
    }))(StandardSelectItemComp);

/**
 * 构建组件
 * @param opts
 */
const buildSelect = opts => {
    return opts ? opts.map(opt => {
        return opt.children ?
            (<OptGroup key={opt.value} label={opt.label}>{buildSelect(opt.children)}</OptGroup>) :
            (<Option key={opt.value} value={opt.value}>{opt.label}</Option>)
    }) : null;
}