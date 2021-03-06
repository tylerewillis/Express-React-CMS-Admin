import React, { useState } from 'react'

const PlainText = React.memo(({ con, p, i, updateValue }) => {

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
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is a simple plain-text field where you can input non-formatted text, numbers and characters from your keyboard.</p>
				</div>
			</h2>
			<input defaultValue={con.value} onBlur={updateItem} />
		</div>
	)
})

export default PlainText