import React, { useState, useEffect } from 'react'

const Results = React.memo(({ search, results }) => {

	const [ list, setList ] = useState([])

	useEffect(() => {
		var temp = []
		results.forEach(res => {
			try {
				let decoded = decodeURIComponent(JSON.stringify(res)) //eslint-disable-line
				temp.push(res)
			} catch(e) { console.error(e) }
		})
		setList(temp)
	},[]) //eslint-disable-line

	if (search) {
		return (
			<div className='results'>
				{list.map((res, i) => {
					if (decodeURIComponent(JSON.stringify(res)).toLowerCase().includes(search) || decodeURIComponent(JSON.stringify(res)).replace(/-/g, ' ').toLowerCase().includes(search)) {
						return <a key={i} className='res' href={res.url}>
							<h2>{res.name}</h2>
						</a>
					} else return false
				})}
			</div>
		)
	}
})

export default Results