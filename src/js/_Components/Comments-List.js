import React , { useState} from 'react'
import Submit from './_API/Submit'

export default ({ posts, comments, setReplyTo, setActive }) => {

	const [ post, setPost ] = useState('all')

	const replyCom = (obj) => {
		setReplyTo(obj)
		setActive('replyComment')
	}

	const deleteCom = (id, element) => {
		if (window.confirm('Are you sure that you want to delete this comment? This cannot be undone.')) {
			(async () => {
				await Submit(window.location.pathname + '/delete', {id})
				element.closest('.comment').classList.add('comment-fade-out')
			})()
		}
	}

	if (comments.length) {
		return (
			<div className='comments-list'>
				<div className='comments-list-filter'>
					<select value={post} onChange={(e) => setPost(e.target.value)}>
						<option value='all'>All Posts</option>
						{posts.map((post, i) => {
							if (post && post.id) return <option value={post.id} key={i}>{post.name}</option>
							else return null
						})}
					</select>
				</div>
				{comments.map((com, i) => {
					if (post === 'all' || post === com.parent_id) {
						return (
							<div className={(com.admin) ? 'comment admin-comment' :'comment'} key={i} data-parent={com.parent_id}>
								<p>{com.name}</p>
								<p>{com.email}</p>
								<p>{com.comment}</p>
								<p onClick={() => replyCom(com)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"/></svg></p>
								<p onClick={(e) => deleteCom(com.id, e.target)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg></p>
								{com.subs.map((sub, i) => {
									if (sub) {
										return (
											<div className={(sub.admin) ? 'comment admin-comment sub-comment' :'comment sub-comment'}>
												<p>{sub.name}</p>
												<p>{sub.email}</p>
												<p>{sub.comment}</p>
												<p onClick={(e) => deleteCom(sub.id, e.target)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg></p>
											</div>
										)
									}
								})}
							</div>
						)
					} else return null
				})}
			</div>
		)
	} else {
		return <p>{comments} You have no comments to display.</p>
	}
}