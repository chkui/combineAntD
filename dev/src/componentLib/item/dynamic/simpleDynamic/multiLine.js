import React from 'react'
import {Input, Select, Button, Modal, Icon} from 'antd';
import {FormItemType} from "../../../../../config/sysDefConfig";

/**
 * @param props
 * @param props.visible 是否显示输入框
 * @param props.onClose 关闭
 * @param props.onSubmit 提交 (valueAndTypeList)=>{ valueAndTypeList[0].value valueAndTypeList[0].type}
 */
export default class MultiLine extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {children: []}
        this.childrenRef = {};
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAdd() {
        const curChildren = this.state.children, len = curChildren.length;
        this.setState({
            children: curChildren.concat([(
                <Line key={len}
                      id={len}
                      ref={ref => {
                          this.childrenRef[len] = ref;
                      }}/>
            )])
        })
    }

    handleSubmit() {
        const keys = Object.keys(this.childrenRef), valueAndTypes = [];
        for (let key of keys) {
            valueAndTypes.push(this.childrenRef[key].getValue());
        }
        this.props.onSubmit(valueAndTypes)
    }

    handleCancel() {
        this.props.onClose();
    }

    render() {
        const {props} = this;
        return (
            <Modal title="请输入数据"
                   visible={props.visible}
                   onOk={this.handleSubmit}
                   onCancel={this.handleCancel}
                   okText="确认"
                   cancelText="取消">
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
            </Modal>
        )
    }
}

/**
 *
 */
class Line extends React.Component {
    constructor(...props) {
        super(...props)
        this.value = {
            [FormItemType.VCHAR]: '',
            [FormItemType.DOUBL]: '',
            [FormItemType.MONEY]: '',
        }
        this.state = {
            data: {
                [FormItemType.VCHAR]: '',
                [FormItemType.DOUBL]: '',
                [FormItemType.MONEY]: '￥',
            },
            type: FormItemType.VCHAR
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleChange(e) {
        this.setValue(e.target.value)
    }

    getValue() {
        return this.value[this.state.type];
    }

    setValue(value) {
        const {data, type} = this.state;
        switch (type) {
            case FormItemType.DOUBL:
                this.value[type] = this.checkNumber(value);
                data[type] = this.paramsNumber(this.value[type]);
                break;
            case FormItemType.MONEY:
                this.value[type] = this.checkNumber(value);
                data[type] = `￥${this.paramsNumber(this.value[type])}`;
                break;
            default:
                data[type] = value;
                break;
        }
        this.setState({data})
    }

    paramsNumber(value) {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    checkNumber(value) {
        return value.replace(/[^0-9]/ig, '');
    }

    handleSelect(type) {
        this.setState({type});
    }

    render() {
        const {data, type} = this.state;
        return (
            <Input addonAfter={(
                <Select value={this.state.type}
                        onSelect={this.handleSelect}>
                    <Option value={FormItemType.VCHAR}>文本</Option>
                    <Option value={FormItemType.DOUBL}>数字</Option>
                    <Option value={FormItemType.MONEY}>金钱</Option>
                </Select>
            )}
                   value={data[type]}
                   onChange={this.handleChange}
            />
        )
    }
}