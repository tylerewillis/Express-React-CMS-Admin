import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Form = React.memo(({ con, forms, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])
	const [ options ] = useState(forms)
	const [ value, setValue ] = useState(con.content)
	const [ helperActive, setHelperActive ] = useState(false)

	const setSelect = (value) => {
		setValue(value)
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: value
		})
	}

	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This section allows you to select an existing form to put on the page.</p>
				</div>
			</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-new-section'>
				<select value={value} onChange={e => setSelect(e.target.value)}>
					<option value=''>No form</option>
					{options && options.map((option, i) => {
						return <option value={option.name} key={i}>{option.name}</option>
					})}
				</select>
			</div>
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Form