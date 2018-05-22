import React from 'react'
import PropTypes from 'prop-types';
import {Form, Tooltip, Icon} from 'antd';
import {FormConsumer} from '../formContext'
import {formItemLayoutCol} from "../../../config/form";

const Item = Form.Item;
const cn = require('classnames/bind').bind(require('./baseItem.scss'));

/**
 * 基本录入组件。
 * 1) Form的form参数通过Context传递，用于提供验证功能。
 *      参看{@link https://ant.design/components/form-cn/#components-form-demo-validate-other}之后的内容
 *
 * @param {object} props
 * @param {object} props.attribute 所有包装属性
 * @param {string} props.attribute.column 组件字段名称
 * @param {string} props.attribute.label 组件的标题
 * @param {string} props.attribute.tip 录入的提示信息
 * @param {array} props.attribute.rules 验证规则
 * @param {array} props.attribute.defRules 默认校验规则，如果rules和defRules同时存在，会将2者进行合并，有限判断rules成立的规则
 * @param {string} props.attribute.tip 录入的提示信息
 * @Param {ReactNode|Element} props.children 包裹的子标签
 *
 * //
 * @Param props.hasFeedback 是否包含验证错误的提示信息，input标签需要提供
 * @constructor
 */
export class BaseEntryItem extends React.Component {
    constructor(...props) {
        super(...props)
        this.buildRules();
    }

    /**
     * 构建校验规则链
     */
    buildRules(){
        const props = this.props,
            rules = props.rules || [],
            defRules = props.defRules || [];
        if (Array.isArray(rules) && Array.isArray(defRules)) {
            this.rules = rules.concat(defRules);
        } else {
            throw 'Input params: "rules" and "defRules" must be array!'
        }
    }

    render() {
        const props = this.props;
        return (
            <FormConsumer>
                {form => (<Item colon
                                label={(<span>{props.label}{props.tip && (
                                    <Tooltip title={props.tip}>&nbsp;<Icon
                                        type="question-circle-o"/></Tooltip>)}</span>)}
                                hasFeedback={props.hasFeedback} {...formItemLayoutCol}>
                    {form.getFieldDecorator(props.column, {rules: this.rules})(props.children)}
                </Item>)}
            </FormConsumer>
        );
    }
}

BaseEntryItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    tip: PropTypes.string,
    rules: PropTypes.array,
    defRules: PropTypes.array,
    hasFeedback: PropTypes.bool,
};

export const BaseReadItem = props => (<div>Read</div>);

/**
 * 通用传递属性
 * @type {[string,string,string,string,string,string]}
 */
const _Attributes = [
    'column', //字段名称
    'label', //显示标题
    'tip', //提示信息
    'rules', //校验规则
    'defRules', //默认校验规则，用于一些常规组件的预设检查
    'hasFeedback' //是否显示预校验提示信息
]





