import React from 'react'
import PropTypes from 'prop-types'

const Table = React.memo(({ con, p, i, updateValue, removeSection }) => {

	const updateCell = (row, column, e) => {
		con.value[row].cells[column] = e.target.value
		updateItem(con.value)
	}

	const updateItem = (value) => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: value
		})
	}

	const largestId = () => {
		var largest = 0
		con.value.forEach(row => {
			if (row.id > largest) largest = row.id
		})
		return largest + 1
	}

	const loadEmptyCells = () => {
		var columns = con.value[0].cells.length
		var array = []
		for (var i = 0; i < columns; i++) {
			array.push('')
		}
		return array
	}

	const addRow = prev => {
		let newRow = { id: largestId(), cells: loadEmptyCells() }
		con.value.splice(prev, 0, newRow)
		updateItem(con.value)
	}

	const removeRow = prev => {
		if (con.value.length > 1) {
			con.value.splice(prev, 1)
			updateItem(con.value)
		} else window.alert('Sorry, you need to include at least one cell in your table.')
	}

	const addColumn = prev => {
		if (con.value[0].cells.length < 10) {
			con.value.forEach(row => {
				row.cells.splice(prev, 0, '')
			})
			updateItem(con.value)
		} else window.alert('Sorry, you can only have 10 columns in your table.')
	}

	const removeColumn = prev => {
		if (con.value[0].cells.length > 1) {
			con.value.forEach(row => {
				row.cells.splice(prev, 1)
			})
			updateItem(con.value)
		} else window.alert('Sorry, you need to include at least one cell in your table.')
	}

	return (
		<div className='item'>
			<h2>{con.name}</h2>
			<div className='table'>
				{typeof(con.value) === 'object' && con.value.map((row, j) => {
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
						{(j === con.value.length - 1) &&
							<div className='add-row add-row-bottom' onClick={() => addRow(j + 1)}>
								<i className="fas fa-plus"></i>
								<hr />
							</div>
						}
					</div>
				})}
			</div>
		</div>
	)
})

Table.propTypes = {
	con: PropTypes.object,
	handleChange: PropTypes.func
}

export default Table













