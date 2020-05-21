import React, { useState } from 'react'
import Layout from './_Components/Layout'
import List from './_Components/Comments-List'
import Reply from './_Components/Comments-Reply'
import New from './_Components/Comments-New'

const Comments = React.memo(({ posts, comments, adminName }) => {

	const [ active, setActive ] = useState('comments')
	const [ replyTo, setReplyTo ] = useState('')

	const toggle = (tab) => {
		setActive(tab)
	}

	return (
		<div className='admin-vert-list'>
			<div className='avl-tabs'>
				<p className={(active === 'comments') ? 'avct-active' : ''} onClick={() => toggle('comments')}>Comments</p>
				<p className={(active === 'replyComment') ? 'avct-active' : ''} onClick={() => toggle('replyComment')}>Reply</p>
				<p className={(active === 'newComment') ? 'avct-active' : ''} onClick={() => toggle('newComment')}>New Comment</p>
			</div>
			<div className={(active === 'comments') ? 'avl-post avlp-active' : 'avl-post'}>
				<h3>Comments</h3>
				<List comments={comments} setReplyTo={setReplyTo} setActive={setActive} posts={posts} />
			</div>
			<div className={(active === 'replyComment') ? 'avl-post avlp-active' : 'avl-post'}>
				<h3>Reply</h3>
				<Reply replyTo={replyTo} setReplyTo={setReplyTo} setActive={setActive} adminName={adminName} />
			</div>
			<div className={(active === 'newComment') ? 'avl-post avlp-active' : 'avl-post'}>
				<h3>New Comment</h3>
				<New posts={posts} adminName={adminName} />
			</div>
		</div>
	)
})

export default () => (
	<Layout>
		<Comments />
	</Layout>
)