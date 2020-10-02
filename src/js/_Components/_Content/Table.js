import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const Table = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])

	const [ newWidth, setNewWidth ] = useState('0')
	const [ newHeight, setNewHeight ] = useState('0')
	const tableRef = React.createRef()
	const [ value, setValue ] = useState(con.content)
	const [ cursorPosition, setCursorPosition ] = useState(0)

	const updateValue = (test) => {
		const retrieved = document.querySelector(`.table-${con.id}`)
		retrieved.querySelectorAll('td').forEach(cell => {
			cell.innerHTML = cell.querySelector('textarea').value
		})
		const temp = retrieved.innerHTML.replace('<tbody>', '')
		const temp2 = temp.replace('</tbody>', '')
		sendChange(temp2)
		setValue(temp2)
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

	//----------------------------------------
	// Set column height/width
	//----------------------------------------

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

	//----------------------------------------
	// Make editable
	//----------------------------------------

	useEffect(() => {
		tableRef.current.querySelectorAll('td').forEach((cell, i) => {
			let text = document.createElement('textarea')
			text.value = cell.innerHTML

			text.addEventListener('change', e => {
				updateValue()
				setCursorPosition(i)
			})
			cell.innerHTML = ''
			cell.appendChild(text)
		})
	},[value]) // eslint-disable-line

	//----------------------------------------
	// Move cursor into field
	//----------------------------------------

	useEffect(() => {
		tableRef.current.querySelectorAll('td').forEach((cell, i) => {
			if (i === cursorPosition) cell.querySelector('textarea').focus()
		})
	},[cursorPosition]) // eslint-disable-line

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<table dangerouslySetInnerHTML={{__html: value}} ref={tableRef} className={`table-${con.id}`} />
			<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
			<div className='table-resize'>
				<input type='text' value={newWidth} placeholder='Width' onChange={(e) => setNewWidth(e.target.value)} />
				<span>X</span>
				<input type='text' value={newHeight} placeholder='Height' onChange={(e) => setNewHeight(e.target.value)} />
				<p onClick={resizeTable}>Resize Table</p>
			</div>
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Table













