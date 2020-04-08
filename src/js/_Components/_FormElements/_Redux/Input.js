import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Input = React.memo((props) => {

	const handleChange = (e) => {
		props.updateValue(props.inputName, props.type, e.target.value)
	}

	useEffect(() => {
		if (props.name === 'ip') {
			(async function getIp(url) {
				try {
			    const response = await fetch(url)
					const json = await response.json()
					props.updateValue('0_ip', json.ip)
				} catch (error) {
					return null
				}
			})("https://jsonip.com")
		}
	},[props])

	var inputStyle = {
		display: props.display ? props.display == 'none' ? 'none' : 'inline-block' : 'inline-block',
		width: props.display ? props.display !== 'none' ? props.display : '100%' : '100%',
		marginRight: props.margin ? props.margin : '0px'
	}

	return (
		<label htmlFor={props.inputName} style={inputStyle}>{props.name}
			<input
				type={props.type}
				name={props.inputName}
				required={props.required ? props.required : false}
				onChange={handleChange}
				defaultValue={props.value ? props.value : ''}
			/>
		</label>
	)
})

Input.propTypes = {
	name: PropTypes.string.isRequired,
	inputName: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	updateValue: PropTypes.func,
	display: PropTypes.string,
	margin: PropTypes.string,
	required: PropTypes.bool
}

export default Input