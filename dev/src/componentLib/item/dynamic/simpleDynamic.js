import React from 'react'
import FormWrapper from '../formWrapper'
import MultiLine from './simpleDynamic/multiLine'
import MultiLineView from './simpleDynamic/multiLineView'
import MultiTrees from './simpleDynamic/multiTrees'
import {Popconfirm, Form, Select, Button, io} from 'antd';

const ButtonGroup = Button.Group;
import {FormItemType} from '../../../../config/sysDefConfig'

const cn = require('classnames/bind').bind(require('./simpleDynamic.scss'));

const FormItem = Form.Item;
const Option = Select.Option;

/**
 * 简单动态数据框。提供一下的类型数据输入。
 * 1)单项数据。
 * 2)多项数据。
 * 3)树。
 * 该组件会对Antd的Form高阶组件进行二次封装。满足对应的校验、验证提交等功能。所有项目的数据都是同一种数据类型（组件）
 * @param {array} value
 * @param {function} onChange (value)
 */
export class SimpleDynamicEntry extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            type: FormItemType.TREES,
            visible: true
        };
        this.handleTree = this.handleTree.bind(this);
        this.handleLine = this.handleLine.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCompTypeChange = this.handleCompTypeChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTree() {
        this.setState({type: FormItemType.TREES})
    }

    handleLine() {
        this.setState({type: FormItemType.ARRAY})
    }

    handleClick() {
        this.setState({visible: true})
    }

    handleClose() {
        this.setState({visible: false})
    }

    handleSubmit(valueAndTypes) {
        this.props.onChange(valueAndTypes);
        this.setState({visible: false})
    }

    handleCompTypeChange(value) {
        this.setState({
            compType: value
        });
    }

    render() {
        const {type, visible} = this.state, isArray = type === FormItemType.ARRAY;
        return (
            <span>
                <ButtonGroup>
                    {isArray ? (<Button icon="profile">列表</Button>) :
                        (<Popconfirm
                            title="修改为列表数据后会丢失已编辑数据!"
                            okText="修改" cancelText="取消"
                            onConfirm={this.handleLine}>
                            <Button icon="profile">列表</Button></Popconfirm>)
                    }
                    {!isArray ? (<Button icon="profile">树</Button>) :
                        (<Popconfirm
                            title="修改为树形数据后会丢失已编辑数据!"
                            okText="修改" cancelText="取消"
                            onConfirm={this.handleTree}>
                            <Button icon="profile">树</Button></Popconfirm>)
                    }
                </ButtonGroup>
                <div className={cn('btn-margin')}/>
                <ButtonGroup>
                    <Button type="primary" onClick={this.handleClick}>编辑</Button>
                </ButtonGroup>
                {visible && (isArray ? (<MultiLine valueAndTypes={this.props.value}
                                                  onClose={this.handleClose}
                                                  onSubmit={this.handleSubmit}
                />) : (<MultiTrees onClose={this.handleClose}
                                   onSubmit={this.handleSubmit}/>))}
                {isArray ? (<MultiLineView valueAndTypes={this.props.value}/>) : null}
            </span>
        );
    }
}

export const SimpleDynamicItem = props =>
    (<FormWrapper {...props} hasFeedback>
        <SimpleDynamicEntry/>
    </FormWrapper>)