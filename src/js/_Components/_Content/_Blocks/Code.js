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
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is a code input field where you can paste HTML, JavaScript or CSS.</p>
				</div>
			</h2>
			<textarea defaultValue={con.value} onBlur={updateItem} className='code-textarea' />
		</div>
	)
})

export default PlainText