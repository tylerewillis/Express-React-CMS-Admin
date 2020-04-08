import React from 'react'
import PropTypes from 'prop-types'

const Table = React.memo(({ con, handleChange, role, removeSection }) => {

	const tableRef = React.createRef()

	var timeout
	const updateValue = () => {
		clearTimeout(timeout)
		if (tableRef && tableRef.current) {
			timeout = setTimeout(() => {
				const retrieved = tableRef.current.innerHTML
				const temp = retrieved.replace('<tbody>', '')
				const temp2 = temp.replace('</tbody>', '')
				sendChange(temp2)
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

	return (
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<table dangerouslySetInnerHTML={{__html: con.content}} contentEditable='true' ref={tableRef} onKeyUp={updateValue} />
			{role === 'super' &&
				<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
			}
		</div>
	)
})

Table.propTypes = {
	con: PropTypes.object,
	handleChange: PropTypes.func
}

export default Table













