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
            id = fluent(props.form).then(form=>form.id).else(false);
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
            form: structure.form
        }
    },
    (dispatch, props) => ({
        onLoadForm: id => dispatch(loadFormStructureAction(id))
    })
)(FormComponent)

module.exports = Form;