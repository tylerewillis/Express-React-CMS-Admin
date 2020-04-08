import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Text = React.memo(({ con, handleChange, role, removeSection }) => {

	const [ selectValue, setSelectValue ] = useState(con.content)

	const sendChange = (e) => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: e.target.value
		})
		setSelectValue(e.target.value)
	}

	return (
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='atbs-editor'>
				<select onChange={sendChange} value={selectValue}>
					<option value='Center'>Center</option>
					<option value='Top'>Top</option>
					<option value='Bottom'>Bottom</option>
				</select>
			</div>
			{role === 'super' &&
				<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
			}
		</div>
	)
})

Text.propTypes = {
	con: PropTypes.array,
	handleChange: PropTypes.func
}

export default Text