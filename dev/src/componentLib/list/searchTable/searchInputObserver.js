import React from 'react'
import SearchInput from '../searchItem/searchInput'

/**
 * 用于整合头部搜索栏的观察者，作用是：
 * 1)维护并观察多个搜索框，只要发生数据变动，都会更新观察者的数据
 * 2)监控用户的搜索提交行文，并整合数据提交给上层组件
 * 3)
 * @param {function} onSearch 用户提交搜索的回调方法，返回结构为一个字段对应一个值{column:value}
 * @constructor
 */
function SearchInputObserver(onSearch) {
    this.onSearch = onSearch; //点击搜索时的回调 (query)=>{}
    //
    /**
     * 被观察者Map
     * @type {{
     *   column:ref
     * }}
     */
    this.workerSupervise = {};
    /**
     * 数值Map
     * @type {{
     *   column:value
     * }}
     */
    this.value = {};
}

/**
 * 处理搜索提交
 */
SearchInputObserver.prototype.handleSearch = function () {
    const keys = Object.keys(this.value);
    let val;
    for(let key of keys){
        '' === this.value[key].replace(/ /g, '') && (delete this.value[key])
    }
    this.onSearch(Object.assign({}, this.value));
};

/**
 * 处理单个搜索框数据变动
 * @param column
 * @param value
 */
SearchInputObserver.prototype.handleChange = function (column, value) {
    const validate = this.validate(value);
    if (null !== validate) {
        this.value[column] = validate;
        this.workerSupervise[column].setValue(validate);
    }
};

/**
 * 动态校验输入的数据
 * //TODO 目前不做任何校验
 * @param value
 * @returns {*} 错误返回 null
 */
SearchInputObserver.prototype.validate = function (value) {
    return value;
}

/**
 * 创建数据变动监控方法
 * @param column
 * @param value
 * @returns {handleChange}
 */
SearchInputObserver.prototype.buildHandleChange = function (column, value) {
    const _this = this;

    function handleChange(column, value) {
        _this.handleChange(column, value);
    }

    return handleChange;

}
/**
 * 创建数据搜索变动监控方法
 * @returns {handleSearch}
 */
SearchInputObserver.prototype.buildSearchHandle = function () {
    const _this = this;

    function handleSearch(column, value) {
        _this.handleSearch();
    }

    return handleSearch;
}
/**
 * 异步更新每一个组件的实力
 * @param column
 * @param ref
 */
SearchInputObserver.prototype.asyncSetRef = function (column, ref) {
    this.workerSupervise[column] = ref;
}
/**
 * 创建一个搜索组件
 * @param {object} fs 表单结构
 * @param {object} im 数据项结构
 * @param show
 * @returns {XML}
 */
SearchInputObserver.prototype.createSearchInput = function (fs, im, show) {
    const _this = this,
        {column, label} = im,
        setRef = (ref) => {
            _this.asyncSetRef(column, ref)
        };
    return (<SearchInput
        ref={setRef}
        column={column}
        label={label}
        show={show}
        onChange={this.buildHandleChange()}
        onSearch={this.buildSearchHandle()}/>);
}

/**
 * 清空搜索数据
 */
SearchInputObserver.prototype.cleanSearchValue = function () {
    const keys = Object.keys(this.value);
    for(let key of keys){
        this.workerSupervise[key].setValue('');
        this.value[key] = '';
    }
}

export default SearchInputObserver