import React from 'react'
import PropTypes from 'prop-types';
import {Form, Input, Tooltip, Icon} from 'antd';

import {BaseEntryItem, combineAttr} from '../baseItem'

const _DefRules = [{type: 'email', message: '不是有效的电子邮件地址'}]
/**
 * 基础录入功能
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
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