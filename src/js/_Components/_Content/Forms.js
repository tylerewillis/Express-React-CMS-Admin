import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Form = React.memo(({ con, forms, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])
	const [ options ] = useState(forms)
	const [ value, setValue ] = useState(con.content)

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

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-new-section'>
				<select value={value} onChange={e => setSelect(e.target.value)}>
					<option value=''>No form</option>
					{options && options.map((option, i) => {
						return <option value={option.name}>{option.name}</option>
					})}
				</select>
			</div>
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Form