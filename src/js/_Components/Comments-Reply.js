import React, { useState } from 'react'
import Submit from './_API/Submit'

export default React.memo(({ replyTo, setReplyTo, setActive }) => {

	const [ submit, setSubmit ] = useState(false)
	const [ message, setMessage ] = useState('')
	const [ name, setName ] = useState('Admin')

	const handleSubmit = (e) => {
		e.preventDefault()
		setSubmit(true);
		(async () => {
			await Submit(window.location.pathname + '/reply', {
				parentId: replyTo.id,
				name,
				message
			})
			setTimeout(() => {
				setMessage('')
				setReplyTo('')
				setSubmit(false)
			},3000)
		})()
	}

	if (replyTo) {
		if (submit) {
			return <p>Your reply has been posted.</p>
		} else {
			return (
				<form onSubmit={handleSubmit} className='comments-reply'>
					<div className={(replyTo.admin) ? 'comment admin-comment' :'comment'}>
						<p>{replyTo.name}</p>
						<p>{replyTo.email}</p>
						<p>{replyTo.comment}</p>
					</div>
					<p className='reply-text'>Your reply:</p>
					<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Your message' />
					<input value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' />
					<input type='submit' value='Send Reply' />
				</form>
			)
		}
	} else {
		return <p className='comments-reply-empty'><span onClick={() => setActive('comments')}>Select a comment</span> to reply to.</p>
	}
})