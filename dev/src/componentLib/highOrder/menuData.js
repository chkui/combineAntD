import React from 'react'
import {connect} from 'react-redux'
import {getComponentName} from 'pwfe-dom/util'
import {menuAction} from '../../../config/redux/menuAction'

/**
 * 从ReduxStore中获取或更新数据的高阶组件
 * 1)使用方法：
 * const MyComponent = menuData()(props =>{
 *    console.log('菜单数据', props.menuData);
 *    props.setMenu(menus);
 *    return null;
 * })
 * 2)setMenu的传递的是一个树形结构：
 * [{
 *    id:单个菜单的主键编码,
 *    label:菜单的名称,
 *    paren:父级菜单，当某个菜单没有父菜单的时候会认为是根菜单。
 *    type:菜单类型，取值L、F、S、G，见{@link MenuLinkType}
 *    url:链接地址：
 *      如果是L类型，表示是一个指定的链接。
 *      如果是F，会指向一个表单列表。
 *      如果是S，表示是一个独立的表单，会执行一个可显示的表单。
 *      如果是G，这个值没任何效果。
 *    children:[]子菜单列表，子菜单的结构和父菜单完全一样。
 * },{
 *
 * }]
 *
 * @param {object} options [in] 相关操作接口
 * @param {string} options.menuName [in] 默认情况下，传输数据的参数会使用'stateCode'，可以在这里修改。
 * @param {string} options.setName [in] 默认情况下，设置数据的参数会使用'setMenu'，可以在这里修改。
 * @return {function(*=)}
 */
const menuData = (options = {}) =>{
    const menuName = options.menuName || 'menus',
        setName = options.setName || 'setMenu';
    return (Comp) => {
        const ListData = connect(
            state => {
                const menuData = state.menuReducer;
                return {
                    [menuName]: menuData.menus
                }
            },
            (dispatch, props) => ({
                [setName]: menus => dispatch(menuAction(menus))
            })
        )(Comp)
        ListData.displayName = `menuData(${getComponentName(Comp)})`;
        return ListData;
    }
};

export default menuData