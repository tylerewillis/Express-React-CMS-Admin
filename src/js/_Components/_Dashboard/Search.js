import React, { useState } from 'react'

const Search = React.memo(({ search, setSearch, types }) => {
	
	const [ type, setType ] = useState('')

	return (
		<div className='search-filter'>
			<input onChange={(e) => setSearch(e.target.value.toLowerCase())} value={search} placeholder='Search all content' />
			<div className='select'>
				<select className={(type) ? 'active' : ''} onChange={(e) => setType(e.target.value)}>
					<option value=''>Content Type</option>
					{types.map((type, i) => {
						return <option key={i} value={type.type}>{type.single.charAt(0).toUpperCase() + type.single.substring(1).replace(/-/g,/ /)}</option>
					})}
				</select>
				<a href={(type) ? '/' + type + '/new' : ''} className={(type) ? 'active' : ''} >Create New</a>
			</div>
		</div>
	)
})

export default Search