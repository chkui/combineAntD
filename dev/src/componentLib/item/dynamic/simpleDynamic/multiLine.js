import React from 'react'
import PropTypes from 'prop-types';
import {Input, Select, Button, Modal, Icon} from 'antd';
import {FormItemType} from "../../../../../config/sysDefConfig";
import {idGen} from "../../../../database/idgenerator";
import {valueAndTypes2View, view2ValueAndTypes, checkNumber} from './multiLineHelper'

const Option = Select.Option;
const cn = require('classnames/bind').bind(require('./multiLine.scss'));

/**
 * @param props
 * @param {array} props.valueAndTypes 初始化数据
 * @param props.onClose 关闭
 * @param props.onSubmit 提交 (valueAndTypeList)=>{ valueAndTypeList[0].value valueAndTypeList[0].type}
 */
export default class MultiLine extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {valueAndTypes: this.props.valueAndTypes || []};
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
    }

    handleAdd() {
        const {valueAndTypes} = this.state;
        valueAndTypes.push({id: idGen(), value: '', type: FormItemType.VCHAR});
        this.setState({valueAndTypes})
    }

    handleSubmit() {
        this.props.onSubmit(this.state.valueAndTypes.filter(v_t => v_t.value))
    }

    handleCancel() {
        this.props.onClose();
    }

    handleChange(pos, typeAndValue) {
        const {valueAndTypes} = this.state;
        valueAndTypes[pos] = typeAndValue;
        this.setState({valueAndTypes});
    }

    handleUp(pos) {
        if (0 < pos) {
            const {valueAndTypes} = this.state, tmp = valueAndTypes[pos];
            valueAndTypes[pos] = valueAndTypes[pos - 1];
            valueAndTypes[pos - 1] = tmp;
            this.setState({valueAndTypes});
        }
    }

    handleDown(pos) {
        const {valueAndTypes} = this.state
        if (valueAndTypes.length > pos + 1) {
            const tmp = valueAndTypes[pos];
            valueAndTypes[pos] = valueAndTypes[pos + 1];
            valueAndTypes[pos + 1] = tmp;
            this.setState({valueAndTypes});
        }
    }

    render() {
        const {props} = this;
        return (
            <Modal title="请输入数据"
                   visible
                   onOk={this.handleSubmit}
                   onCancel={this.handleCancel}
                   okText="确认"
                   cancelText="取消">
                <Button className={cn('add-btn')} type="dashed" onClick={this.handleAdd}>
                    <Icon type="plus"/>添加输入框
                </Button>
                {this.state.valueAndTypes.map((valueAndType, index) => {
                    const id = valueAndType.id;
                    return (
                        <React.Fragment key={index}>
                            <div className={cn('margin')}/>
                            <Line key={id}
                                  pos={index}
                                  valueAndType={valueAndType}
                                  onChange={this.handleChange}
                                  onUp={this.handleUp} onDown={this.handleDown}/>
                        </React.Fragment>);
                })}
            </Modal>
        )
    }
}

MultiLine.propTypes = {
    valueAndTypes: PropTypes.array,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

/**
 * @param props.pos
 * @param props.valueAndType
 * @param props.valueAndType.type
 * @param props.valueAndType.value
 * @param props.onChange(id, valueAndType)
 * @param props.onUp(id)
 * @param props.onDown(id)
 */
class Line extends React.Component {
    constructor(...props) {
        super(...props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUp = this.handleUp.bind(this);
        this.handleDown = this.handleDown.bind(this);
    }

    handleUp() {
        const {props} = this;
        props.onUp(props.pos);
    }

    handleDown() {
        const {props} = this;
        props.onDown(props.pos);
    }

    handleChange(e) {
        const {props} = this;
        props.onChange(props.pos, view2ValueAndTypes({type: props.valueAndType.type, value: e.target.value}))
    }

    handleSelect(type) {
        const {props} = this;
        props.onChange(props.pos, {type, value: ''})
    }

    render() {
        const {valueAndType} = this.props;
        return (
            <div>
                <Input
                    addonBefore={(
                        <Select value={valueAndType.type}
                                onSelect={this.handleSelect}>
                            <Option value={FormItemType.VCHAR}>文本</Option>
                            <Option value={FormItemType.DOUBL}>数字</Option>
                            <Option value={FormItemType.MONEY}>金钱</Option>
                        </Select>)}
                    addonAfter={(
                        <React.Fragment>
                            <Icon className={cn('block')} type="up" onClick={this.handleUp}/>
                            <Icon className={cn('block')} type="down" onClick={this.handleDown}/>
                        </React.Fragment>
                    )}
                    value={valueAndTypes2View(checkNumber(valueAndType))}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

Line.defaultProps = {
    valueAndType: {value: '', type: FormItemType.VCHAR}
};