import React from 'react'
import PropTypes from 'prop-types';
import {Form, Input, Tooltip, Icon} from 'antd';

import {BaseEntryItem} from '../baseItem'

/**
 * 基本文字输入框
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @returns {*}
 * @constructor
 */
export const StringEntry = props =>
    (<BaseEntryItem
        column={props.column}
        label={props.label}
        form={props.form}
        tip={props.tip}
        rules={props.rules}
        hasFeedback>
        <Input type="text"/>
    </BaseEntryItem>);

StringEntry.defaultProps = {
    rules: [{
        type: 'string', max: 32, message: '最大只能输入32个字符'
    }]
};
StringEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    form: PropTypes.object.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};

StringEntry.attribute = {
    category:'input',
    type: 'string'
}