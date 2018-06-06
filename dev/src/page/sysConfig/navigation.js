import React from 'react'
import Tree from './tree'
import Detail from './detail'

const ModifyType = {
    ADD: 1,
    MODIFY: 2,
    DELETE: 3
}

class Navigation extends React.Component {
    constructor(...props) {
        super(...props)
        this.todoList = [];
    }

    render() {
        return (
            <React.Fragment>
                <Tree/>
                <Detail/>
            </React.Fragment>
        )
    }
}

module.exports = Navigation;