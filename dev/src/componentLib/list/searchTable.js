import React from 'react'
import listData from '../../componentLib/highOrder/listData'
import {ListConfig, ListOption, SysFlag} from '../../../config/sysDefConfig'
import {StateCode} from '../../../config/redux/listReducer'
import {listService} from '../../service/listService'
import renderBoot from './column/renderBoot'
import ButtonBar from './searchTable/buttonBar'
import {Table} from 'antd';
import SearchObserver from './searchTable/searchObserver'
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
        this.handleRow = this.handleRow.bind(this);
        this.searchObserver = new SearchObserver(this.handleSearch);
    }

    componentDidMount() {
        this.load({}, {curPage: 0, size: ListConfig.pageLength});
    }

    load(where, options) {
        const props = this.props,
            formStructure = props.formStructure;
        props.loadList(formStructure.id, formStructure.type, where || {}, options || {});
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
            result = listService.antdQueryToDBSupport(where, options, where, page, filters, sorter);
        result && this.load(result.where, result.options);
    }

    handleRow(record, index) {
        const _this = this;
        return {
            onClick: () => {
                console.log(record)
            }
        }
    }

    render() {
        const props = this.props,
            list = props.list,
            formStructure = props.formStructure,
            //标记是否可以查看表详情
            viewDetail = fluent(formStructure.list).then(list => list.options).then(options => {
                for (let opt of options) {
                    if (ListOption.VIEW === opt) {
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
                <ButtonBar list={fluent(formStructure.list).then(list => list).else(false)}
                           onSearchEnable={this.handleSearchEnable}
                           onFresh={this.handleFresh}/>
                <Table {...ListConfig.table}
                       loading={StateCode.suc !== props.stateCode}
                       pagination={pagination}
                       onChange={this.handleTableChange}
                       dataSource={StateCode.suc === props.stateCode ? listService.bindData(formStructure, list.docs) : []}
                       onRow={this.handleRow}>
                    {formStructure.itemMeta.map(meta => {
                        if (SysFlag.ENABLE === meta.listShow) {
                            return (<ColumnGroup key={meta.id}
                                                 title={this.searchObserver.createSearchInput(formStructure, meta, this.state.searchBar)}>
                                <Column key={meta.id}
                                        className={cn(viewDetail && 'column')}
                                        title={<span>{meta.label}</span>}
                                        dataIndex={meta.column}
                                        sorter={SysFlag.ENABLE === meta.sort} render={renderBoot(meta)}/>
                            </ColumnGroup>)
                        } else {
                            return null;
                        }
                    })}
                </Table>
            </div>);
    }
}

const SearchTableWrapper = listData()(SearchTable);

export default SearchTableWrapper