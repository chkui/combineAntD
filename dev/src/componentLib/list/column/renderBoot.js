import React from 'react'
import {fluent} from 'es-optional'
import {connect} from 'react-redux'
import {bootComponentFactory} from './bootComponentFactory'
import {StateCode} from '../../../../config/redux/listReducer'

const cn = require('classnames/bind').bind(require('./renderBoot.scss'));

/**
 * Column中render显示的组装工具
 * @param {object} itemMeta
 * @param {object} itemMeta.id 字段主键
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
    const Comp = bootComponentFactory(itemMeta);
    return (text, record, index) => {
        return (<Comp itemMeta={itemMeta} text={text} record={record}/>);
    };
};

export default renderBoot



/**
 * 开关
 * @param {boolean} props.text boolean
 * @param {object} props.record 单行数据
 * @constructor
 */
const TFSwitchRender = props =>
    (<span className={cn(props.text ? 'switch-enable' : 'switch-disable')}>{props.text ? '是' : '否'}</span>)

const columnComp = {
    /*Switch: {
        TFSwitch: TFSwitchRender
    }*/
}

