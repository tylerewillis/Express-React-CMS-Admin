import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import * as ContactActionCreators from '../_Redux/_Actions/contact'
import { connect } from 'react-redux'

import Data from './_FormData/Render-General.js'

import Input from './_FormElements/Input'
import Textarea from './_FormElements/Textarea'
import Checkbox from './_FormElements/Checkbox'
import Select from './_FormElements/Select'

const Form = React.memo((props) => {

	var { dispatch, inputs } = props
	const updateValue = bindActionCreators(ContactActionCreators.updateValue, dispatch)

	const generateFormComponent = (input, index = null) => {
		switch(input.type) {
			case 'select':
				return <Select key={index} {...input} value={inputs[input.inputName]} updateValue={updateValue} />
			case 'checkbox':
				return <Checkbox key={index} {...input} value={inputs[input.inputName]} updateValue={updateValue} />
			case 'textarea':
				return <Textarea key={index} {...input} value={inputs[input.inputName]} updateValue={updateValue} />
			default:
				return <Input key={index} {...input} value={inputs[input.inputName]} updateValue={updateValue} />
		}
	}

	const inputComponents = Data.FormInputs.map((input, index) => {
		return generateFormComponent(input, index)
	})

	const handleSubmit = (e) => {
		props.onFormSubmit(inputs)
		e.preventDefault()
	}

	return (
		<form onSubmit={handleSubmit}>
			{inputComponents}
			<input type='submit' value='Submit' />
		</form>
	)
})

Form.propTypes = {
	dispatch: PropTypes.func,
	inputs: PropTypes.array,
	onFormSubmit: PropTypes.func
}

const mapStateToProps = state => ({inputs: state})
export default connect(mapStateToProps)(Form)