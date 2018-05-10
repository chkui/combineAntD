import React from 'react'
import {Layout, Icon, Avatar, Menu, Dropdown} from 'antd';

const {Header} = Layout;
const cn = require('classnames/bind').bind(require('./header.scss'));

const HeaderWrapper = props =>
    <Header style={{background: '#fff', padding: 0}}>
        <span className={cn('avatar')}>
            <Avatar style={{backgroundColor: '#1890ff'}}>随</Avatar>
        </span>
        <span className={cn('name')}>随风溜达的向日葵</span>
        <span className={cn('name')}>
            <Dropdown overlay={(
                <Menu>
                    <Menu.Item key="1"><a href="/abc">1st menu item</a></Menu.Item>
                    <Menu.Item key="2">2nd memu item</Menu.Item>
                    <Menu.Item key="3">3rd menu item</Menu.Item>
                </Menu>
            )}>
                <a className="ant-dropdown-link" href="#">
                  常用功能<Icon type="down"/>
                </a>
            </Dropdown>
        </span>
    </Header>

export default HeaderWrapper