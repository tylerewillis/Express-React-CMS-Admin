import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PlainText = React.memo(({ content, addSection }) => {

	const [ title, setTitle ] = useState('')
	const [ desc, setDesc ] = useState('')
	const [ rows, setRows ] = useState('')
	const [ columns, setColumns ] = useState('')
	const [ select, setSelect ] = useState('')
	const [ list, setList ] = useState({ array:[] })

	const revealSubmit = () => {
		if (title.length && desc.length) {
			if (select.length && select !== 'table') return <p className='add-section-submit' onClick={add}>Add Section</p>
			else if (select.length && rows.length && columns.length) return <p className='add-section-submit' onClick={add}>Add Section</p>
			else if (select.length && list.array.length > 0) return <p className='add-section-submit' onClick={add}>Add Section</p>
			else return null
		} else {
			return null
		}
	}

	const add = () => {
		var content = ''
		if (select === 'table') {
			content += '<tr>'
			for (let j = 0; j < rows; j++) {
				for (let k = 0; k < columns; k++) {
					content += '<td></td>'
				}
				if (j !== rows - 1) { // dont add row break to last row
					content += '</tr><tr>'
				} else {
					content += '</tr>'
				}
			}
		} else if (select === 'blocks') {
			content = [[]]
			list.array.forEach(item => {
				content[0].push({
					type: item.type,
					name: item.name,
					value: ''
				})
			})
		}
		addSection({
			id: 0,
			type: select,
			name: title,
			description: desc,
			content
		})
		setList({ array:[] })
		setTitle('')
		setDesc('')
		setSelect('')
	}

	const addToList = type => {
		setList({ array: [ ...list.array, {type, name: ''} ]})
	}

	const removeFromList = i => {
		let temp = {
			array: []
		}
		list.array.forEach((item, j) => {
			if (j !== i) {
				temp.array.push(item)
			}
		})
		setList(temp)
	}

	const updateListName = (e,i) => {
		let temp = {
			array: []
		}
		list.array.forEach((item, j) => {
			if (j === i) {
				temp.array.push({
					type: item.type,
					name: e.target.value
				})
			} else {
				temp.array.push(item)
			}
		})
		setList(temp)
	}

	return (
		<div className='ac-block'>
			<h2>Add New Section</h2>
			<p className='acb-description'>Add a new section to the page.</p>
			<div className='acb-new-section'>
				<input type='text' value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
				<input type='text' value={desc} placeholder='Description' onChange={e => setDesc(e.target.value)} />
				<select value={select} onChange={e => setSelect(e.target.value)}>
					<option value=''>Select Type</option>
					<option value='text'>Text</option>
					<option value='plain-text'>Plain Text</option>
					<option value='image'>Image</option>
					<option value='images'>Multiple Images</option>
					<option value='dates'>Dates</option>
					<option value='table'>Table</option>
					<option value='form'>Form</option>
					<option value='blocks'>Blocks</option>
				</select>
				{select === 'table' &&
					<div>
						<input type='number' value={rows} placeholder='# Rows' onChange={e => setRows(e.target.value)} />
						<input type='number' value={columns} placeholder='# Columns' onChange={e => setColumns(e.target.value)} />
					</div>
				}
				{select === 'blocks' &&
					<div>
						<div className='list-selected'>
							{list.array.map((item, i) => {
								return (
									<div className='list-sel' key={i}>
										<p>{item.type}</p>
										<input type='text' defaultValue={item.name} onChange={(e) => updateListName(e,i)} placeholder='Name' />
										<i className="fas fa-times" onClick={() => removeFromList(i)}/>
									</div>
								)
							})}
						</div>
						<div className='list-options'>
							<p onClick={() => addToList('plain-text')}>Plain Text</p>
							<p onClick={() => addToList('text')}>Text</p>
							<p onClick={() => addToList('image')}>Image</p>
							<p onClick={() => addToList('images')}>Multiple Images</p>
							{/*<p onClick={() => addToList('dates')}>Dates</p>
							<p onClick={() => addToList('Table')}>Table</p>*/}
							<p onClick={() => addToList('form')}>Form</p>
						</div>
					</div>
				}
				<div>
					{revealSubmit()}
				</div>
			</div>
		</div>
	)
})

PlainText.propTypes = {
	content: PropTypes.array,
	handleChange: PropTypes.func
}

export default PlainText