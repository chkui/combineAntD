import React from 'react'
import {Table} from 'antd';
import {fluent} from 'es-optional'

const {Column} = Table;
const cn = require('classnames/bind').bind(require('./renderBoot.scss'));

/**
 * Column中render显示的组装工具
 * @param {object} props
 * @param {string} props.category 组件分类
 * @param {string} props.type 组件类型
 * @param {string} props.column 组件对应的字段
 * @param {string} props.label 组件显示的名字
 * @param {string} props.tip 组件是否包含提示信息
 * @param {boolean} props.listShow 是否在列表可现实
 * @param {boolean} props.listSearch 是否在列表可搜索
 * @constructor
 */
const renderBoot = props => {
    const Comp = fluent(columnComp[props.category]).then(type => type[props.type]).else(false);
    return Comp ? (text, record, index) => {
        return (<Comp text={text} record={record}/>);
    } : null;

}

export default renderBoot

/**
 * 开关
 * @param {boolean} props.text boolean
 * @param {object} props.record 单行数据
 * @constructor
 */
const TFSwitchRender = props =>
    (<span className={cn(props.text ? 'switch-enable':'switch-disable')}>{props.text ? '是' : '否'}</span>)

const columnComp = {
    Switch: {
        TFSwitch: TFSwitchRender
    }
}

