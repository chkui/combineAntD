import React from 'react'
import Data from './list/data'
import BrowserTitle from '../componentLib/title/browserTitle'
import {StateCode} from '../../config/redux/formReducer'
import {connect} from 'react-redux'
import {loadFormStructureAction} from '../../config/redux/formAction'
import {routes} from '../../config/url'

class ListComponent extends React.Component {
    componentDidMount(){
        const props = this.props;
        props.onLoadForm(props.match.params[routes.list.params.form]);
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


const List = connect(
    state => {
        const structure = state.formStructureReducer;
        return {
            stateCode: structure.stateCode,
            formStructure: structure.formStructure
        }
    },
    (dispatch, props) => ({
        onLoadForm: id => dispatch(loadFormStructureAction(id))
    })
)(ListComponent)

module.exports = List;