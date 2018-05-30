import React from 'react'
import PropTypes from 'prop-types';
import {idGenerator} from '../../../database/idgenerator'
import {Form, Input} from 'antd';
import {FormConsumer} from '../../formContext'

import FormWrapper from '../formWrapper'

const cn = require('classnames/bind').bind(require('./pk.scss'));

/**
 * 主键包装组件，用于显示或生成主键
 *
 * @param props
 * @constructor
 */
export const PKEntry = props => <Input className={cn('read-only-input')} type="text" disabled {...props}/>

/**
 * 用于表单域的主键包装组件，用于显示或生成主键
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @returns {*}
 * @constructor
 */
export class PKItem extends React.Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        const _this = this,
            props = this.props;
        idGenerator(uuid => {
            const field = {};
            field[props.column] = uuid;
            props.form.setFieldsValue(field);
        });
    }

    render() {
        const state = this.state;
        return (<FormWrapper {...this.props}>
            <PKEntry {...this.props}/>
        </FormWrapper>)
    }
}

PKItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};