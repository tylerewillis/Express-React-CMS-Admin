import React from 'react'

export default ({ active, setActive, search, setSearch }) => (
	<div className='search'>
		<div className='tabs'>
			<p className={(active === 'all') ? 'active' : ''} onClick={() => setActive('all')}>All Docs</p>
			<p className={(active === 'getting started') ? 'active' : ''} onClick={() => setActive('getting started')}>Getting Started</p>
			<p className={(active === 'usability') ? 'active' : ''} onClick={() => setActive('usability')}>Usability</p>
			<p className={(active === 'best practices') ? 'active' : ''} onClick={() => setActive('best practices')}>Best Practices</p>
			<p className={(active === 'design') ? 'active' : ''} onClick={() => setActive('design')}>Design</p>
		</div>
		<input placeholder='Search documentation' defaultValue={search} onChange={(e) => setSearch(e.target.value)} />
	</div>
)