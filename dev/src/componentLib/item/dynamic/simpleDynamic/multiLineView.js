import React from 'react'
import {List} from 'antd';
import {valueAndTypes2View} from './multiLineHelper'
const cn = require('classnames/bind').bind(require('./multiLineView.scss'));

/**
 *
 * @param props
 * @param {array} props.valueAndTypes 数据与类型列表
 * @constructor
 */
const MultiLineView = props =>{
    let count = 0;
    return (
        <List
            size="small"
            bordered
            dataSource={valueAndTypes2View(props.valueAndTypes)}
            renderItem={item => {
                return (<List.Item>
                    <span className={cn('num')}>{++count}</span>
                    <span className={cn('data')}>{item}</span>
                </List.Item>)
            }}
        />
    )
}

export default MultiLineView