import React from 'react'
import {fluent} from 'es-optional'
import Items from '../../item/items'
import Search from '../searchItem/searchs'

/**
 * 用于整合头部搜索栏的观察者，作用是：
 * 1)维护并观察多个搜索框，只要发生数据变动，都会更新观察者的数据
 * 2)监控用户的搜索提交行文，并整合数据提交给上层组件
 * 3)
 * @param {function} onSearch 用户提交搜索的回调方法，返回结构为一个字段对应一个值{column:value}.
 *      回调传递的结构详见{@link listData}关于where的说明。
 * @constructor
 */
function SearchObserver(onSearch) {
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
    /**
     * 生成查询条件的方法集
     * @type {{
     *   column:function
     * }}
     */
    this.query = {};
}

/**
 * 处理搜索提交
 */
SearchObserver.prototype.handleSearch = function (column, value) {
    this.handleChange(column, value);
    const keys = Object.keys(this.value), searchQuery = {};
    let key, val;
    for (key of keys) {
        val = this.query[key](key, this.value[key]);
        if(val){
            searchQuery[key] = val;
        }
    }
    this.onSearch(searchQuery);
};

/**
 * 处理单个搜索框数据变动
 * @param column
 * @param value
 */
SearchObserver.prototype.handleChange = function (column, value) {
    this.value[column] = value;
};

/**
 * 创建数据变动监控方法
 * @param column
 * @param value
 * @returns {handleChange}
 */
SearchObserver.prototype.buildHandleChange = function (column, value) {
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
SearchObserver.prototype.buildSearchHandle = function () {
    const _this = this;

    function handleSearch(column, value) {
        _this.handleSearch(column, value);
    }

    return handleSearch;
}
/**
 * 异步更新每一个组件的实力
 * @param column
 * @param ref
 */
SearchObserver.prototype.asyncSetRef = function (column, ref) {
    this.workerSupervise[column] = ref;
}
/**
 * 创建一个搜索组件
 * @param {object} fs 表单结构
 * @param {object} im 数据项结构
 * @param {boolean} show 标记是否显示
 * @returns {XML}
 */
SearchObserver.prototype.createSearchInput = function (fs, im, show) {
    const _this = this,
        setRef = (ref) => {
            _this.asyncSetRef(im.column, ref)
        },
        Item = getItem(fs, im);

    this.workerSupervise[im.column] = React.createRef();
    Item && (this.query[im.column] = Item.query)
    return Item ? (<Item.Comp
        ref={this.workerSupervise[im.column]}
        itemMeta={im}
        show={show}
        onChange={this.buildHandleChange()}
        onSearch={this.buildSearchHandle()}/>) : null;
}

const getItem = (fs, im) => {
    const {category, type, search} = im;
    let Item = false;
    if (search) {
        if ('object' === typeof search) {
            Item = fluent(Search[search.category]).then(category => category[search.type]).else(false);
        }
        !Item &&
        (Item = fluent(Items[category]).then(category => category[type]).then(item => item.ListSearch).else(false));
    }
    return Item;
}

/**
 * 清空搜索数据
 */
SearchObserver.prototype.cleanSearchValue = function () {
    const keys = Object.keys(this.value);
    for (let key of keys) {
        this.workerSupervise[key].setValue('');
        this.value[key] = '';
    }
}

export default SearchObserver