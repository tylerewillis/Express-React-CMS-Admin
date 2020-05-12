import React, { useState } from 'react'

const Dates = React.memo(({ con, p, i, updateValue, removeSection }) => {

	const [ start, setStart ] = useState(con.value.split(',')[0])
	const [ end, setEnd ] = useState(con.value.split(',')[1])

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

	return (
		<div className='item'>
			<h2>{con.name}</h2>
			<div className='dates-editor'>
				<input type='datetime-local' name='start' value={start} onChange={(e) => updateDate(e)} placeholder='Start' />
				<input type='datetime-local' name='end' value={end} onChange={updateDate} placeholder='End (if applicable)' />
			</div>
		</div>
	)
})

export default Dates