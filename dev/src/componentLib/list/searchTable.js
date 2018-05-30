import React from 'react'
import {connect} from 'react-redux'
import {ListConfig, ListOption} from '../../../config/sysDefConfig'
import {loadListDataAction} from '../../../config/redux/listAction'
import {StateCode} from '../../../config/redux/listReducer'
import {listService} from '../../service/listService'
import renderBoot from './column/renderBoot'
import ButtonBar from './searchTable/buttonBar'
import {Table} from 'antd';
import SearchInputObserver from './searchTable/searchInputObserver'
import {fluent} from 'es-optional'

const cn = require('classnames/bind').bind(require('./searchTable.scss'));

const {Column, ColumnGroup} = Table;

/**
 * 支持列表表头所斗的table
 * @param {Object} formStructure 表单结构
 */
class SearchTable extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {searchBar: false};
        this.handleFresh = this.handleFresh.bind(this);
        this.handleSearchEnable = this.handleSearchEnable.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.proxy = new SearchInputObserver(this.handleSearch);
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
        this.proxy.cleanSearchValue();
        this.load({}, {});
    }

    handleSearchEnable() {
        this.setState((prevState, props) => ({
            searchBar: !prevState.searchBar
        }));
    }

    handleSearch(search) {
        const {where, options} = this.props.list,
            result = listService.antdQueryToDBSupport(where, options, search);
        result && this.load(result.where, result.options)
    }

    handleTableChange(page, filters, sorter) {
        const {where, options} = this.props.list,
            result = listService.antdQueryToDBSupport(where, options, {}, page, filters, sorter);
        result && this.load(result.where, result.options);
    }

    render() {
        const props = this.props,
            list = props.list,
            formStructure = props.formStructure,
            //标记是否可以查看表详情
            viewDetail = fluent(formStructure.list).then(list=>list.options).then(options=>{
                for(let opt of options){
                    if(ListOption.VIEW === opt){
                        return true;
                    }
                }
                return false
            }).else(false),
            pagination = {pageSize: ListConfig.pageLength};
        if (list) {
            pagination.total = list.total;
            pagination.current = list.options.curPage + 1;
        }
        return (
            <div>
                <ButtonBar options={fluent(formStructure.list).then(list => list.options).else(false)}
                           onSearchEnable={this.handleSearchEnable}
                           onFresh={this.handleFresh}
                />
                <Table {...ListConfig.table}
                       loading={StateCode.suc !== props.stateCode}
                       pagination={pagination}
                       onChange={this.handleTableChange}
                       dataSource={StateCode.suc === props.stateCode ? listService.bindData(formStructure, list.docs) : []}
                       onRow={(record, index) =>({
                               onClick: () => {console.log(record)}
                       })}>
                    {formStructure.itemMeta.map(meta => {
                        if (meta.listShow) {
                            return (<ColumnGroup key={meta.column}
                                                 title={this.proxy.createSearchInput(formStructure, meta, this.state.searchBar)}>
                                <Column key={meta.column}
                                        className={cn(viewDetail && 'column')}
                                        title={<span>{meta.label}</span>}
                                        dataIndex={meta.column}
                                        sorter={meta.sort} render={renderBoot(meta)}/>
                            </ColumnGroup>)
                        } else {
                            return null;
                        }
                    })}
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