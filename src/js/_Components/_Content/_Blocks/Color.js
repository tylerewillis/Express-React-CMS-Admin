import React from 'react'

const Color = React.memo(({ con, p, i, updateValue }) => {

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
			<div className='acb-color'>
				<input type='color' onChange={updateItem} defaultValue={con.content} />
			</div>
		</div>
	)
})

export default Color