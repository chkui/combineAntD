import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
const cn = require('classnames/bind').bind(require('./footer.scss'))

const FooterWrapper = props => (<Footer style={{ textAlign: 'center' }}>
    Ant Design ©2016 Created by Ant UED
</Footer>);

module.exports = FooterWrapper
module.exports.default = module.exports