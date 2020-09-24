import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'

const List = React.memo(({ posts }) => {

	const pathArray = window.location.pathname.split('/')
	const path = pathArray[pathArray.length - 1]
	const [ search, setSearch ] = useState(false)

	return (
		<div className='admin-content-listing'>
			<div className='acl-header'>
				<a href={window.location.pathname + '/new'} className='new-post'>Create New</a>
				<input value={(search) ? search : ''} placeholder='Search' onChange={(e) => setSearch(e.target.value.toLowerCase())} />
			</div>
			{posts.map((post, index) => {
				if (!search || (search && (decodeURIComponent(JSON.stringify(post)).toLowerCase().includes(search) || decodeURIComponent(JSON.stringify(post)).replace(/-/g, ' ').toLowerCase().includes(search)))) {
					return <a key={index} className='atb-single' href={window.location.pathname + '/' + post.ID}>
						<h2>{(window.location.pathname === '/meta') ? 'URL: /' + decodeURIComponent(post.url) : decodeURIComponent(post.name).replace(/(<([^>]+)>)/gi, "")}</h2>
						{post.pub_date && 
							<p>(Published {post.pub_date})</p>
						}
					</a>
				} else return false
			})}
			{posts.length === 0 &&
				<p className='no-posts'>You haven't created any {(path === 'blog' || path === 'news') ? 'posts' : path} yet. Click "Create New" above to get started.</p>
			}
		</div>
	)
})

List.propTypes = {
	posts: PropTypes.array,
	newPost: PropTypes.bool,
	deletePost: PropTypes.bool
}

export default () => (
	<Layout>
		<List />
	</Layout>
)