import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Table = React.memo(({ con, p, i, updateValue, removeSection }) => {

	const [ newWidth, setNewWidth ] = useState('0')
	const [ newHeight, setNewHeight ] = useState('0')
	const tableRef = React.createRef()

	var timeout
	const updateTable = () => {
		clearTimeout(timeout)
		if (tableRef && tableRef.current) {
			timeout = setTimeout(() => {
				const retrieved = tableRef.current.innerHTML
				const temp = retrieved.replace('<tbody>', '')
				const temp2 = temp.replace('</tbody>', '')
				updateItem(temp2)
			}, 3000)
		}
	}

	const updateItem = (value) => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: value
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
			updateItem(newRows.join(''))
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
		<div className='item'>
			<h2>{con.name}</h2>
			<table dangerouslySetInnerHTML={{__html: con.value}} contentEditable='true' ref={tableRef} onKeyUp={updateTable} />
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













