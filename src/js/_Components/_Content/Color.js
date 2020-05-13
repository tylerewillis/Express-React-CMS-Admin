import React from 'react'

const Color = React.memo(({ con, handleChange, removeSection }) => {

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
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-color'>
				<input type='color' onChange={sendChange} defaultValue={con.content} />
			</div>
			<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
		</div>
	)
})

export default Color