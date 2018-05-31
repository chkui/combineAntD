import React from 'react'
import {Input} from 'antd';

const Search = Input.Search;

const cn = require('classnames/bind').bind(require('./text.scss'));
const com = require('classnames/bind').bind(require('../search.scss'));

/**
 * 所有的列表头搜索组件必须提供以下参数实现功能
 * 1) props.show：{true|false} 组件的显示与隐藏，通常都是修改组件的高度0->32px来实现
 * 2) props.itemMeta {string} 行结构数据
 * 2) props.itemMeta.column：{string} 标记当前搜索框对应的行，在onChange、onSearch第一个参数返回
 * 3) props.itemMeta.label: {string} 当前列的标题，可用于现实placeholder，或不现实任何内容。
 * 4) props.onChange: {function(column,value)} 当组件数据发生变动的回调
 * 5) props.onSearch: {function(column,value)} 当组件发动搜索时候的回调
 * 所有列表必须提供以下接口
 * 6) setValue: (value) 用于上层组件设定数值，可用于受控组件的数值控制，上层组件会通过ref获取在接口来设置数据
 */

/**
 * 表头搜索输入框
 * 1)基本样式组件使用的是{@link https://ant.design/components/input-cn/}的Search组件
 * @param props
 * @param props.show 出现和隐藏标记
 * @param props.itemMeta 行结构数据
 * @param props.itemMeta.column 标记当前搜索框对应的行
 * @param props.itemMeta.label 标题
 * @param props.value 设定值
 * @param props.onChange 组件输入内容变动时的回调
 * @param props.onSearch 用户点击搜索时的回调 (column,value)=>{}
 */
export class Text extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {val:this.props.value}
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleChange(e){
        const {props} = this;
        props.onChange(props.itemMeta.column, e.target.value)
    }

    handleSearch(value) {
        const {props} = this;
        props.onSearch(props.itemMeta.column, value)
    }

    render() {
        const {show, itemMeta} = this.props;
        return (<div className={`${cn('searchInput')} ${com(show ? 'show' : 'hide')}`}>
            <Search enterButton
                    placeholder={`搜索${itemMeta.label}`}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}/>
        </div>)
    }
}

export const textQuery = require('../generateQuery')