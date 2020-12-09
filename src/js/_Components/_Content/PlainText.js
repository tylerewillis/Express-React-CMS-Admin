import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const PlainText = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks, checkDuplicate, duplicateUrl, postType }) => {

	const [ cookies ] = useCookies(['role'])
	const [ blockClass, setBlockClass ] = useState((blocksOpen) ? 'ac-block active' : 'ac-block')
	const [ helperActive, setHelperActive ] = useState(false)

	const stringToUrl = string => {
	  var clean = string.replace(/[^a-zA-Z0-9- ]/g, '')
	  return clean.replace(/ /gm, "-").toLowerCase()
	}

	const sendChange = (e) => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: e.target.value
		})
		if (con.id === 1) checkDuplicate(stringToUrl(e.target.value))
	}

	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	useEffect(() => { // eslint-disable-line
		if (con.id === 1 && duplicateUrl) setBlockClass('ac-block active url-duplicate')
		else if (blocksOpen) setBlockClass('ac-block active')
		else setBlockClass('ac-block')
	})

	return (
		<div className={blockClass} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}
				{con.id === 1 && con.name === 'URL' && duplicateUrl && <span className='duplicate-url-text'>This is a duplicate URL. Please change before saving!</span>}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is a simple plain-text field where you can input non-formatted text, numbers and characters from your keyboard.</p>
				</div>
			</h2>
			<p className='acb-description'>{con.description}</p>
			<input defaultValue={con.content} onBlur={sendChange} readOnly={(con.id === 0 && con.content === 'Home') ? true : false} className={(con.id === 0 && con.content === 'Home') ? 'uneditable' : ''} />
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default PlainText