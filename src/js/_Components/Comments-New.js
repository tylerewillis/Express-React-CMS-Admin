import React, { useState, useEffect } from 'react'
import Submit from './_API/Submit'

export default React.memo(({ posts, adminName }) => {

	const [ submit, setSubmit ] = useState(false)
	const [ message, setMessage ] = useState('')
	const [ name, setName ] = useState(adminName)
	const [ post, setPost ] = useState(false)

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
		var temp = e.target.value.split('^&^')
		setPost({ id: temp[0], name: temp[1] })
	}

	useEffect(() => {
		posts.forEach((item, i) => {
			if (item) setPost({ id: i, name: item })
		})
	},[]) // eslint-disable-line

	if (submit) {
		return <p>Your comment has been posted.</p>
	} else if (posts.length) {
		return (
			<form onSubmit={handleSubmit} className='comments-new'>
				<select defaultValue={post.name} onChange={(e) => updatePost(e)} data-id={post.name}>
					{posts.map((item, i) => {
						if (item) return <option value={i + '^&^' + item} key={i}>{item}</option>
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