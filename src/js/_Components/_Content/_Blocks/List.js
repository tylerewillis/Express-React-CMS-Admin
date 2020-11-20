import React, { useState } from 'react'

const List = React.memo(({ con, p, i, updateValue }) => {

	const [ items, setItems ] = useState((con.value.length) ? con.value.split(',') : [])
	const [ tempValue, setTempValue ] = useState(false)

	const updateItem = (value) => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: value
		})
	}

	const addItem = e => {
		if (e.key === 'Enter') {
			let temp = items
			temp.push(e.target.value.trim())
			setItems(temp)
			updateItem(temp.join(','))
			// Reset
			e.target.value = ''
			setTempValue(false)
		} else {
			setTempValue(true)
		}
	}

	const removeItem = item => {
		let temp = items
		let index = temp.indexOf(item)
		temp.splice(index,1)
		setItems(temp)
		updateItem(temp.join(','))
	}

	return (
		<div className='item'>
			<h2>{con.name}</h2>
			<input onKeyUp={(e) => addItem(e)} />
			{tempValue &&
				<p className='list-temp-value'>Don't forget to add by pressing Enter.</p>
			}
			<div className='list'>
				{items.map((item, i) => {
					return <p key={i}>{item.trim()}
						<i className="fas fa-times" onClick={() => removeItem(item)}></i>
					</p>
				})}
			</div>
		</div>
	)
})

export default List