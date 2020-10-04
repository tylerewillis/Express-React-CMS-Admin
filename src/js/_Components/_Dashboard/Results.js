import React from 'react'

const Results = React.memo(({ search, results }) => {
	
	if (search) {
		return (
			<div className='results'>
				{results.map((res, i) => {
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