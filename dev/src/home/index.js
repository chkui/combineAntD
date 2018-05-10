import React from 'react'
import { DatePicker, message } from 'antd';

const cn = require('classnames/bind').bind(require('./home.scss'));

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }
    handleChange(date) {
        message.info('您选择的日期是: ' + date.toString());
        this.setState({ date });
    }
    render() {
        return (
            <div>
                <DatePicker onChange={value => this.handleChange(value)} />
                <div style={{ marginTop: 20 }}>当前日期：{this.state.date.toString()}</div>
                <div style={{height:'3000px', width:'100%', backgroundColor: '#000'}}>123</div>
            </div>
        );
    }
}

module.exports = Home;