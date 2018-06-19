import React from 'react'
import PropTypes from 'prop-types';
import {Modal, Tree, Button, Dropdown, Menu, Icon, Input, Popconfirm} from 'antd';
import {valueAndTypes2View, view2ValueAndTypes, checkNumber} from './multiLineHelper'
import {FormItemType} from "../../../../../config/sysDefConfig";
import {idGen} from "../../../../database/idgenerator";

const cn = require('classnames/bind').bind(require('./multiTrees.scss'));

const TreeNode = Tree.TreeNode;
const ButtonGroup = Button.Group;
const SubMenu = Menu.SubMenu;

const btnStyle = {
    verticalAlign: 'middle',
    lineHeight: '24px'
}

/**
 * @param {array} props.valueAndTypes 初始化数据
 * @param {function} props.onClose
 * @param {function} props.onSubmit
 */
export default class MultiTrees extends React.Component {
    constructor(...props) {
        super(...props);
        this.init();
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddChild = this.handleAddChild.bind(this);
        this.handleAddSibling = this.handleAddSibling.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    init() {
        const {valueAndTypes} = this.props;
        let v_t;
        if (valueAndTypes) {
            v_t = valueAndTypes;
        } else {
            v_t = [{id: idGen(), value: '', type: FormItemType.VCHAR}];
        }
        this.mapping = buildMapping(v_t);
        this.state = {tree: v_t};
    }

    handleCancel() {
        this.props.onClose();
    }

    handleSubmit() {
        this.props.onSubmit(this.state.tree);
    }

    handleChange(id, valueAndType) {
        const item = this.mapping[id];
        item.value = valueAndType.value;
        item.type = valueAndType.type;
        this.setState({tree: this.state.tree})
    }

    handleAddChild(id) {
        const item = {id: idGen(), value: '', type: FormItemType.VCHAR, parent: id},
            current = this.mapping[id];
        this.mapping[item.id] = item;
        current.children ? current.children.push(item) : current.children = [item];
        this.setState({tree: this.state.tree})
    }

    handleAddSibling(id) {
        const item = {id: idGen(), value: '', type: FormItemType.VCHAR},
            current = this.mapping[id],
            parent = current.parent,
            children = parent ? this.mapping[parent].children : this.state.tree,
            len = children.length;
        item.parent = parent;
        this.mapping[item.id] = item;
        for (let i = 0; i < len; i++) {
            const child = children[i];
            if (id === child.id) {
                children.splice(i + 1, 0, item);
                break;
            }
        }
        this.setState({tree: this.state.tree})
    }

    handleDelete(id) {
        const item = this.mapping[id],
            parent = item.parent,
            children = parent ? this.mapping[parent].children : this.state.tree,
            len = children.length;
        for (let i = 0; i < len; i++) {
            const child = children[i];
            if (id === child.id) {
                children.splice(i, 1);
                break;
            }
        }
        this.setState({tree: this.state.tree})
    }

    render() {
        const {tree} = this.state;
        return (
            <Modal title="请输入数据"
                   visible
                   onOk={this.handleSubmit}
                   onCancel={this.handleCancel}
                   okText="确认"
                   cancelText="取消">
                <Tree>
                    {this.state.tree.map(node => buildTreeNodeView(node, this.handleChange, this.handleAddChild, this.handleAddSibling, this.handleDelete))}
                </Tree>
            </Modal>)
    }
}

/**
 * 构建展现树
 * @param valueAndTypes
 * @return {{}}
 */
const buildMapping = valueAndTypes => {
    const list = buildFlatList(valueAndTypes), mapping = {};
    for (let item of list) {
        mapping[item.id] = item
    }
    return mapping;
}
/**
 * 构建展现树，注意数据突变效果
 * @param valueAndTypes
 * @return {{valueAndTypesMap: {}, tree: Array}}
 */
const buildFlatList = (valueAndTypes, parent = false) => {
    let list = [];
    for (let v_t of valueAndTypes) {
        v_t.parent = parent;
        list.push(v_t)
        if (v_t.children) {
            const childrenList = buildFlatList(v_t.children, v_t.id)
            list = list.concat(childrenList);
        }
    }
    return list;
}

const buildTreeNodeView = (node, onChange, onAddChild, onAddSibling, onDelete) => {
    return (
        <TreeNode key={node.id}
                  disableCheckbox
                  disabled
                  title={(<Leaf id={node.id}
                                valueAndType={{value: node.value, type: node.type}}
                                onAddChild={onAddChild}
                                onAddSibling={onAddSibling}
                                onDelete={onDelete}
                                onChange={onChange}/>)}>
            {node.children && node.children.map(child => buildTreeNodeView(child, onChange, onAddChild, onAddSibling, onDelete))}
        </TreeNode>)
}

/**
 * @param props.id
 * @param props.valueAndType
 * @param props.onChange (id, {type: value: })
 * @param props.onAddChild (id)
 * @param props.onAddSibling (id)
 * @param props.onDelete (id)
 */
class Leaf extends React.Component {
    constructor(...props) {
        super(...props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOptions = this.handleOptions.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(e) {
        const {props} = this;
        props.onChange(props.id, view2ValueAndTypes({type: props.valueAndType.type, value: e.target.value}))
    }

    handleSelect(type) {
        const {props} = this;
        props.onChange(props.id, {type: type.key, value: ''})
    }

    handleOptions(type) {
        const {props} = this;
        switch (parseInt(type.key)) {
            case Options.ADDLEAF:
                props.onAddSibling(props.id);
                break;
            case Options.ADDCHILDLEAD:
                props.onAddChild(props.id);
                break;
        }
    }

    handleDelete() {
        const {props} = this;
        props.onDelete(props.id);
    }

    render() {
        const {valueAndType} = this.props;
        return (
            <React.Fragment>
                <Input size="small"
                       className={cn('input')}
                       onChange={this.handleChange}
                       value={valueAndTypes2View(checkNumber(valueAndType))}
                />
                <ButtonGroup className={cn('bg')}>
                    <Dropdown overlay={(<Menu onClick={this.handleSelect}>
                        <Menu.Item key={FormItemType.VCHAR}>文本</Menu.Item>
                        <Menu.Item key={FormItemType.DOUBL}>数字</Menu.Item>
                        <Menu.Item key={FormItemType.MONEY}>金钱</Menu.Item>
                    </Menu>)}>
                        <Button style={btnStyle} icon="edit" size="small"/>
                    </Dropdown>
                    <Dropdown overlay={(<Menu onClick={this.handleOptions}>
                        <SubMenu title="添加">
                            <Menu.Item key={Options.ADDLEAF}>节点</Menu.Item>
                            <Menu.Item key={Options.ADDCHILDLEAD}>子节点</Menu.Item>
                        </SubMenu>
                        <Menu.Item key={Options.DELETE}>
                            <Popconfirm title="删除这个节点?" onConfirm={this.handleDelete}
                                        okText="确定" cancelText="取消">
                                <a href="#">删除</a>
                            </Popconfirm>
                        </Menu.Item>
                    </Menu>)}>
                        <Button style={btnStyle} icon="setting" size="small"/>
                    </Dropdown>
                </ButtonGroup>
            </React.Fragment>
        )
    }
}

/**
 * 树结构相关操作
 * @type {{ADDLEAF: number, ADDCHILDLEAD: number, DELETE: number}}
 */
const Options = {
    ADDLEAF: 1, //添加一个叶节点
    ADDCHILDLEAD: 2, //添加一个子节点
    DELETE: 3 //删除当前节点
}

Leaf.defaultProps = {
    valueAndType: {value: '', type: FormItemType.VCHAR}
};