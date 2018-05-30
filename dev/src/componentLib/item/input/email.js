import React from 'react'
import PropTypes from 'prop-types';
import {Input} from 'antd';

import FormWrapper from '../formWrapper'

const _DefRules = [{type: 'email', message: '不是有效的电子邮件地址'}]

/**
 * 基本邮件录入
 * 封装子Antd的 input,详见 {@link https://ant.design/components/input-cn/}
 * @param props
 * @param props.column 标签字段
 * @param props.label 标签显示内容
 * @param props.tip 录入的提示信息
 * @param props.rules 扩展规则
 * @returns {*}
 * @constructor
 */
export const EmailEntry = props =>
    <Input type="email" {...props}/>

/**
 * 基础录入功能
 * @param props
 * @param props.column 标签字段
 * @param props.label 标签显示内容
 * @param props.tip 录入的提示信息
 * @param props.rules 扩展规则
 * @returns {*}
 * @constructor
 */
export const EmailItem = props =>
    (<FormWrapper {...props} defRules={_DefRules} hasFeedback>
        <EmailEntry/>
    </FormWrapper>)


EmailItem.defaultProps = {
    label: 'E-mail',
    tip: '邮件地址,例如: name@domian.com'
};
EmailItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string,
    rules: PropTypes.array,
    tip: PropTypes.string
};

export default {
    EmailEntry,
    EmailItem
}