import React, { useState } from 'react'

const Form = React.memo(({ con, p, i, forms, updateValue, removeSection }) => {

	const [ options, setOptions ] = useState(forms) //eslint-disable-line
	const [ value, setValue ] = useState(con.content)

	const updateItem = (value) => {
		setValue(value)
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: value
		})
	}

	return (
		<div className='item'>
			<h2>{con.name}</h2>
			<div className='acb-new-section'>
				<select value={value} onChange={e => updateItem(e.target.value)}>
					<option value=''>No form</option>
					{options && options.map((option, i) => {
						return <option value={option.name}>{option.name}</option>
					})}
				</select>
			</div>
		</div>
	)
})

export default Form