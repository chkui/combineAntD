import React from 'react'
import HorizontalForm from './horizontalForm'
import {connect} from 'react-redux'
import {StateCode} from '../../../config/redux/formReducer'

/**
 * From的装载器，用于过滤store中的数据状态判断是否进行重复渲染。同时用于控制当前显示的表单
 * 1)目前表单只支持HorizontalForm。
 * 2)还未实现重复渲染比对过滤 //TODO
 * @param props
 * @constructor
 */
const FormBootComp = props => {
    return props.stateCode === StateCode.suc ? (<HorizontalForm formStructure={props.form}/>) : null
}


const FormBoot = connect(
    state => {
        const structure = state.formStructureReducer;
        return {
            stateCode: structure.stateCode,
            form: structure.form
        }
    },
    (dispatch, props) => ({
        onLoadForm: id => dispatch(loadFormStructureAction(id))
    })
)(FormBootComp)

export default FormBoot

