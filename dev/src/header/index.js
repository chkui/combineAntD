import React from 'react'
import {Layout, Menu, Breadcrumb} from 'antd';

const {Header, Content, Footer} = Layout;
const cn = require('classnames/bind').bind(require('./header.scss'));

const HeaderWrapper = props => (
    <Header>
        <div className="logo"/>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{lineHeight: '64px'}}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
    </Header>);

module.exports = HeaderWrapper;
module.exports.default = module.exports;