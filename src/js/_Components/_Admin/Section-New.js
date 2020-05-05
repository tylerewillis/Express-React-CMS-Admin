import React, { useState } from 'react'
import PropTypes from 'prop-types'

const PlainText = React.memo(({ content, addSection }) => {

	const [ title, setTitle ] = useState('')
	const [ desc, setDesc ] = useState('')
	const [ rows, setRows ] = useState('')
	const [ columns, setColumns ] = useState('')
	const [ select, setSelect ] = useState('')

	const revealSubmit = () => {
		if (title.length && desc.length) {
			if (select.length && select !== 'table') return <p className='add-section-submit' onClick={add}>Add Section</p>
			else if (select.length && rows.length && columns.length) return <p className='add-section-submit' onClick={add}>Add Section</p>
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
		}
		addSection({
			id: 0,
			type: select,
			name: title,
			description: desc,
			content
		})
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
				</select>
				{select === 'table' &&
					<div>
						<input type='number' value={rows} placeholder='# Rows (if table)' onChange={e => setRows(e.target.value)} />
						<input type='number' value={columns} placeholder='# Columns (if table)' onChange={e => setColumns(e.target.value)} />
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