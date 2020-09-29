import React, { useState } from 'react'

const List = React.memo(({ con, handleChange, removeSection }) => {

	const [ items, setItems ] = useState((con.content.length) ? con.content.split(',') : [])

	const sendChange = (value) => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: value
		})
	}

	const addItem = e => {
		if (e.key === 'Enter') {
			let temp = items
			temp.push(e.target.value.trim())
			setItems(temp)
			sendChange(temp.join(','))
			// Reset
			e.target.value = ''
		}
	}

	const removeItem = item => {
		let temp = items
		let index = temp.indexOf(item)
		temp.splice(index,1)
		setItems(temp)
		sendChange(temp.join(','))
	}

	return (
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<input onKeyUp={(e) => addItem(e)} />
			<div className='list'>
				{items.map((item, i) => {
					return <p key={i}>{item.trim()}
						<i className="fas fa-times" onClick={() => removeItem(item)}></i>
					</p>
				})}
			</div>
			{(con.id !== 0) && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default List