import React, { useState, useEffect } from 'react'
import Layout from './_Components/Layout'
import Search from './_Components/_Documentation/Search'
import Posts from './_Components/_Documentation/Posts'

const Resources = React.memo(({ posts, keyword }) => {

	const [ active, setActive ] = useState('all')
	const [ search, setSearch ] = useState(keyword)

	useEffect(() => {
		const queryString = window.location.search
		if (queryString) {
			const params = new URLSearchParams(queryString)
			setActive(params.get('t') || 'all')
			setSearch(params.get('s') || '')
		}
	},[])

	return (
		<div className='admin-vert-list admin-documentation'>
			<Search active={active} setActive={setActive} search={search} setSearch={setSearch} />
			<Posts active={active} search={search} posts={posts} />
		</div>
	)
})

export default () => (
	<Layout>
		<Resources />
	</Layout>
)