import React from 'react'

export default ({ active, search, posts }) => {
	
	var count = 0

	return (
		<div className='posts'>
			{posts.map((post, i) => {
				if (post.type.length) { // present
					if (!search || (search && JSON.stringify(post).toLowerCase().includes(search.toLowerCase()))) { // search
						if (active === 'all' || active === post.type) {
							count++
							return <div className='post'>
								<h2><span>{count}.</span>{post.title}</h2>
								<div dangerouslySetInnerHTML={{ __html: post.html }} />
							</div>
						} else return null
					} else return null
				} else return null
			})}
		</div>
	)
}