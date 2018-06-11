import React from 'react'
import PropTypes from 'prop-types';
import listData from '../../../highOrder/listData'
import {Select, Tooltip} from 'antd';
import {fluent} from 'es-optional'
import {DataFlag} from '../../../../../config/sysDefConfig'
import {itemService} from '../../../../service/itemService'
import {dataBindService} from '../../../../service/dataBindService'
import {QueryOpt, RegularItemMeta} from '../../../../../config/sysDefConfig'

const {Option, OptGroup} = Select;
const cn = require('classnames/bind').bind(require('./standard.scss'));
const com = require('classnames/bind').bind(require('../search.scss'));

const _List = [{id: DataFlag.EMPTY, fsid: DataFlag.EMPTY, rowid: DataFlag.EMPTY, itemid: DataFlag.EMPTY, value: '未选择'}]

class StandardSelectComponent extends React.Component {
    constructor(...props) {
        super(...props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    setValue(value) {
    }

    handleChange(value) {
        const {props} = this;
        props.onChange(props.itemMeta.column, value)
    }

    handleSearch(value) {
        const {props} = this;
        props.onSearch(props.itemMeta.column, value)
    }

    componentDidMount() {
        const {props} = this,
            {itemMeta, search} = props,
            {column, fkFsid, fkRowId, fkItemId} = itemMeta
        !search && itemService.getAssociated(fkFsid, fkRowId, fkItemId, (err, docs) => {
            if (!err) {
                props.combineSearch(column, _List.concat(dataBindService.dataValue2Options(docs)));
            }
        })
    }

    render() {
        const {show, itemMeta, search} = this.props,
            col = fluent(search).then(search => search[itemMeta.column]).else(false)
        return (<div className={`${cn('standard-select')} ${com(show ? 'show' : 'hide')}`}>
            <Select className={cn('standard-select')}
                    defaultValue= "未选择"
                    onChange={this.handleChange}
                    disabled={!col}>
                {buildSelect(col)}
            </Select>
        </div>)
    }
}

/**
 * 构建组件
 * @param opts
 */
const buildSelect = opts => {
    return opts ? opts.map(opt => {
        return opt.children ?
            (<OptGroup key={opt.id} label={opt.value}>{buildSelect(opt.children)}</OptGroup>) :
            (<Option key={opt.id} value={opt.value}>
                <Tooltip placement="left" title={opt.value}>
                    <span className={cn('span')}>{opt.value}</span>
                </Tooltip>
            </Option>)
    }) : null;
}

export const StandardSelect = listData()(StandardSelectComponent);
export const standardSelectQuery = (column, value) => ({
    column: [column, RegularItemMeta.id],
    value,
    opt: QueryOpt.EQU
})