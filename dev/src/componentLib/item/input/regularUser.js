import React from 'react'
import PropTypes from 'prop-types';
import ReadOnlyInput from '../readOnly/readOnlyInput'
import FormWrapper from '../formWrapper'
import {userService} from '../../../service/userService'

export const RegularUserEntry = ReadOnlyInput;
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
export const RegularUserItem = props =>{
    const params = Object.assign({}, props)
    delete params.formStructure;
    return (<FormWrapper {...props} initialValue={userService.currentUserName()}>
        <ReadOnlyInput {...params}/>
    </FormWrapper>)
}

RegularUserItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};