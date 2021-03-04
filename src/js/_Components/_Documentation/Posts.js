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
								<p className='number'>{count}.</p>
								<div className='body'>
									<h2>{post.title}</h2>
									<div dangerouslySetInnerHTML={{ __html: post.html }} />
								</div>
							</div>
						} else return null
					} else return null
				} else return null
			})}
			{count === 0 &&
				<div className='no-results'>
					<img src='https://media1.giphy.com/media/dy4swYs1dp430jChRa/source.gif' alt='empty room' />
					<p>Sorry, we can't find anything in the documentation for those filters. If you need support, please click on the "Support" link at the top of this page.</p>
				</div>
			}
		</div>
	)
}