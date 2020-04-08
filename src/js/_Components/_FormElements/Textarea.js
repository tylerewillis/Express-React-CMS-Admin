import React from 'react'
import PropTypes from 'prop-types'

const Textarea = React.memo(props => {
	
	const handleChange = (e) => {
		props.updateValue(props.inputName, props.type, e.target.value)
	}

	var inputStyle = {
		display: props.display ? props.display === 'none' ? 'none' : 'inline-block' : 'inline-block',
		width: props.display ? props.display !== 'none' ? props.display : '100%' : '100%',
		marginRight: props.margin ? props.margin : '0px'
	}

	return (
		<label htmlFor={props.inputName} style={inputStyle}>{props.name}
			<textarea
				name={props.inputName}
				required={props.required ? props.required : false}
				onChange={handleChange}
				defaultValue={props.value ? props.value : ''}
			/>
		</label>
	)
})

Textarea.propTypes = {
	name: PropTypes.string.isRequired,
	inputName: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	updateValue: PropTypes.func,
	type: PropTypes.string,
	display: PropTypes.string,
	margin: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.string
}

export default Textarea