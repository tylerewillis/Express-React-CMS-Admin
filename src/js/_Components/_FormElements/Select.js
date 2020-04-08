import React from 'react'
import PropTypes from 'prop-types'

const Select = React.memo((props) => {

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
			<select
				name={props.inputName}
				required={props.required ? props.required : false}
				onChange={handleChange}
				defaultValue={props.value ? props.value : ''}>
				{props.options.map((option, index) =>
					<option
						key={index}
						value={option}>{option}</option>
				)}
			</select>
		</label>
	)
})

Select.propTypes = {
	name: PropTypes.string.isRequired,
	inputName: PropTypes.string.isRequired,
	updateValue: PropTypes.func,
	type: PropTypes.string,
	display: PropTypes.string,
	margin: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	options: PropTypes.array
}

export default Select