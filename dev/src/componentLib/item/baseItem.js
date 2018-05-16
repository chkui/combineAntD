import React from 'react'
import PropTypes from 'prop-types';
import {Form, Tooltip, Icon} from 'antd';
const Item = Form.Item;
import {formItemLayoutCol} from "../../../config/form";
const cn = require('classnames/bind').bind(require('./baseItem.scss'));

/**
 * 基本录入组件
 * @param {object} props
 * @param {string} props.column 组件字段名称
 * @param {string} props.label 组件的标题
 * @param {string} props.tip 录入的提示信息
 * @param {object} props.form 接收 Form的form参数，用于提供验证功能，需要包装组件提供。
 *      参看{@link https://ant.design/components/form-cn/#components-form-demo-validate-other}之后的内容
 * @param props.rules 验证规则
 * @param props.tip 录入的提示信息
 * @Param props.children 包裹的子标签
 *
 * //
 * @Param props.hasFeedback 是否包含验证错误的提示信息，input标签需要提供
 * @constructor
 */
export const BaseEntryItem = props =>
    (<Item colon label={(<span>{props.label}{
        props.tip && (<Tooltip title={props.tip}>&nbsp;<Icon type="question-circle-o"/></Tooltip>)
    }</span>)} hasFeedback={props.hasFeedback} {...formItemLayoutCol}>
        {props.form.getFieldDecorator(props.column, {rules: props.rules,})(props.children)}
    </Item>);

BaseEntryItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string,
    children: PropTypes.node.isRequired,
    hasFeedback: PropTypes.bool
};

export const BaseReadItem = props => (<div>Read</div>);