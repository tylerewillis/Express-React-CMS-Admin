import React from 'react'

const PlainText = React.memo(({ con, p, i, updateValue }) => {

	const updateItem = (e) => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: e.target.value
		})
	}

	return (
		<div className='item'>
			<h2>{con.name}</h2>
			<input defaultValue={con.value} onBlur={updateItem} />
		</div>
	)
})

export default PlainText