import React from 'react'

const Select = React.memo(({ con, handleChange, removeSection }) => {

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
			<div className='acb-select'>
				<select onChange={sendChange} defaultValue={con.content}>
					<option value=''>Choose</option>
					{con.options.map((opt, i) => {
						return <option value={opt}>{opt.charAt(0).toUpperCase() + opt.substr(1)}</option>
					})}
				</select>
			</div>
			<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
		</div>
	)
})

export default Select