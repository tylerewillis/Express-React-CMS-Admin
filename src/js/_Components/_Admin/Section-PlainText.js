import React from 'react'
import PropTypes from 'prop-types'

const PlainText = React.memo(({ con, handleChange, role, removeSection }) => {

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
			<input defaultValue={con.content} onChange={sendChange} />
			{role === 'super' &&
				<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
			}
		</div>
	)
})

PlainText.propTypes = {
	con: PropTypes.array,
	handleChange: PropTypes.func
}

export default PlainText