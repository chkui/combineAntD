import React from 'react'
import { DatePicker, message } from 'antd';
import html from './home/home.html'
const cn = require('classnames/bind').bind(require('./home/home.scss'));

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
            <div className={cn('home-box')} dangerouslySetInnerHTML={{__html:html}} />
        );
    }
}

module.exports = Home;