import React, { useState } from 'react'

const Select = React.memo(({ con, p, i, updateValue }) => {

	const [ helperActive, setHelperActive ] = useState(false)

	const updateItem = (e) => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: e.target.value,
			options: con.options
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
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is a select field where you can choose an item from the options given.</p>
				</div>
			</h2>
			<div className='acb-select'>
				<select onBlur={updateItem} defaultValue={con.value}>
					<option value=''>Choose</option>
					{con.options.map((opt, i) => {
						return <option value={opt}>{opt.charAt(0).toUpperCase() + opt.substr(1)}</option>
					})}
				</select>
			</div>
		</div>
	)
})

export default Select