import React from 'react'
import PropTypes from 'prop-types'

const PlainText = React.memo(({ con, handleChange, removeSection }) => {

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
			<input defaultValue={con.content} onChange={sendChange} readOnly={(con.content === 'Home') ? true : false} className={(con.content === 'Home') ? 'uneditable' : ''} />
			{(con.id !== 0) && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

PlainText.propTypes = {
	con: PropTypes.array,
	handleChange: PropTypes.func
}

export default PlainText