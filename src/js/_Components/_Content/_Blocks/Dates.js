import React, { useState } from 'react'

const Dates = React.memo(({ con, p, i, updateValue, removeSection }) => {

	const [ start, setStart ] = useState(con.value.split(',')[0])
	const [ end, setEnd ] = useState(con.value.split(',')[1])
	const [ helperActive, setHelperActive ] = useState(false)

	const updateDate = (e) => {
		console.log(e)
		console.log(e.target.value)
		if (e.target.name === 'start') {
			updateValue(p,i, {
				type: con.type,
				name: con.name,
				value: e.target.value + ',' + end
			})
			setStart(e.target.value)
		} else {
			updateValue(p,i, {
				type: con.type,
				name: con.name,
				value: start + ',' + e.target.value
			})
			setEnd(e.target.value)
		}
		updateItem()
	}

	const updateItem = () => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: start + ',' + end
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
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This section allows you to select one or multiple dates.</p>
				</div>
			</h2>
			<div className='dates-editor'>
				<input type='datetime-local' name='start' value={start} onBlur={(e) => updateDate(e)} placeholder='Start' />
				<input type='datetime-local' name='end' value={end} onBlur={updateDate} placeholder='End (if applicable)' />
			</div>
		</div>
	)
})

export default Dates