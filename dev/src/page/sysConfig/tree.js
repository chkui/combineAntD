import React from 'react'
import menuData from '../../componentLib/highOrder/menuData'
import {Tree, Menu, Dropdown, Icon} from 'antd';

const TreeNode = Tree.TreeNode;

/**
 *
 * @param props
 * @param props.menus 当前菜单结构，见{@link menuData}
 * @constructor
 */
const NaviTreeComp = props => {
    return props.menus ? (
        <div>
            <Tree>
                {props.menus.map(menu => generateOneMenu(menu))}
            </Tree>
        </div>
    ) : null;
};

const generateOneMenu = (menu) => {
    return (<TreeNode title={(<TitleAndOpt label={menu.label}/>)} key={menu.id}>
        {menu.children && menu.children.map(child => generateOneMenu(child))}
    </TreeNode>)
}

const Option = (
    <Menu onClick={params=>console.log(params)}>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="new">新增</Menu.Item>
        <Menu.Item key="disable">停用</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
);

/**
 * @param props.id 主键
 * @param props.label 标题名称
 * @param props.onEdit
 * @param props.onAddChild
 * @param props.onDelete
 * @constructor
 */
const TitleAndOpt = props => (
    <React.Fragment>
        <span>{props.label}</span>
        <Dropdown overlay={Option}>
            <a className="ant-dropdown-link" href="javascript:void(0)">
                <Icon type="edit" />
            </a>
        </Dropdown>
    </React.Fragment>
)

const NaviTree = menuData()(NaviTreeComp);

export default NaviTree