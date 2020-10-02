import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Dates = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])
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
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='dates-editor'>
				<input type='datetime-local' name='start' value={start} onChange={updateDate} placeholder='Start' />
				<input type='datetime-local' name='end' value={end} onChange={updateDate} placeholder='End (if applicable)' />
			</div>
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Dates