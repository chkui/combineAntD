import React from 'react'
import {Menu, Icon} from 'antd';
import {Link} from 'pwfe-dom/router'
import menuConfig from '../../../config/menu'
import MenuService from '../../service/menuService'
import {connect} from 'react-redux'
import {menuAction} from '../../../config/redux/menuAction'
import {log} from "../../common/log";

const SubMenu = Menu.SubMenu

class MenuComponent extends React.Component {
    componentDidMount() {
        const _this = this;
        new MenuService().build((menus) => {
            _this.props.onLoadMenu(menus)
        })
    }

    render() {
        const menus = this.props.menus
        return menus ? (
            <Menu {...menuConfig.menuAttribute}>
                {this.props.menus.map(menu => generateMenu(menu))}
            </Menu>
        ) : null;
    }
}

const generateMenu = (m) => {
    const Comp = null;
    return (!m.url && !m.form) ?
        (<SubMenu key={m.id}
                  title={<span><Icon type="appstore"/><span>{m.label}</span></span>}>
            {m.children.map(i => generateMenu(i))}
        </SubMenu>) :
        (<Menu.Item key={m.id}><Link to={generateLink(m)}>{m.label}</Link></Menu.Item>)
}
const generateLink = (m) => {
    return m.url ? m.url : `/form/${m.form}`
}

const MenuWrapper = connect(
    (state) => ({
        menus: state.menuReducer.menus
    }),
    (dispatch, props) => ({
        onLoadMenu: menus => dispatch(menuAction(menus))
    })
)(MenuComponent);

export default MenuWrapper