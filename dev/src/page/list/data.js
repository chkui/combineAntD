import React from 'react'
import SearchTable from '../../componentLib/list/searchTable'

/**
 * 列表数据，目前仅仅支持 SearchTable
 * @param props.form 表单结构数据
 * @constructor
 */
const ListData = props =>
    <SearchTable form={props.form} />

export default ListData;