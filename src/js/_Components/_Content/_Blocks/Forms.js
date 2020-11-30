import React, { useState } from 'react'

const Form = React.memo(({ con, p, i, forms, updateValue, removeSection }) => {

	const [ options, setOptions ] = useState(forms) //eslint-disable-line
	const [ value, setValue ] = useState(con.value)
	const [ helperActive, setHelperActive ] = useState(false)

	const updateItem = (value) => {
		setValue(value)
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: value
		})
	}

	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	return (
		<div className='item'>
			<h2>{con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This section allows you to select an existing form to put on the page.</p>
				</div>
			</h2>
			<div className='acb-new-section'>
				<select defaultValue={value} onChange={e => updateItem(e.target.value)}>
					<option value=''>No form</option>
					{options && options.map((option, i) => {
						return <option key={i} value={option.name}>{option.name}</option>
					})}
				</select>
			</div>
		</div>
	)
})

export default Form