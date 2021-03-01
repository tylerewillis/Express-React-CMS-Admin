import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Dates = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])
	const [ dates, setDates ] = useState(con.content.split(','))
	const [ helperActive, setHelperActive ] = useState(false)

	const updateDates = parent => {
		var dats = []

		parent.querySelectorAll('.item').forEach(item => {
			dats.push(item.querySelector('input').value)
		})

		//setDates(dats)
		return dats
	}

	const sendChange = e => {
		var parent = ''
		if (e.target)
			parent = e.target.closest('.dates-editor')
		else parent = e

		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: updateDates(parent).join(',')
		})
	}

	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	const addDate = () => {
		setDates([ ...dates, '' ])
	}

	const removeDate = e => {
		let parent = e.target.closest('.dates-editor')
		let items = parent.querySelectorAll('.item')
		if (items.length > 1) {
			if (window.confirm('Are you sure that you want to remove this date?')) {
				parent.removeChild(e.target.closest('.item'))
				sendChange(parent)
			}
		} else window.alert('Sorry - you must have keep at least 1 date input even if empty.')
	}

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This section allows you to select one or multiple dates.</p>
				</div>
			</h2>
			<p className='acb-description'>{con.description}</p>
			<div className={con.name.toLowerCase().includes('range') ? 'dates-editor dates-editor-range' : 'dates-editor'}>
				{dates.map((date, i) => {
					return <div className='item'><input type='datetime-local' key={i} defaultValue={date} onChange={sendChange} />
						{!con.name.toLowerCase().includes('range') && <i className="fas fa-times" onClick={e => removeDate(e)}></i>}
						</div>
				})}
				{con.name.toLowerCase().includes('range') && dates.length === 1 && <div className='item'><input type='datetime-local' defaultValue='' onChange={sendChange} /></div>}
			</div>
			{!con.name.toLowerCase().includes('range') &&
				<div className='date-add'>
					<p onClick={addDate}><i className="fas fa-plus"></i>Add Date</p>
				</div>
			}
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Dates