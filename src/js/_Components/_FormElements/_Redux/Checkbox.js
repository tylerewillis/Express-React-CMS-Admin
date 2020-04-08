import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = React.memo((props) => {

	const handleChange = (e) => {
		props.updateValue(props.inputName, props.type, e.target.value)
	}

	var inputStyle = {
		width: props.display ? props.display !== 'none' ? props.display : '100%' : '100%',
		marginRight: props.margin ? props.margin : '0px'
	}

	return (
		<div className='checkbox'>
			<label htmlFor={props.inputName} style={inputStyle}>{props.name}
				<input
					type='checkbox'
					name={props.inputName}
					id={props.inputName}
					required={props.required ? props.required : false}
					onChange={handleChange}
					checked={props.value ? props.value : ''}
				/>
				<span></span>
				<p>{props.text}</p>
			</label>
		</div>
	)
})

Checkbox.propTypes = {
	name: PropTypes.string.isRequired,
	inputName: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	updateValue: PropTypes.func,
	display: PropTypes.string,
	margin: PropTypes.string,
	required: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default Checkbox