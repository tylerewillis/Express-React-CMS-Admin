import React, { useState } from 'react'
import Submit from './_API/Submit'

export default React.memo(({ posts }) => {

	const [ submit, setSubmit ] = useState(false)
	const [ message, setMessage ] = useState('')
	const [ name, setName ] = useState('Elaine')
	const [ post, setPost ] = useState(posts[posts.length - 1])

	const handleSubmit = (e) => {
		e.preventDefault()
		setSubmit(true);
		(async () => {
			await Submit(window.location.pathname + '/new', {
				parentId: 'post-' + posts.indexOf(post),
				name,
				message
			})
			setTimeout(() => {
				setMessage('')
				setPost(posts[posts.length - 1])
				setSubmit(false)
			},3000)
		})()
	}

	if (submit) {
		return <p>Your comment has been posted.</p>
	} else {
		return (
			<form onSubmit={handleSubmit} className='comments-new'>
				<select value={post} onChange={(e) => setPost(e.target.value)}>
					{posts.map((post, i) => {
						if (post) return <option value={post} key={i}>{post}</option>
						else return null
					})}
				</select>
				<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Your comment' />
				<input value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' />
				<input type='submit' value='Submit Comment' />
			</form>
		)
	}
})