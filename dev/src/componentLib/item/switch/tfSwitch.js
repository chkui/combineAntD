import React from 'react'
import PropTypes from 'prop-types';
import {Switch} from 'antd';

import FormWrapper from '../formWrapper'

/**
 * 标准双向开关
 * 封装自{@link https://ant.design/components/switch-cn/}
 * @param props
 * @constructor
 */
export const TFSwitchEntry = props =>(<Switch {...props}/>)

/**
 * 标准开关
 * @param props
 * @param props.value 是否选择的标记[true|false]
 * @param props.column 标签字段
 * @param props.label 标签显示内容
 * @param props.tip 录入的提示信息
 * @param props.rules 扩展规则
 * @returns {*}
 * @constructor
 */
export const TFSwitchItem = props =>
    (<FormWrapper {...props} valuePropName="checked" initialValue={true}>
        <TFSwitchEntry/>
    </FormWrapper>)
TFSwitchItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};