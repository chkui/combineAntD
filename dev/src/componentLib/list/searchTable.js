import React from 'react'
import _Config from '../../../config/sysDefConfig'
import {loadListDataAction} from '../../../config/redux/listAction'
import {StateCode} from '../../../config/redux/listReducer'
import renderBoot from './column/renderBoot'
import {connect} from 'react-redux'
import {Table, Input, Button, Icon} from 'antd';

const {Column} = Table;

const ListConfig = _Config.ListConfig
const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

/**
 * 支持列表表头所斗的table
 * @param {Object} form 表单结构
 */
class SearchTable extends React.Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        const props = this.props,
            form = props.form;
        props.onLoadList(form.id, form.type, {length: ListConfig.pageLength, start: 0, column: {}});
    }

    render() {
        const props = this.props,
            Columns = [];
        for (let meta of props.form.itemMetaSet) {
            if (meta.listShow) {
                Columns.push(<Column key={meta.label}
                                     title={meta.label}
                                     dataIndex={meta.column}
                                     render={renderBoot(props)}/>)
            }
        }
        return (<Table {...ListConfig.table}
                       loading={StateCode.suc !== props.stateCode}
                       dataSource={StateCode.suc === props.stateCode && bindingData(props.list)}>
            {Columns}
        </Table>);
    }
}

const bindingData = (docs) => {
    return docs.map(doc => {
        doc.key = doc.id
        return doc;
    })
}

const SearchTableWrapper = connect(
    state => {
        const listData = state.listDataReducer;
        return {
            stateCode: listData.stateCode,
            list: listData.list
        }
    },
    (dispatch, props) => ({
        onLoadList: (id, type, options) => dispatch(loadListDataAction(id, type, options))
    })
)(SearchTable)

export default SearchTableWrapper