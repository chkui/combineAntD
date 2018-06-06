import React from 'react'
import {Menu, Icon} from 'antd';
import {Link} from 'pwfe-dom/router'
import menuConfig from '../../../config/menu'
import {menuService} from '../../service/menuService'
import menuData from '../../componentLib/highOrder/menuData'
import {routes} from '../../../config/url'
import {MenuLinkType} from '../../../config/sysDefConfig'

const SubMenu = Menu.SubMenu

class MenuComponent extends React.Component {
    componentDidMount() {
        const _this = this;
        new menuService.build((menus) => {
            _this.props.setMenu(menus)
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
    return (m.type === MenuLinkType.GROUP) ?
        (<SubMenu key={m.id}
                  title={<span><Icon type="appstore"/><span>{m.label}</span></span>}>
            {m.children.map(i => generateMenu(i))}
        </SubMenu>) :
        (<Menu.Item key={m.id}><Link to={m.url}>{m.label}</Link></Menu.Item>)
}
const generateLink = (m) => {
    return m.url ? m.url : (m.list ? routes.list.build(m.form) : routes.form.buildView(m.form, m.data));
}

const MenuWrapper = menuData()(MenuComponent);

export default MenuWrapper