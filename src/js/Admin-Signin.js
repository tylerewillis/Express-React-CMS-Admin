import React, { useState } from 'react'
import Layout from './_Components/Layout-Admin'
import SignInForm from './_Components/Admin-SigninForm'
import SignUpForm from './_Components/Admin-SignupForm'

const SignIn = React.memo(() => {

	const [ activeClass, setActiveClass ] = useState('signin')

	const changeType = () => {
		const temp = (activeClass === 'signin') ? 'signup' : 'signin'
		setActiveClass(temp)
	}

	return (
		<div className='admin-login-container'>
			<div className='alc-header'>
				<p className={activeClass === 'signin' ? 'alch-active' : ''} onClick={() => setActiveClass('signin')}>Sign In</p>
				<p className={activeClass === 'signup' ? 'alch-active' : ''} onClick={() => setActiveClass('signup')}>Sign Up</p>
			</div>
			<div className='alc-form-container'>
				{activeClass === 'signin'
				? <SignInForm />
				: <SignUpForm changeType={changeType} />}
			</div>
		</div>
	)
})

export default () => (
	<Layout>
		<SignIn />
	</Layout>
)