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
export const TextEntry = props =>
    (<BaseEntryItem {...props} hasFeedback>
        <Input type="text"/>
    </BaseEntryItem>)

TextEntry.defaultProps = {
    rules: [{
        type: 'string', max: 32, message: '限定输入32个字符'
    }]
};
TextEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};