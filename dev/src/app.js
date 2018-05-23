/**
 * Created by chkui on 2017/6/26.
 */
'use strict';
import React from 'react'
import {Layout} from 'antd';
import {Route, Switch} from 'pwfe-dom/router'
import bundle from 'pwfe-dom/bundle'
import {isElement} from 'pwfe-dom/util'
import Header from './layout/header'
import Sider from './layout/sider'
import db from './database/db'
const cn = require('classnames/bind').bind(require('./app.scss'));

const element = (el) => {
    if (isElement(el)) {
        return el
    } else {
        const El = el;
        return (<El/>)
    }
}

/**
 * 前后端同构的App入口。如果需要二次开发，请参照这个模板
 * @param {object} props{
 *     init : {comp:后台初始化的组件,id:初始化组件对应的id}
 *     routes : 路由列表
 *     className : app的样式
 *     header: 头部元素
 *     children : 内容子元素
 *     footer:页脚元素
 * }
 * @return {XML}
 * @constructor
 */
class App extends React.Component{

    componentDidMount(){

    }

    render(){
        const {init, routes, className, header, children, footer} = this.props;
        return (
            <Layout hasSider className={cn('app-root')} >
                <Sider/>
                <Layout>
                    <Header />
                    <Layout.Content className={cn('content')}>
                        <Switch>
                            {routes.map(i => {
                                const params = i.url ? {
                                    key: i.id,
                                    component: bundle(init.id === i.id && init.comp, i.component),
                                    exact: true,
                                    path: i.url
                                } : {
                                    key: i.id,
                                    component: bundle(init.id === i.id && init.comp, i.component)
                                }
                                return (<Route {...params} />)
                            })}
                        </Switch>
                    </Layout.Content>
                </Layout>
                {/*{element(children)}
            {element(footer)}*/}
            </Layout>
        )
    }
}

module.exports = App;
module.exports.default = module.exports;