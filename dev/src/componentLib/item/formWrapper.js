import React from 'react'
import PropTypes from 'prop-types';
import {Form, Tooltip, Icon, Spin} from 'antd';
import {FormConsumer} from '../formContext'
import {formItemLayoutCol} from "../../../config/form";
import rulerCollect from '../../rules/submitCollect'
import {dataBindService} from '../../service/dataBindService'
import {fluent} from 'es-optional'

const Item = Form.Item;
const cn = require('classnames/bind').bind(require('./formWrapper.scss'));

/**
 * 表单基本录入组件。通过这个组件的包装，让一些基本组件提供表单联通、校验、数据收集功能
 * 1) Form的form参数通过Context传递，用于提供验证功能。
 *      参看{@link https://ant.design/components/form-cn/#components-form-demo-validate-other}之后的内容
 *
 * @param {object} props
 * @param {object} props 所有包装属性
 * @param {string} props.column 组件字段名称
 * @param {string} props.label 组件的标题
 * @param {string} props.tip 录入的提示信息
 * @param {array} props.rules 验证规则
 * @param {object} props.valuePropName 附加受控属性，用于标记特殊的子节点属性至
 * @param {string} props.initialValue
 * @param {array} props.defRules 默认校验规则，如果rules和defRules同时存在，会将2者进行合并，有限判断rules成立的规则
 * @Param {ReactNode|Element} props.children 包裹的子标签
 * @param {boolean} props.loading 现实是否正在加载状态
 *
 * //
 * @Param props.hasFeedback 是否包含验证错误的提示信息，input标签需要提供
 * @constructor
 */
export default class FormWrapper extends React.Component {
    constructor(...props) {
        super(...props)
        this.options = {};
        this.buildOptions();
    }

    /**
     * 构建校验规则链
     */
    buildOptions() {
        const {props} = this,
            {rules, defRules, valuePropName, initialValue} = props,
            combineRules = [];
        if(rules){
            const compRules = dataBindService.ruleDoc2Comp(rules)
            for(let rule of compRules){
                let one = false;
                if(rule.category && rule.type && rule.options){
                    one = fluent(rulerCollect[rule.category]).then(category=>{
                        return category[rule.type];
                    }).then(foo=>{
                        return foo(rule.options)
                    }).else(false);
                }else{
                    one = false;
                }
                if(one){ 
                    combineRules.push(one);
                }else{
                    console.warn('rule', rule, 'not the specification way of using! please check it!')
                }
            }
        }
        this.options.rules = defRules && Array.isArray(defRules) ? combineRules.concat(defRules) : combineRules;
        valuePropName && (this.options.valuePropName = valuePropName);
        initialValue && (this.options.initialValue = initialValue);
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
                    {form.getFieldDecorator(props.column, this.options)(props.children)}
                    {props.loading && (
                        <Loading/>
                    )}
                </Item>)}
            </FormConsumer>);
    }
}

const Loading = props => (<div className={cn('spin')}><Spin/></div>)


FormWrapper.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    tip: PropTypes.string,
    rules: PropTypes.array,
    defRules: PropTypes.array,
    hasFeedback: PropTypes.bool,
    loading: PropTypes.bool,
};

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





