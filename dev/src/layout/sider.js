import React from 'react'
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider} = Layout;
import {Link} from 'pwfe-dom/router'

const SiderWrapper = props =>
    <Sider breakpoint="md" collapsedWidth="0">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
                <Link to="/">
                    <Icon type="user" />
                    <span>home</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/portal">
                    <Icon type="video-camera" />
                    <span>portal</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
            </Menu.Item>
        </Menu>
    </Sider>

export default SiderWrapper