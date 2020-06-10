import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Table = React.memo(({ con, handleChange, removeSection }) => {

	const [ newWidth, setNewWidth ] = useState('0')
	const [ newHeight, setNewHeight ] = useState('0')
	const tableRef = React.createRef()

	var timeout
	const updateValue = () => {
		clearTimeout(timeout)
		if (tableRef && tableRef.current) {
			timeout = setTimeout(() => {
				if (tableRef.current) {
					const retrieved = tableRef.current.innerHTML
					const temp = retrieved.replace('<tbody>', '')
					const temp2 = temp.replace('</tbody>', '')
					sendChange(temp2)
				}
			}, 3000)
		}
	}

	const sendChange = (value) => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: value
		})
	}

	const resizeTable = () => {
		if (window.confirm('Are you sure that you want to resize this table? If smaller than the current table, all content outside of the new bounds will be removed.')) {
			const retrieved = tableRef.current.innerHTML
			const temp = retrieved.replace('<tbody>', '')
			const temp2 = temp.replace('</tbody>', '')
			const temp3 = temp2.replace(/<tr><td>/g, '<tr>')
			const temp4 = temp3.replace(/<\/td><\/tr>/g, '</tr>')
			const rows = temp4.split('</tr><tr>')
			const cells = rows[0].split('</td><td>') // eslint-disable-line
			var newRows = []
			rows.forEach((row, i) => {
				if (i < newHeight) {
					let newRow = '<tr>'
					let cells = row.split('</td><td>')
					for (let j = 0; j < newWidth; j++) {
						if (cells[j]) {
							console.log(cells[j])
							let clean = cells[j].replace('<tr>', '')
							let clean2 = clean.replace('</tr>', '')
							console.log(clean2)
							newRow += '<td>' + clean2 + '</td>'
						} else {
							newRow += '<td></td>'
						}
					}
					newRows.push(newRow + '</tr>')
				}
			})
			// If less, add more
			if (rows.length < newHeight) {
				for (let i = rows.length; i < newHeight; i++) {
					let newRow = '<tr>'
					for (let j = 0; j < newWidth; j++) {
						newRow += '<td></td>'
					}
					newRows.push(newRow + '</tr>')
				}
			}
			sendChange(newRows.join(''))
		}
	}

	useEffect(() => {
		const retrieved = tableRef.current.innerHTML
		const temp = retrieved.replace('<tbody>', '')
		const temp2 = temp.replace('</tbody>', '')
		const temp3 = temp2.replace(/<tr><td>/g, '<tr>')
		const temp4 = temp3.replace(/<\/td><\/tr>/g, '</tr>')
		const rows = temp4.split('</tr><tr>')
		const cells = rows[0].split('</td><td>')
		setNewWidth(cells.length)
		setNewHeight(rows.length)
	},[]) // eslint-disable-line

	return (
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<table dangerouslySetInnerHTML={{__html: con.content}} contentEditable='true' ref={tableRef} onKeyUp={updateValue} />
			<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
			<div className='table-resize'>
				<input type='text' value={newWidth} placeholder='Width' onChange={(e) => setNewWidth(e.target.value)} />
				<span>X</span>
				<input type='text' value={newHeight} placeholder='Height' onChange={(e) => setNewHeight(e.target.value)} />
				<p onClick={resizeTable}>Resize Table</p>
			</div>
		</div>
	)
})

Table.propTypes = {
	con: PropTypes.object,
	handleChange: PropTypes.func
}

export default Table













