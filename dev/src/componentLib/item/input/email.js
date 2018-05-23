import React from 'react'
import PropTypes from 'prop-types';
import {Input} from 'antd';

import {BaseEntryItem} from '../baseItem'

const _DefRules = [{type: 'email', message: '不是有效的电子邮件地址'}]
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
export const EmailEntry = props =>
    (<BaseEntryItem {...props} defRules={_DefRules} hasFeedback>
        <Input type="text"/>
    </BaseEntryItem>)


EmailEntry.defaultProps = {
    label: 'E-mail',
    tip: '邮件地址,例如: name@domian.com'
};
EmailEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string,
    rules: PropTypes.array,
    tip: PropTypes.string
};

EmailEntry.attribute = {
    category: 'input',
    type: 'email'
}