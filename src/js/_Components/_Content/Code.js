import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const PlainText = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks, checkDuplicate, duplicateUrl, postType }) => {

	const [ cookies ] = useCookies(['role'])
	const [ blockClass, setBlockClass ] = useState((blocksOpen) ? 'ac-block active' : 'ac-block')
	const [ helperActive, setHelperActive ] = useState(false)

	const sendChange = (e) => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: e.target.value
		})
		if (con.id === 1) checkDuplicate(e.target.value)
	}

	useEffect(() => { // eslint-disable-line
		if (blocksOpen) setBlockClass('ac-block active')
		else setBlockClass('ac-block')
	})

	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	return (
		<div className={blockClass} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is a code input field where you can paste HTML, JavaScript or CSS.</p>
				</div>
			</h2>
			<p className='acb-description'>{con.description}</p>
			<textarea defaultValue={con.content} onBlur={sendChange} className='code-textarea' />
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default PlainText