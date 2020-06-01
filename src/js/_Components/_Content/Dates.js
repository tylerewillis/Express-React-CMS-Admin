import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Dates = React.memo(({ con, handleChange, removeSection }) => {

	const [ start, setStart ] = useState(con.content.split(',')[0])
	const [ end, setEnd ] = useState(con.content.split(',')[1])

	const updateDate = (e) => {
		if (e.target.name === 'start') {
			handleChange({
				id: con.id,
				type: con.type,
				name: con.name,
				description: con.description,
				content: e.target.value + ',' + end
			})
			setStart(e.target.value)
		} else {
			handleChange({
				id: con.id,
				type: con.type,
				name: con.name,
				description: con.description,
				content: start + ',' + e.target.value
			})
			setEnd(e.target.value)
		}
	}

	return (
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='dates-editor'>
				<input type='datetime-local' name='start' value={start} onBlur={updateDate} placeholder='Start' />
				<input type='datetime-local' name='end' value={end} onBlur={updateDate} placeholder='End (if applicable)' />
			</div>
			<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
		</div>
	)
})

Dates.propTypes = {
	con: PropTypes.array,
	handleChange: PropTypes.func
}

export default Dates