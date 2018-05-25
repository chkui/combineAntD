import React from 'react'

/**
 * 修改标题组件，服务端不能运行
 * @param props.title 要显示的title
 * @param props.isRender 是否渲染出组件，默认为 false
 * @returns {XML}
 * @constructor
 */
class BrowserTitle extends React.Component{
    componentDidMount(){
        document.title = this.props.title
    }

    render(){
        const props = this.props;
        return props.isRender ? (<span>{props.title}</span>) : null;
    }
}

export default BrowserTitle