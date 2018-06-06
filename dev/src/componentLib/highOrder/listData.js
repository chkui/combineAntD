import React from 'react'
import {connect} from 'react-redux'
import {getComponentName} from 'pwfe-dom/util'
import {loadListDataAction, combineListSearchDataAction} from '../../../config/redux/listAction'

/**
 * 获取和修改列表数据的HOCs
 * 1)使用方法：
 * const MyComponent = listData()(props =>{
 *    console.log('列表加载状态', props.stateCode);
 *    console.log('列表数据', props.list);
 *    props.loadList(
 *      fsId, 表单结构的ID
 *      fsType, 表单结构的type
 *      where, 查询条件，结构：{
 *          column:{string|array}, 一层结构时是一个字符串：'key'。
 *              支持多层结构:['key','subKey']。例如数据为[key:{subKey:1}}, {key:{subKey:2}}], 查询key.subKey === 1的数据;
 *          value:{string|number} 查询值,
 *          opt:{'equ','lik'} 匹配方式'equ'：全等于， lik：模糊匹配，默认为lik。
 *      }
 *      options, 操作：{
 *          sort:{object} 指定排序字段，格式为{column: ['desc'|'asc']}
 *          curPage:{number} 当前在第几页
 *          size:{number} 单页的数据个数
 *      }
 *    )
 *    props.combineSearch(
 *      column, 当前合并数据对应的列
 *      data 要合并的数据
 *    )
 *    return null;
 * })
 * 2)整体结构 reducer={
 *      list:列表相关的数据
 *      search：表头搜索相关的数据
 * }
 * 3)list结构说明：
 * {
 *      docs 行数据，根据需要显示的内容按行显示。
 *      where 查询条件：{
 *          column:{string|object},
 *          value:{string|number} 查询值,
 *          opt:{'equ','lik'} 匹配方式'equ'：全等于， lik：模糊匹配，默认为lik。
 *      }
 *      options 排序和分页操作{
 *          sort:{object} 指定排序字段，格式为{column: ['desc'|'asc']}
 *          curPage:{number} 当前在第几页
 *          size:{number} 单页的数据个数
 *      }
 * }
 * 查询条件与排序标识查看{@link QueryOpt}
 *
 * 4)search结构：
 * {
 *      column:参数，可以是任何结构，根据组件定义见  root/dev/src/componentLib/list/searchItem/ 中的各组件说明
 * }
 *
 * @param options
 * @param options.stateName 默认情况下，状态编码会使用'stateCode'作为参数名称，如果需要修改，可以设定这里。
 * @param options.listName 默认情况下，表单结构会使用'list'作为参数名称，如果需要修改，可以设定这里。
 * @param options.searchName 默认情况下，搜索条件'search'作为参数名称，如果需要修改，可以设定这里。
 * @param options.loadName 默认情况下，加载表单的方法会使用'loadList'作为参数名称，如果需要修改，可以设定这里。
 * @param options.combineName 默认情况下，加载添加搜索表头数据的方法会使用'combineSearch'作为参数名称，如果需要修改，可以设定这里。
 * @returns {function(*=)}
 */
const listData = (options = {}) =>{
    const stateName = options.stateName || 'stateCode',
        listName = options.listName || 'list',
        searchName = options.searchName || 'search',
        loadName = options.loadName || 'loadList',
        combineName = options.combineName || 'combineSearch';
    return (Comp) => {
        const ListData = connect(
            state => {
                const listData = state.listDataReducer;
                return {
                    [stateName]: listData.stateCode,
                    [listName]: listData.list,
                    [searchName]: listData.search
                }
            },
            (dispatch, props) => ({
                [loadName]: (fsId, fsType, where, options) => dispatch(loadListDataAction(fsId, fsType, where, options)),
                [combineName]: (column, data) =>dispatch(combineListSearchDataAction(column, data))
            })
        )(Comp)
        ListData.displayName = `listData(${getComponentName(Comp)})`;
        return ListData;
    }
}

export default listData