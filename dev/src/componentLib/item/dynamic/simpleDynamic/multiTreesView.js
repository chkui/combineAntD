import React from 'react'
import {List} from 'antd';
import {valueAndTypes2View} from './multiLineHelper'
const cn = require('classnames/bind').bind(require('./multiLineView.scss'));

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

/**
 *
 * @param props
 * @param {array} props.valueAndTypes 数据与类型列表
 * @constructor
 */
const MultiTreesView = props =>{
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

export default MultiTreesView