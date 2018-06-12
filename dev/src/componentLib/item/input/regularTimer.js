import React from 'react'
import PropTypes from 'prop-types';
import ReadOnlyInput from '../readOnly/readOnlyInput'
import FormWrapper from '../formWrapper'
import {timestamp2Timer} from '../../../common/timerFormat'

export const RegularTimerEntry = ReadOnlyInput;
/**
 * 用于表单域的主键包装组件，用于显示或生成主键
 * @param props
 * @param props.column
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @returns {*}
 * @constructor
 */
export const RegularTimerItem = props =>{
    const params = Object.assign({}, props)
    delete params.formStructure;
    return (<FormWrapper {...props} initialValue={timestamp2Timer(new Date().getTime())}>
        <ReadOnlyInput {...params}/>
    </FormWrapper>)
}

RegularTimerItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};