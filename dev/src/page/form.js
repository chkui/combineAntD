import React from 'react'
import {StateCode} from '../../config/redux/formReducer'
import formStructure from '../componentLib/highOrder/formStructure'
import {fluent} from 'es-optional'
import FormBoot from '../componentLib/form/formBoot'
import {loadFormStructureAction} from '../../config/redux/formAction'

class FormComponent extends React.Component {
    constructor(...props) {
        super(...props)
    }

    componentDidMount() {
        const props = this.props,
            id = fluent(props.formStructure).then(fs=>fs.id).else(false);
        (id !== props.match.params.form) && props.loadForm(props.match.params.form);
    }

    render() {
        const {props} = this;
        return StateCode.suc === props.stateCode ? (<FormBoot stateCode={props.stateCode} formStructure={props.formStructure}/>) : null;
    }
}

const Form = formStructure()(FormComponent)

module.exports = Form;