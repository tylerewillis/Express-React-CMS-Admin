import React, { useState } from 'react'

const Form = React.memo(({ con, forms, handleChange, removeSection }) => {

	const [ options, setOptions ] = useState(forms) //eslint-disable-line
	const [ value, setValue ] = useState(con.content)

	const setSelect = (value) => {
		setValue(value)
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: value
		})
	}

	return (
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-new-section'>
				<select value={value} onChange={e => setSelect(e.target.value)}>
					<option value=''>No form</option>
					{options && options.map((option, i) => {
						return <option value={option.name}>{option.name}</option>
					})}
				</select>
			</div>
			<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
		</div>
	)
})

export default Form