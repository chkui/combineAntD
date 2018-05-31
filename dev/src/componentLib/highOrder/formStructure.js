import React from 'react'
import {connect} from 'react-redux'
import {getComponentName} from 'pwfe-dom/util'
import {loadFormStructureAction} from '../../../config/redux/formAction'

/**
 * 获取和修改表单结构数据的HOCs
 * 使用方法：
 * const MyComponent = formStructure()(props =>{
 *    console.log('表单加载状态', props.stateCode);
 *    console.log('表单结构数据', props.formStructure);
 *    props.loadForm(formId) 根据ID全局加载一个新的表单结构
 *    return null;
 * })
 *
 * @param options
 * @param options.stateName 默认情况下，状态编码会使用stateCode作为参数名称，如果需要修改，可以设定这里。
 * @param options.structureName 默认情况下，表单结构会使用formStructure作为参数名称，如果需要修改，可以设定这里。
 * @param options.loadName 默认情况下，加载表单的方法会使用loadForm作为参数名称，如果需要修改，可以设定这里。
 * @returns {function(*=)}
 */
const formStructure = (options = {}) =>{
    const stateName = options.stateName || 'stateCode',
        structureName = options.structureName || 'formStructure',
        loadName = options.loadName || 'loadForm';
    return (Comp) => {
        const FormStructure = connect(
            state => {
                const structure = state.formStructureReducer;
                return {
                    [stateName]: structure.stateCode,
                    [structureName]: structure.formStructure
                }
            },
            (dispatch, props) => ({
                [loadName]:fsId => dispatch(loadFormStructureAction(fsId))
            })
        )(Comp)
        FormStructure.displayName = `formStructure(${getComponentName(Comp)})`;
        return FormStructure;
    }
}

export default formStructure