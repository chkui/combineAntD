import React from 'react'
import PropTypes from 'prop-types';
import {Form, Input, Tooltip, Icon} from 'antd';

import FormWrapper from '../formWrapper'


/**
 * 基本文字输入框，
 * 封装子Antd的 input,详见 {@link https://ant.design/components/input-cn/}
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @constructor
 */
export const TextEntry = props => <Input type="text" {...props}/>;

export const TextRead = props=><div>read</div>;

/**
 * 基本文字输入框，(用于配合表单域使用)
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @returns {*}
 * @constructor
 */
export const TextItem = props =>
    (<FormWrapper {...props} hasFeedback>
        <TextEntry type="text"/>
    </FormWrapper>)

TextItem.defaultProps = {
    rules: [{
        type: 'string', max: 32, message: '限定输入32个字符'
    }]
};
TextItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};

export default {
    TextEntry,
    TextRead,
    TextItem
}