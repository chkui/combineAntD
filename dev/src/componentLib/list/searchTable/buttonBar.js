import React from 'react'
import {fluent} from 'es-optional'
import {Button, Icon} from 'antd';
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
 * @param props.options //列表可用操作
 * @param props.onSearchEnable //启用搜索回调
 * @param props.onFresh //刷新
 * @constructor
 */
const ButtonBar = props => {
    const {options} = props;

    /**
     * 列表功能的启用标记
     */
    const Enable = fluent(props.options).then(options=>{
        for(let op of props.options){
            if(ListOption.NEW === op){
                return true;
            }
        }
    }).else(false);
    return (<ButtonGroup size={ListConfig.button.size}>
        {options && options.map(op=>{
            if(ListOption.NEW === op){
                return (<New key={op} />)
            }else if(ListOption.SEARCH === op){
                return (<BarButton key={op} icon="search" onClick={props.onSearchEnable}>查询</BarButton>)
            }else{
                return null;
            }
        })}
        <BarButton key="retweet" icon="retweet" onClick={props.onFresh}>刷新</BarButton>
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

const BarButton = props =>
    <Button type="primary" onClick={props.onClick}><Icon type={props.icon}/>{props.children}</Button>

export default ButtonBar