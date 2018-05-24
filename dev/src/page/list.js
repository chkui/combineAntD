import React from 'react'
import SearchTable from '../componentLib/list/searchTable'
import {StateCode} from '../../config/redux/formReducer'
import {connect} from 'react-redux'
import {loadFormStructureAction} from '../../config/redux/formAction'

class ListComponent extends React.Component {
    componentDidMount(){
        const props = this.props;
        props.onLoadForm(props.match.params.formId);
    }

    render() {
        const props = this.props;

        return StateCode.suc === props.stateCode ? (<SearchTable form={props.form} />) : null;
    }
}

const List = connect(
    state => {
        const structure = state.formStructureReducer;
        return {
            stateCode: structure.stateCode,
            form: structure.form
        }
    },
    (dispatch, props) => ({
        onLoadForm: id => dispatch(loadFormStructureAction(id))
    })
)(ListComponent)

module.exports = List;