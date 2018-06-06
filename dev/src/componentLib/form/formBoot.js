import React from 'react'
import HorizontalForm from './horizontalForm'
import {StateCode} from '../../../config/redux/formReducer'

/**
 * From的装载器，用于过滤store中的数据状态判断是否进行重复渲染。同时用于控制当前显示的表单
 * 1)目前表单只支持HorizontalForm。
 * 2)还未实现重复渲染比对过滤 //TODO
 * @param props
 * @param {React} props.FormComponent 加载渲染组件，从父组件传递进来的一个表单组件，该组件可以是任意形式。
 *  FormBoo会向当前组件传递表单组件的结构,如果组件不存在，则使用默认的HorizontalForm
 * @param {object} props.formStructure 组件结构，
 * @param {function} props.loadForm 加载表单结构的方法  props.loadForm(fsid)
 * @constructor
 */
const FormBoot = props => {
    const {FormComponent} = props,
        Comp = FormComponent ? FormComponent : HorizontalForm;
    return props.stateCode === StateCode.suc ? (<Comp formStructure={props.formStructure}/>) : null
}

export default FormBoot

