import React, { useState } from 'react'

const Color = React.memo(({ con, p, i, updateValue }) => {

	const [ helperActive, setHelperActive ] = useState(false)

	const updateItem = (e) => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: e.target.value
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
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This section allows you to select a color.</p>
				</div>
			</h2>
			<div className='acb-color'>
				<input type='color' onBlur={updateItem} defaultValue={con.content} />
			</div>
		</div>
	)
})

export default Color