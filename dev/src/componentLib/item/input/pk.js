import React from 'react'
import PropTypes from 'prop-types';
import {idGenerator} from '../../../database/idgenerator'
import {Form, Input} from 'antd';
import {FormConsumer} from '../../formContext'

import {BaseEntryItem} from '../baseItem'

const cn = require('classnames/bind').bind(require('./pk.scss'));

/**
 * 基本文字输入框
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @returns {*}
 * @constructor
 */
export class PKEntry extends React.Component {
    constructor(...props) {
        super(...props)
        this.state = {loading: true}
    }

    componentDidMount() {
        const _this = this,
            props = this.props;
        idGenerator(uuid => {
            const field = {};
            field[props.column] = uuid;
            props.form.setFieldsValue(field);
            _this.setState({loading: false});
        });
    }

    render() {
        const state = this.state;
        return (<BaseEntryItem loading={state.loading} {...this.props}>
            <Input className={cn('read-only-input')} type="text" disabled/>
        </BaseEntryItem>)
    }
}

PKEntry.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};