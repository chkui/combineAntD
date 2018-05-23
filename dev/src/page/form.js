import React from 'react'
import HorizontalForm from '../componentLib/form/horizontalForm'

const Form = props => {
    props.match.params
    return (
        <div>
            <div>
                <HorizontalForm/>
            </div>
        </div>)
}
export default Form