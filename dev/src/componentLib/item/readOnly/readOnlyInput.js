import React from 'react'
import PropTypes from 'prop-types';
import {Form, Input} from 'antd';
const cn = require('classnames/bind').bind(require('./readOnlyInput.scss'));

/**
 * Input对应的只读组件，可以通过外包装的form来控制参数
 */
class ReadOnlyInput extends React.Component{
    render(){
        return(<Input className={cn('read-only-input')} type="text" disabled {...this.props}/>)
    }
}

export default ReadOnlyInput