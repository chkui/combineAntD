import React from 'react'
import Data from './list/data'
import BrowserTitle from '../componentLib/title/browserTitle'
import {StateCode} from '../../config/redux/formReducer'
import formStructure from '../componentLib/highOrder/formStructure'
import {connect} from 'react-redux'
import {loadFormStructureAction} from '../../config/redux/formAction'
import {routes} from '../../config/url'

class ListComponent extends React.Component {
    componentDidMount(){
        const props = this.props;
        props.loadForm(props.match.params[routes.list.params.form]);
    }

    render() {
        const props = this.props, formStructure = props.formStructure;
        return StateCode.suc === props.stateCode ? (
            <div>
                <BrowserTitle title={formStructure.label}/>
                <Data formStructure={formStructure} />
            </div>
        ) : null;
    }
}


const List = formStructure()(ListComponent);

module.exports = List;