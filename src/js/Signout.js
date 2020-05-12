import React, { useEffect } from 'react'
import Layout from './_Components/Layout'
import { useCookies } from 'react-cookie'

const SignOut = React.memo(() => {

	const [ cookies, setCookie, removeCookie ] = useCookies(['signedIn', 'role']) // eslint-disable-line

	useEffect(() => {
		setTimeout(() => {
			removeCookie('signedIn', { path: '/' })
			removeCookie('role', { path: '/' })
			window.location.href = '/'
		}, 2000) // eslint-disable-next-line
	},[])

	return (
		<div className='admin-login-container'>
			<div className='alc-form-container'>
				<p className='alc-sign-out'>Signing out ...</p>
			</div>
		</div>
	)
})

export default () => (
	<Layout>
		<SignOut />
	</Layout>
)