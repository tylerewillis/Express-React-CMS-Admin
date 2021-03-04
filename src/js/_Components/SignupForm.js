import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Input from './_FormElements/Input'
import Submit from './_API/Submit'
import Loading from './Loading'

const SignUp = (props) => {

	const [ submitted, setSubmitted ] = useState(false)
	const [ signUpError, setSignUpError ] = useState(false)

	const [ first, setFirst ] = useState('')
	const [ last, setLast ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ ip, setIp ] = useState('')
	const [ url, setUrl ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const [ hideForm, setHideForm ] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		(async function() {
			const submit = await Submit('/signup', {
				first, last, email, password, ip, url
			})
			setTimeout(() => {
				setSubmitted(true)
				if (submit.success) {
					setLoading(false)
					setHideForm(true)
				} else {
					setSignUpError(true)
					setLoading(false)
				}
			},1000)
		})()
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			{submitted && signUpError &&
				<p className='wrong-password'>Your email is already linked to an account. Do you want to
					<span onClick={props.changeType}> sign in</span>?
				</p>
			}
			{submitted && !signUpError &&
				<p>Thanks, {first}. We'll review your credentials and you will receive an email once your account has been approved.</p>
			}
			<div style={{display: 'none'}}>
				<Input type='text' name='ip' inputName='ip' updateValue={(value) => setIp(value)} />
				<Input type='url' name='url' inputName='url' updateValue={(e) => setUrl(e.target.value)} />
			</div>
			{!hideForm &&
				<React.Fragment>
					<div className='input-double'>
						<Input type='text' name='First Name' inputName='first' required={true} updateValue={(e) => setFirst(e.target.value)} />
						<Input type='text' name='Last Name' inputName='last' required={true} updateValue={(e) => setLast(e.target.value)} />
					</div>
					<Input type='email' name='Email Address' inputName='email_address' required={true} updateValue={(e) => setEmail(e.target.value)} />
					<Input type='password' name='Password' inputName='password' required={true} updateValue={(e) => setPassword(e.target.value)} />
					<input type='submit' value='Sign Up' />
				</React.Fragment>
			}
			{loading && <Loading />}
		</form>
	)
}

SignUp.propTypes = {
	changeType: PropTypes.func
}

export default SignUp