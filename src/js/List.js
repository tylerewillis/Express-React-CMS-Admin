import React from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'

const List = React.memo(({ posts }) => {

	const pathArray = window.location.pathname.split('/')
	const path = pathArray[pathArray.length - 1]

	return (
		<div className='admin-content-listing'>
			<div className='acl-header'>
				<a href={window.location.pathname + '/new'} className='new-post'>Create New</a>
			</div>
			{posts.map((post, index) => {
				return <a key={index} className='atb-single' href={window.location.pathname + '/' + post.ID}>
					<h2>{decodeURIComponent(post.name)}</h2>
					{/*isDynamic &&
						<a href={window.location.pathname + '/delete/' + post.ID}>Delete</a>
					*/}
					{post.pub_date && 
						<p>(Last updated {post.pub_date})</p>
					}
				</a>
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