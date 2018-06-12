import React from 'react'
import PropTypes from 'prop-types';
import {idGenerator} from '../../../database/idgenerator'
import ReadOnlyInput from '../readOnly/readOnlyInput'
import FormWrapper from '../formWrapper'

const cn = require('classnames/bind').bind(require('./regularId.scss'));

export const RegularIdEntry = ReadOnlyInput;
/**
 * 用于表单域的主键包装组件，用于显示或生成主键
 * @param props
 * @param props.form 接收 Form的form参数，用于提供验证功能
 * @param props.tip 录入的提示信息
 * @param props.label 标签信息
 * @returns {*}
 * @constructor
 */
export class RegularIdItem extends React.Component {
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
        const state = this.state,
            params = Object.assign({}, this.props)
            delete params.formStructure;
        return (<FormWrapper {...this.props}>
            <ReadOnlyInput {...params}/>
        </FormWrapper>)
    }
}

RegularIdItem.propTypes = {
    column: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rules: PropTypes.array,
    tip: PropTypes.string
};