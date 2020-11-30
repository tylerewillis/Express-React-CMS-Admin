import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Color = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])
	const [ helperActive, setHelperActive ] = useState(false)

	const sendChange = (e) => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: e.target.value
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
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This section allows you to select a color.</p>
				</div>
			</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-color'>
				<input type='color' onChange={sendChange} defaultValue={con.content} />
			</div>
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Color