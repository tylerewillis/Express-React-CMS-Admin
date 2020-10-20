import React from 'react'
import { useCookies } from 'react-cookie'

const Table = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])

	const updateCell = (row, column, e) => {
		con.content[row].cells[column] = e.target.value
		sendChange(con.content)
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

	const largestId = () => {
		var largest = 0
		con.content.forEach(row => {
			if (row.id > largest) largest = row.id
		})
		return largest + 1
	}

	const loadEmptyCells = () => {
		var columns = con.content[0].cells.length
		var array = []
		for (var i = 0; i < columns; i++) {
			array.push('')
		}
		return array
	}

	const addRow = prev => {
		let newRow = { id: largestId(), cells: loadEmptyCells() }
		con.content.splice(prev, 0, newRow)
		sendChange(con.content)
	}

	const removeRow = prev => {
		if (con.content.length > 1) {
			con.content.splice(prev, 1)
			sendChange(con.content)
		} else window.alert('Sorry, you need to include at least one cell in your table.')
	}

	const addColumn = prev => {
		if (con.content[0].cells.length < 10) {
			con.content.forEach(row => {
				row.cells.splice(prev, 0, '')
			})
			sendChange(con.content)
		} else window.alert('Sorry, you can only have 10 columns in your table.')
	}

	const removeColumn = prev => {
		if (con.content[0].cells.length > 1) {
			con.content.forEach(row => {
				row.cells.splice(prev, 1)
			})
			sendChange(con.content)
		} else window.alert('Sorry, you need to include at least one cell in your table.')
	}

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='table'>
				{con.content.map((row, j) => {
					return <div className='row' key={row.id}>
						{row.cells.map((cell, i) => {
							return <div className='column' key={i}>
									<textarea key={cell + i} defaultValue={cell} onBlur={(e) => updateCell(j, i, e)} />
									{(j === 0) &&
										<React.Fragment>
											<div className='add-column' onClick={() => addColumn(i)}>
												<i className="fas fa-plus"></i>
												<div />
											</div>
											<div className='remove-column' onClick={() => removeColumn(i)}>
												<i className="fas fa-minus"></i>
											</div>
											<div className='add-column add-column-last' onClick={() => addColumn(i + 1)}>
												<i className="fas fa-plus"></i>
												<div />
											</div>
										</React.Fragment>
									}
								</div>
						})}
						<div className='add-row' onClick={() => addRow(j)}>
							<i className="fas fa-plus"></i>
							<hr />
						</div>
						<div className='remove-row' onClick={() => removeRow(j)}>
							<i className="fas fa-minus"></i>
						</div>
						{(j === con.content.length - 1) &&
							<div className='add-row add-row-bottom' onClick={() => addRow(j + 1)}>
								<i className="fas fa-plus"></i>
								<hr />
							</div>
						}
					</div>
				})}
			</div>
			<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Table













