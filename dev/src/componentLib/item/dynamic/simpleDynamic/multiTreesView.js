import React from 'react'
import {Tree} from 'antd';

const TreeNode = Tree.TreeNode;
import {valueAndTypes2View} from './multiLineHelper'

const cn = require('classnames/bind').bind(require('./multiTreesView.scss'));

/**
 *
 * @param props
 * @param {array} props.valueAndTypes 数据与类型列表
 * @constructor
 */
const MultiTreesView = props => {
    let count = 0;
    return (
        <div className={cn('multi-trees-view')}>
            <Tree>
                {props.valueAndTypes ? props.valueAndTypes.map(node => buildTreeView(node)) :
                    <TreeNode key="no" disableCheckbox title="No Data!"/>
                }
            </Tree>
        </div>
    )
}

const buildTreeView = (node) => {
    return (<TreeNode key={node.id}
                      disableCheckbox
                      title={valueAndTypes2View({value: node.value, type: node.type})}>
        {node.children && node.children.map(child => buildTreeView(child))}
    </TreeNode>)
}

export default MultiTreesView