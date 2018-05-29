import React from 'react'
import {ListConfig} from '../../../config/sysDefConfig'
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

/**
 * 支持列表表头所斗的table
 * @param {Object} formStructure 表单结构
 */
class SearchTable extends React.Component {
    constructor(...props) {
        super(...props)
        this.handleFresh = this.handleFresh.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }

    componentDidMount() {
        this.load({}, {curPage: 0, size: ListConfig.pageLength});
    }

    load(where, options) {
        const props = this.props,
            formStructure = props.formStructure;
        props.onLoadList(formStructure.id, formStructure.type, where || {}, options || {});
    }

    handleFresh() {
        const list = this.props.list;
        this.load(list.where, list.options);
    }


    handleTableChange(page, filters, sorter) {
        const list = this.props.list,
            where = list.where,
            options = list.options,
            opt = {};
        opt.curPage = page.current - 1;
        if(sorter){
            const sort = {}
            sort[sorter.field] = 'descend' === sorter.order ? -1 : 1;
            opt.sort = sort;
        }
        /**
         * {column: {…}, order: "descend", field: "code", columnKey: "站点编码(code)"}
         column
         :
         {title: {…}, dataIndex: "code", sorter: true, render: null, key: "站点编码(code)", …}
         columnKey
         :
         "站点编码(code)"
         field
         :
         "code"
         order
         :"descend" ascend
         */
        if(options.curPage !== opt.curPage || options.sort !== opt.sort){
            this.load(where, opt);
        }

        console.log(page);
        console.log(filters);
        console.log(sorter);
    }

    render() {
        const props = this.props,
            list = props.list,
            formStructure = props.formStructure,
            Columns = [],
            pagination = {pageSize: ListConfig.pageLength};
        if (list) {
            pagination.total = list.total;
        }
        for (let meta of formStructure.itemMeta) {
            if (meta.listShow) {
                Columns.push(<Column key={meta.label}
                                     title={meta.label}
                                     dataIndex={meta.column}
                                     sorter
                                     render={renderBoot(meta)}/>)
            }
        }
        return (
            <div>
                <ButtonBar options={fluent(formStructure.list).then(list => list.options).else(false)}
                           onFresh={this.handleFresh}
                />
                <Table {...ListConfig.table}
                       loading={StateCode.suc !== props.stateCode}
                       pagination={pagination}
                       onChange={this.handleTableChange}
                       dataSource={StateCode.suc === props.stateCode && listService.bindData(formStructure, list.docs)}>
                    {Columns}
                </Table>
            </div>);
    }
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
        onLoadList: (id, type, where, options) => dispatch(loadListDataAction(id, type, where, options))
    })
)(SearchTable)

export default SearchTableWrapper