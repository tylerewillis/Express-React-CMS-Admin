import React from 'react'

const Select = React.memo(({ con, p, i, updateValue }) => {

	const updateItem = (e) => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: e.target.value,
			options: con.options
		})
	}

	return (
		<div className='item'>
			<h2>{con.name}</h2>
			<div className='acb-select'>
				<select onBlur={updateItem} defaultValue={con.value}>
					<option value=''>Choose</option>
					{con.options.map((opt, i) => {
						return <option value={opt}>{opt.charAt(0).toUpperCase() + opt.substr(1)}</option>
					})}
				</select>
			</div>
		</div>
	)
})

export default Select