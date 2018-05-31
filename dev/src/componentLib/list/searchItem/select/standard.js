import React from 'react'
import PropTypes from 'prop-types';
import listData from '../../../highOrder/listData'
import {Select, Tooltip} from 'antd';
import {fluent} from 'es-optional'
import {DataFlag} from '../../../../../config/sysDefConfig'
import {itemService} from '../../../../service/itemService'
import {QueryOpt, RegularItemMeta} from '../../../../../config/sysDefConfig'

const {Option, OptGroup} = Select;
const cn = require('classnames/bind').bind(require('./standard.scss'));
const com = require('classnames/bind').bind(require('../search.scss'));

const _List = [{value: DataFlag.EMPTY, label: '未选择'}]

class StandardSelectComponent extends React.Component {
    constructor(...props) {
        super(...props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    setValue(value) {}

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
            {column, fk} = itemMeta
        !search && itemService.selectedOptions(fk.fsId, fk.fsType, fk.ids, (err, docs) => {
            if (!err) {
                props.combineSearch(column, _List.concat(docs))
            }
        })
    }

    render() {
        const {show, itemMeta, search} = this.props,
            col = fluent(search).then(search => search[itemMeta.column]).else(false)
        return (<div className={`${cn('standard-select')} ${com(show ? 'show' : 'hide')}`}>
            <Select className={cn('standard-select')}
                    placeholder={`搜索${itemMeta.label}`}
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
            (<OptGroup key={opt.value} label={opt.label}>{buildSelect(opt.children)}</OptGroup>) :
            (<Option key={opt.value} value={opt.value}>
                <Tooltip placement="left" title={opt.label}>
                    <span className={cn('span')}>{opt.label}</span>
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