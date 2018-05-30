import React from 'react'
import {Input} from 'antd';

const Search = Input.Search;

const cn = require('classnames/bind').bind(require('./searchInput.scss'));

/**
 * 表头搜索输入框
 * 1)基本样式组件使用的是{@link https://ant.design/components/input-cn/}的Search组件
 * @param props
 * @param props.show 出现和隐藏标记
 * @param props.column 标记当前搜索框对应的行
 * @param props.label 标题
 * @param props.value 设定值
 * @param props.onChange 组件输入内容变动时的回调
 * @param props.onSearch 用户点击搜索时的回调 (column,value)=>{}
 */
class SearchInput extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {val:this.props.value}
        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    setValue(value){
        this.setState({value:value})
    }

    handleChange(e){
        const {props} = this;
        props.onChange(props.column, e.target.value)
    }

    handleSearch(value) {
        const {props} = this;
        props.onSearch(props.column, value)
    }

    render() {
        const {label, show} = this.props;
        return (<div className={cn('searchInput', show ? 'show' : 'hide')}>
            <Search enterButton
                    placeholder={`搜索${label}`}
                    value={this.state.value}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}/>
        </div>)
    }
}

export default SearchInput