import React from 'react'
import SearchTable from './searchTable'
import {connect} from 'react-redux'
import {StateCode} from '../../../config/redux/formReducer'

/**
 * 列表的装载器，用于过滤store中的数据状态判断是否进行重复渲染。
 * 1)目前表单只支持SearchTable。
 * 2)还未实现重复渲染比对过滤 //TODO
 * @param props
 * @constructor
 */
const ListBootComp = props => {
    return props.stateCode === StateCode.suc ? (<SearchTable formStructure={props.form}/>) : null
}

const ListBoot = connect(
    state => {
        const structure = state.formStructureReducer;
        return {
            stateCode: structure.stateCode,
            form: structure.form
        }
    }
)(ListBootComp)

export default ListBoot

