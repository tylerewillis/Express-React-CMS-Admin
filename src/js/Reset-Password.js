import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Submit from './_Components/_API/Submit'
import Loading from './_Components/Loading'

const ResetPassword = React.memo(({ step, message }) => {
	
	const [ url, setUrl ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const [ confMessage, setMessage ] = useState('')
	const [ password, setPassword ] = useState('')

	const resetLink = e => {
		e.preventDefault()
		setLoading(true);
		(async () => {
			const submit = await Submit(window.location.pathname + '/reset-link', { url, email })
			setTimeout(() => {
				setMessage(submit.message)
				setLoading(false)
			},1000)
		})()
	}

	const updatePassword = e => {
		e.preventDefault()
		setLoading(true);
		(async () => {
			const submit = await Submit(window.location.pathname, { password })
			setTimeout(() => {
				setMessage(submit.message)
				setLoading(false)
			},1000)
		})()
	}

	return (
		<div className='reset-password-container'>
			{step === 1 && !confMessage.length &&
				<React.Fragment>
					<h1>Enter Your Email</h1>
					<p>Reset your password by entering and submitting your email below. If there is a valid account linked to this email address, you'll receive an email with a reset link.</p>
					<form>
						<input type='url' style={{display: 'none'}} onChange={(e) => setUrl(e.target.value)}/>
						<input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
						<input type='submit' value='Get Reset Link' onClick={(e) => resetLink(e)} />
					</form>
				</React.Fragment>
			}
			{step === 1 && confMessage &&
				<React.Fragment>
					<h1>Enter Your Email</h1>
					<p>Reset your password by entering and submitting your email below. If there is a valid account linked to this email address, you'll receive an email with a reset link.</p>
					<p className='confirmation-message'>{confMessage}</p>
				</React.Fragment>
			}
			{step === 2 && !confMessage.length && 
				<React.Fragment>
					<h1>Enter New Password</h1>
					<p>Enter your new password in the input below and submit to update.</p>
					<form>
						<input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
						<input type='submit' value='Update' onClick={(e) => updatePassword(e)} />
					</form>
				</React.Fragment>
			}
			{step === 2 && confMessage &&
				<React.Fragment>
					<h1>Enter New Password</h1>
					<p>Enter your new password in the input below and submit to update.</p>
					<p className='confirmation-message' dangerouslySetInnerHTML={{ __html: confMessage }} />
				</React.Fragment>
			}
			{loading && <Loading />}
		</div>
	)
})

export default () => (
	<Layout>
		<ResetPassword />
	</Layout>
)