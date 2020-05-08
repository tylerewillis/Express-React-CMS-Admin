import React from 'react'

export default React.memo(({ categories, sendChange }) => {

	const handleChange = (e) => {
		sendChange({
			categories: e.target.value
		})
	}

	return (
		<div className='block'>
			<div className='section'>
				<h4>List of categories</h4>
				<p className='desc'>List your product categories in order of priority separated by commas.</p>
				<input type='text' defaultValue={categories} onChange={handleChange} />
			</div>
		</div>
	)
})