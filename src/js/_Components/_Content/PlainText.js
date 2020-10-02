import React from 'react'
import { useCookies } from 'react-cookie'

const PlainText = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])

	const sendChange = (e) => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: e.target.value
		})
	}

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<input defaultValue={con.content} onBlur={sendChange} readOnly={(con.id === 0 && con.content === 'Home') ? true : false} className={(con.id === 0 && con.content === 'Home') ? 'uneditable' : ''} />
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default PlainText