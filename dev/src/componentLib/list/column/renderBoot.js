import React from 'react'
import {Table} from 'antd';
import {fluent} from 'es-optional'
import {connect} from 'react-redux'
import {StateCode} from '../../../../config/redux/listReducer'

const {Column} = Table;
const cn = require('classnames/bind').bind(require('./renderBoot.scss'));

/**
 * Column中render显示的组装工具
 * @param {object} itemMeta
 * @param {string} itemMeta.category 组件分类
 * @param {string} itemMeta.type 组件类型
 * @param {string} itemMeta.column 组件对应的字段
 * @param {string} itemMeta.label 组件显示的名字
 * @param {string} itemMeta.tip 组件是否包含提示信息
 * @param {boolean} itemMeta.listShow 是否在列表可现实
 * @param {boolean} itemMeta.listSearch 是否在列表可搜索
 * @constructor
 */
const renderBoot = itemMeta => {
    const Comp = fluent(columnComp[itemMeta.category]).then(type => type[itemMeta.type]).else(() => DefColumn);
    return (text, record, index) => {
        return (<Comp itemMeta={itemMeta} text={text} record={record}/>);
    };

}

export default renderBoot

/**
 * 默认数据表格处理。会根据当当前的查询条件进行高亮结果渲染。
 * 1)会持续观察列表数据，通过列表数据来判断是否对当前数据进行高亮
 * 2)会获取搜索的where条件
 * @param props
 * @constructor
 */
const DefColumn = connect(
    state => {
        const listData = state.listDataReducer;
        return {
            stateCode: listData.stateCode,
            where: fluent(listData.list).then(list => list.where).else(false)
        }
    },
)(props => {
    const {where, text} = props,
        {column} = props.itemMeta,
        reg = where[column];
    let Comp = reg ? (<span>{
        text.split(new RegExp(`(?<=${reg})|(?=${reg})`, 'i')).map((t, i) =>
            t.toLowerCase() === reg.toLowerCase() ?
                (<span className={cn('highlight')} key={i}>{t}</span>) : (<span key={i}>{t}</span>))
    }</span>) : (<span>{text}</span>);
    return StateCode.suc === props.stateCode ? Comp : null
})

/**
 * 开关
 * @param {boolean} props.text boolean
 * @param {object} props.record 单行数据
 * @constructor
 */
const TFSwitchRender = props =>
    (<span className={cn(props.text ? 'switch-enable' : 'switch-disable')}>{props.text ? '是' : '否'}</span>)

const columnComp = {
    Switch: {
        TFSwitch: TFSwitchRender
    }
}

