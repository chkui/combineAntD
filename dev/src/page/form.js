import React from 'react'
import {connect} from 'react-redux'
import {fluent} from 'es-optional'
import FormBoot from '../componentLib/form/formBoot'
import {loadFormStructureAction} from '../../config/redux/formAction'

class FormComponent extends React.Component {
    constructor(...props) {
        super(...props)
        console.log('form mount')
    }

    componentDidMount() {
        const props = this.props,
            id = fluent(props.formStructure).then(fs=>fs.id).else(false);
        (id !== props.match.params.form) && props.onLoadForm(props.match.params.form);
    }

    render() {
        return (
            <div>
                <FormBoot/>
            </div>
        )
    }
}

const Form = connect(
    state => {
        const structure = state.formStructureReducer;
        return {
            stateCode: structure.stateCode,
            formStructure: structure.formStructure
        }
    },
    (dispatch, props) => ({
        onLoadForm: fsId => dispatch(loadFormStructureAction(fsId))
    })
)(FormComponent)

module.exports = Form;