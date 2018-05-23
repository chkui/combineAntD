import React from 'react'
import {Layout} from 'antd';
import {Link} from 'pwfe-dom/router'
import Menu from './sider/menu'
const {Sider} = Layout;

const cn = require('classnames/bind').bind(require('./sider.scss'));

class SiderWrapper extends React.Component {

    componentDidMount(){

    }

    render() {
        return (
            <Sider breakpoint="md" collapsedWidth="0">
                <div className={cn('sider-box')}>
                    <Menu />
                </div>
            </Sider>)
    }
}

export default SiderWrapper