import React, { useState } from 'react'
import Submit from './_API/Submit'

export default React.memo(({ posts, adminName }) => {

	const [ submit, setSubmit ] = useState(false)
	const [ message, setMessage ] = useState('')
	const [ name, setName ] = useState(adminName)
	const [ post, setPost ] = useState(posts[0])

	const handleSubmit = (e) => {
		e.preventDefault()
		setSubmit(true);
		(async () => {
			await Submit(window.location.pathname + '/new', {
				parentId: post.id,
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

	const updatePost = (e) => {
		var temp
		posts.forEach(po => {
			console.log(po)
			if (po.id === e.target.value) temp = po
		})
		setPost(temp)
	}

	if (submit) {
		return <p>Your comment has been posted.</p>
	} else if (posts.length) {
		return (
			<form onSubmit={handleSubmit} className='comments-new'>
				<select value={post.id} onChange={(e) => updatePost(e)}>
					{posts.map((post, i) => {
						if (post) return <option value={post.id} key={i}>{post.name}</option>
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