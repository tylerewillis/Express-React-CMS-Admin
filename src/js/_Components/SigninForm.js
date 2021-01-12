import React, { useState } from 'react'
import Input from './_FormElements/Input'
import Submit from './_API/Submit'
import { useCookies } from 'react-cookie'
import Loading from './Loading'

const SignIn = () => {

	const [ cookies, setCookie ] = useCookies(['signedIn', 'role']) // eslint-disable-line
	const [ signInError, setSignInError ] = useState(false)

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ ip, setIp ] = useState('')
	const [ loading, setLoading ] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		(async function() {
			const submit = await Submit('/signin', {
				email, password, ip
			})
			if (submit.success) {
				setCookie('signedIn', true, { path: '/'})
				setCookie('role', submit.role, { path: '/'})
				setCookie('name', submit.name, { path: '/'})
				window.location.replace('/')
			} else {
				setSignInError(true)
				setLoading(false)
			}
		})()
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			{signInError
			? <p className='wrong-password'>There was an error with your credentials. Do you want to
					<a href='/reset-password'> reset your password</a>?
				</p>
			: null}
			<div style={{display: 'none'}}>
				<Input type='text' name='ip' inputName='ip' updateValue={(value) => setIp(value)} />
			</div>
			<Input type='email' name='Email Address' inputName='email_address' required={true} updateValue={(e) => setEmail(e.target.value)} />
			<Input type='password' name='Password' inputName='password' required={true} updateValue={(e) => setPassword(e.target.value)} />
			<div className='buttons'>
				<input type='submit' value='Sign In' />
				<a href='/password-reset'>Forgot Password</a>
			</div>
			{loading && <Loading />}
		</form>
	)
}

export default SignIn