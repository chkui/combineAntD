import React from 'react'
import {Button, Dropdown, Menu, Icon} from 'antd';
import {reRoute} from 'pwfe-dom/router'
import {ListConfig, ListOption} from '../../../../config/sysDefConfig'
import {routes} from '../../../../config/url'
const cn = require('classnames/bind').bind(require('./buttonBar.scss'));

const ButtonGroup = Button.Group;

/**
 * 列表操作按钮。
 * 1)目前仅仅根据form的数据提供新建和刷新功能 //TODO
 * @param props
 * @param props.formId  //表单结构的ID
 * @param props.list //列表可用操作
 * @param props.onSearchEnable //启用搜索回调
 * @param props.onFresh //刷新
 * @constructor
 */
const ButtonBar = props => {
    const {options} = props;

    /**
     * 列表功能的启用标记
     */
    const list = props.list;
    const menu = (
        <Menu>
            <Menu.Item key="1">1st item</Menu.Item>
            <Menu.Item key="2">2nd item</Menu.Item>
            <Menu.Item key="3">3rd item</Menu.Item>
        </Menu>
    );
    return (<ButtonGroup size={ListConfig.button.size}>
        {list[ListConfig.options.new] && <New/>}
        <BarButton key="retweet" icon="retweet" onClick={props.onFresh}>刷新</BarButton>
        {list[ListConfig.options.search] && (<SearchBar />)}
    </ButtonGroup>)
}


const New = reRoute()(class extends React.Component{
    constructor(...props){
        super(...props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const props = this.props;
        props.browser.forward(routes.form.buildNew(props.match.params[routes.form.params.form]));
    }

    render(){
        return(<BarButton icon="plus" onClick={this.handleClick}>新建</BarButton>)
    }
})

/**
 * 搜索相关按钮
 * @param props
 * @param props.onSearchEna
 * @returns {*}
 * @constructor
 */
const SearchBar = props =>{
    const menu = (
        <Menu>
            <Menu.Item key="1"><Icon/>收起</Menu.Item>
            <Menu.Item key="2"><Icon />刷新</Menu.Item>
            <Menu.Item key="3">清空</Menu.Item>
        </Menu>
    );
    return(
        <React.Fragment>
            <BarButton icon="search" onClick={props.onSearchEnable}>查询</BarButton>
            <Dropdown overlay={menu}>
                <Button type="primary"><Icon type="down" /></Button>
            </Dropdown>
        </React.Fragment>
    )
}

const BarButton = props =>
    <Button type="primary" onClick={props.onClick}><Icon type={props.icon}/>{props.children}</Button>

export default ButtonBar