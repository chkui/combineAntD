import React from 'react'
import PropTypes from 'prop-types'
import { Cascader } from 'antd';
import FormWrapper from '../formWrapper'

/**
 * 级联下拉选择器，建议最多到第三层
 * 封装自{@link https://ant.design/components/cascader-cn/}
 * @param props
 * @constructor
 */
export const CascaderEntry = props => (<Cascader {...props}/>)

/**
 * 级联下拉选择器，建议最多到第三层
 * @param props
 * @param props.column 字段名称
 * @param props.label 组件显示的名称
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 提示信息
 * @param props.rules 表单域验证规则
 * @param props.options 下拉菜单结构。
 *    2)[{
 *          value:'',
 *          label:'Group', 分组显示的名称
 *          children:[{
 *              value:'',
 *              label:''
 *              children:[]
 *      }]
 *     }]
 * @constructor
 */
export const CascaderItem = props =>
    (<FormWrapper
        column={props.column}
        label={props.label}
        form={props.form}
        tip={props.tip}
        rules={props.rules}
        hasFeedback>
        <CascaderEntry options={props.options}/>
    </FormWrapper>);
CascaderEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string,
    options: PropTypes.array.isRequired
};