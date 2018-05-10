import React from 'react'
import {Layout, Icon} from 'antd';

const {Header} = Layout;
const cn = require('classnames/bind').bind(require('./header.scss'));

const HeaderWrapper = props =>
    <Header style={{background: '#fff', padding: 0}}>
        <Icon
            className={cn('trigger', 'menu-icon')}
            type={'menu-unfold'}/>
    </Header>

export default HeaderWrapper