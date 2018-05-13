import React from 'react'
import {Layout, Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu
const {Header, Sider} = Layout;
import {Link} from 'pwfe-dom/router'
const cn = require('classnames/bind').bind(require('./sider.scss'));

const SiderWrapper = props =>
    <Sider breakpoint="md" collapsedWidth="0">
        <div className={cn('sider-box')}>
            <Menu
                theme="dark"
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span><Icon type="link" /><span>说明</span></span>}>
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>组件</span></span>}>
                    <Menu.Item key="5"><Link to='/form'>Form</Link></Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    </Sider>

export default SiderWrapper