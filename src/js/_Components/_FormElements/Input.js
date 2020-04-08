import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Input = React.memo((props) => {

	useEffect(() => {
		if (props.name === 'ip') {
			(async function getIp(url) {
				try {
			    const response = await fetch(url)
					const json = await response.json()
					props.updateValue(json.ip)
				} catch (error) {
					return null
				}
			})("https://jsonip.com")
		}
	},[props])

	return (
		<label htmlFor={props.inputName}>{props.name}
			<input
				type={props.type}
				name={props.inputName}
				required={props.required ? props.required : false}
				onChange={e => props.updateValue(e)}
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
	required: PropTypes.bool
}

export default Input