import React from 'react'
import PropTypes from 'prop-types';
import {Form, Input, Tooltip, Icon} from 'antd';

const Item = Form.Item;
import {formItemLayoutCol} from "../../../config/form";

/**
 *
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @returns {*}
 * @constructor
 */
const EmailInput = props =>
    (<Item colon label={(<span>{props.label}{
        props.tip && (<Tooltip title={props.tip}>
            <Icon type="question-circle-o"/>
        </Tooltip>)
    }</span>)} validateStatus="error" hasFeedback {...formItemLayoutCol}>
        {props.form.getFieldDecorator('email', {
            rules: [{
                type: 'email', message: '不是有效的Email地址   ',
            }, {
                required: true, message: 'Please input your E-mail!',
            }],
        })(
            <Input type="text"/>
        )}
    </Item>);

EmailInput.defaultProps = {
    label: 'E-mail'
};
EmailInput.propTypes = {
    label: PropTypes.string,
    tip: PropTypes.string
};

export default EmailInput