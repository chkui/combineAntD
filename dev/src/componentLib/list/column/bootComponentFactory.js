import React from 'react'
import {FormItemType} from '../../../../config/sysDefConfig'
import {connect} from 'react-redux'
import {fluent} from 'es-optional'
import {StateCode} from "../../../../config/redux/listReducer";
import {timestamp2Day} from '../../../common/timerFormat'


/**
 * 默认数据表格处理。会根据当当前的查询条件进行高亮结果渲染。
 * 1)会持续观察列表数据，通过列表数据来判断是否对当前数据进行高亮
 * 2)会获取搜索的where条件 {@link listData}
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
        reg = fluent(where[column]).then(q=>q.value).else(false);
    let Comp = reg ? (<span>{
        text.split(new RegExp(`(?<=${reg})|(?=${reg})`, 'i')).map((t, i) =>
            t.toLowerCase() === reg.toLowerCase() ?
                (<span className={cn('highlight')} key={i}>{t}</span>) : (<span key={i}>{t}</span>))
    }</span>) : (<span>{text}</span>);
    return StateCode.suc === props.stateCode ? Comp : null
});


/**
 * 时间处理
 * @param {number} props.text 时间戳
 * @param {object} props.record 单行数据
 * @constructor
 */
const TimeStamp = props =>{
    return (<span>{timestamp2Day(new Date(Number.parseInt(props.text)))}</span>)
};

const typeFactory = (itemMeta) =>{
    return fluent(TypeComponent[itemMeta.dataType]).then(Comp=>Comp).else(()=>DefColumn);
};

const TypeComponent = {
    [FormItemType.TIMES]: TimeStamp
};


const DataTypeFactoryIndex = {
    [FormItemType.TIMES]: typeFactory
};

export const bootComponentFactory = (itemMeta)=>{
    console.log(itemMeta.dataType);
    return fluent(DataTypeFactoryIndex[itemMeta.dataType]).then(factory=>factory(itemMeta)).else(()=>DefColumn);
};

