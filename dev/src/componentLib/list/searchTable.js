import React from 'react'
import _Config from '../../../config/sysDefConfig'
import {loadListDataAction} from '../../../config/redux/listAction'
import {StateCode} from '../../../config/redux/listReducer'
import {listService} from '../../service/listService'
import renderBoot from './column/renderBoot'
import ButtonBar from './searchTable/buttonBar'
import {connect} from 'react-redux'
import {Table, Input, Button, Icon} from 'antd';
import {fluent} from 'es-optional'

const {Column} = Table;
const ButtonGroup = Button.Group;
const ListConfig = _Config.ListConfig

/**
 * 支持列表表头所斗的table
 * @param {Object} form 表单结构
 */
class SearchTable extends React.Component {
    constructor(...props) {
        super(...props)
        this.handleFresh = this.handleFresh.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load(options){
        const props = this.props,
            form = props.form;
        props.onLoadList(form.id, form.type, {length: ListConfig.pageLength, start: 0, column: {}});
    }

    handleFresh(){
        this.load();
    }

    render() {
        const props = this.props,
            form = props.form,
            Columns = [];
        for (let meta of form.itemMetaSet) {
            if (meta.listShow) {
                Columns.push(<Column key={meta.label}
                                     title={meta.label}
                                     dataIndex={meta.column}
                                     render={renderBoot(meta)}/>)
            }
        }
        return (
            <div>
                <ButtonBar options={fluent(form.list).then(list => list.options).else(false)}
                           onFresh={this.handleFresh}
                />
                <Table {...ListConfig.table}
                       loading={StateCode.suc !== props.stateCode}
                       dataSource={StateCode.suc === props.stateCode && listService.bindData(props.list)}>
                    {Columns}
                </Table>
            </div>);
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