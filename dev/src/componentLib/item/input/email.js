import React from 'react'
import PropTypes from 'prop-types';
import {Form, Input, Tooltip, Icon} from 'antd';

import {BaseEntryItem} from '../baseItem'

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
    (<BaseEntryItem
        column={props.column}
        label={props.label}
        form={props.form}
        tip={props.tip}
        rules={props.rules}
        hasFeedback>
        <Input type="text"/>
    </BaseEntryItem>);

EmailEntry.defaultProps = {
    label: 'E-mail',
    tip: '请输入电子邮件地址',
    rules: [{
        type: 'email', message: '不是有效的电子邮件地址',
    }, {
        required: false, message: '请输入电子邮件信息',
    }]
};
EmailEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string,
    form: PropTypes.object.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};

EmailEntry.attribute = {
    type:'email'
}