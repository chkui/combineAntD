import React from 'react'
import FormWrapper from '../formWrapper'
import {Form, Input, InputNumber, Select, Button, Modal, Icon} from 'antd';
import {FormItemType} from '../../../../config/sysDefConfig'

const cn = require('classnames/bind').bind(require('./simpleDynamic.scss'));

const FormItem = Form.Item;
const Option = Select.Option;

const CompDefine = {
    singLine: 'singLine',
    multiLine: 'multiLine',
    treeLine: 'treeLine'
}

const DataDefine = {
    text: 'text',
    number: 'number',
    money: 'money'
}

/**
 * 简单动态数据框。提供一下的类型数据输入。
 * 1)单项数据。
 * 2)多项数据。
 * 3)树。
 * 该组件会对Antd的Form高阶组件进行二次封装。满足对应的校验、验证提交等功能。所有项目的数据都是同一种数据类型（组件）
 */
export class SimpleDynamicEntry extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {showValue: this.props.value, visible: false};
        this.value = this.props.value;
        this.dataType = 'text';
        this.compType = 'singLine';
        this.ref = React.createRef();
        this.handleClick = this.handleClick.bind(this);
        this.handleCompTypeChange = this.handleCompTypeChange.bind(this);
        this.handleDataTypeChange = this.handleDataTypeChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick() {
        this.setState({visible: true})
    }

    handleClose() {
        this.setState({visible: false})
    }

    handleSubmit() {
        this.value = this.ref.current.getValue();
        this.setState({
            showValue: this.value.map(i => i.value).join('；'),
            visible: false
        })
    }

    handleCompTypeChange(value) {
        this.compType = value;
    }

    handleDataTypeChange(value) {
        this.dataType = value;
    }

    render() {
        const Component = ComponentType[this.compType];
        return (
            <span>
                <Input addonBefore={(
                    <Select defaultValue={CompDefine.singLine}
                            onSelect={this.handleCompTypeChange}>
                        <Option value={CompDefine.singLine}>单条数据</Option>
                        <Option value={CompDefine.multiLine}>多条数据</Option>
                        <Option value={CompDefine.treeLine}>树形结构</Option>
                    </Select>
                )} addonAfter={(
                    <Select defaultValue={DataDefine.text}
                            onSelect={this.handleDataTypeChange}>
                        <Option value={DataDefine.text}>文本</Option>
                        <Option value={DataDefine.number}>数字</Option>
                        <Option value={DataDefine.money}>金钱</Option>
                    </Select>
                )}
                       value={this.state.showValue}
                       onClick={this.handleClick}
                />
                <Modal title="请输入数据"
                       visible={this.state.visible}
                       onOk={this.handleSubmit}
                       onCancel={this.handleClose}
                       okText="确认"
                       cancelText="取消">
                        <Component ref={this.ref} onSubmit={this.handleSubmit} dataType={this.dataType}/>
                </Modal>
            </span>
        );
    }
}

/**
 * @param props.dataType 对应的数据类型 {@link DataDefine}
 * @param props.onEntry 键入回车
 * @param props.placeholder 默认输入显示内容。
 */
class SingLine extends React.Component {
    constructor(...props) {
        super(...props);
        this.handleChange = this.handleChange.bind(this);
        this.handelPress = this.handelPress.bind(this);
        this.state = {value: this.props.value};
    }

    getValue() {
        return [{value: this.state.value, type: this.props.dataType}]
    }

    handelPress(e) {
        if (13 === e.charCode) {
            this.props.onEntry();
        }
    }

    handleChange(e) {
        if ('object' === typeof e) {
            this.setState({value: e.target.value});
        } else if ('number' === typeof e) {
            this.setState({value: e});
        }
    }

    render() {
        const params = Object.assign({}, this.props),
            {dataType} = params,
            Comp = DataType[dataType];
        delete params.dataType;
        delete params.onEntry;
        return <Comp className={cn('component')} value={this.state.value} {...params} onKeyPress={this.handelPress}
                     onChange={this.handleChange}/>
    }
}

const DataType = {
    [DataDefine.text]: props => (<Input {...props}/>),
    [DataDefine.number]: props => (<InputNumber {...props} />),
    [DataDefine.money]: props => (<InputNumber
        defaultValue={0}
        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value.replace(/\$\s?|(,*)/g, '')}
        {...props}
    />),
}

const ComponentType = {
    /**
     * 单项数据输入框
     */
    [CompDefine.singLine]: class extends React.Component {
        getValue() {
            return this.ref.getValue();
        }

        render() {
            const {props} = this;
            return <SingLine ref={ref => this.ref = ref}
                             dataType={props.dataType}
                             placeholder={props.placeholder}
                             onEntry={props.onSubmit}/>
        }
    },
    [CompDefine.multiLine]: class extends React.Component {
        constructor(...props) {
            super(...props);
            this.state = {children: []};
            this.refObj = [];
            this.handleAdd = this.handleAdd.bind(this);
        }
        getValue() {
            let values = [], comps = this.refObj;
            for (let comp of comps) {
                console.log(comp.getValue())
                values = values.concat(comp.getValue());
            }
            return values;
        }

        handleAdd(e) {
            const curChildren = this.state.children, len = curChildren.length;
            this.setState({
                children: curChildren.concat([<SingLine key={len}
                                                        ref={ref => {
                                                            this.refObj.push(ref)
                                                        }}
                                                        placeholder={`输入第${len + 1}项数据`}
                                                        dataType={this.props.dataType}/>])
            })
        }

        render() {
            return (
                <React.Fragment>
                    <Button className={cn('add-btn')} type="dashed" onClick={this.handleAdd}>
                        <Icon type="plus"/>添加输入框
                    </Button>
                    {this.state.children.map((Comp, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className={cn('margin')}/>
                                {Comp}
                            </React.Fragment>);
                    })}
                </React.Fragment>)
        }
    }
}


export const SimpleDynamicItem = props => {
    const params = Object.assign({}, props);
    delete params.formStructure;
    return (<FormWrapper {...props}>
        <SimpleDynamicEntry {...params}/>
    </FormWrapper>)
}

class PriceInput extends React.Component {
    constructor(props) {
        super(props);

        const value = props.value || {};
        this.state = {
            number: value.number || 0,
            currency: value.currency || 'rmb',
        };
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }

    handleNumberChange = (e) => {
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
            return;
        }
        if (!('value' in this.props)) {
            this.setState({number});
        }
        this.triggerChange({number});
    }
    handleCurrencyChange = (currency) => {
        if (!('value' in this.props)) {
            this.setState({currency});
        }
        this.triggerChange({currency});
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        const {size} = this.props;
        const state = this.state;
        return (
            <span>
        <Input
            type="text"
            size={size}
            value={state.number}
            onChange={this.handleNumberChange}
            style={{width: '65%', marginRight: '3%'}}
        />
        <Select
            value={state.currency}
            size={size}
            style={{width: '32%'}}
            onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
        );
    }
}

class Demo extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    checkPrice = (rule, value, callback) => {
        if (value.number > 0) {
            callback();
            return;
        }
        callback('Price must greater than zero!');
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem label="Price">
                    {getFieldDecorator('price', {
                        initialValue: {number: 0, currency: 'rmb'},
                        rules: [{validator: this.checkPrice}],
                    })(<PriceInput/>)}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}