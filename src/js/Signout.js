import React, { useState, useEffect } from 'react'
import Layout from './_Components/Layout'
import { useCookies } from 'react-cookie'

const SignOut = React.memo(() => {

	const [ seconds, setSeconds ] = useState(5)
	const [ cookies, setCookie, removeCookie ] = useCookies(['signedIn', 'role']) // eslint-disable-line

	useEffect(() => {
		setTimeout(() => {
			removeCookie('signedIn', { path: '/' })
			removeCookie('role', { path: '/' })
			removeCookie('name', { path: '/' })
			window.location.href = '/'
		}, 5000) // eslint-disable-next-line
	},[])

	useEffect(() => { // eslint-disable-line
		if (seconds > 0) {
	    setTimeout(() => setSeconds(seconds - 1), 1000);
	  } else {
	    setSeconds(0);
	  }
	})

	return (
		<div className='temporary-page'>
			<h1>{seconds}</h1>
			<p>Signing out ...</p>
			<img src='http://mrwgifs.com/wp-content/uploads/2013/06/Jim-Michael-Scott-Have-a-Moment-On-The-Office.gif' alt='goodbye' />
		</div>
	)
})

export default () => (
	<Layout>
		<SignOut />
	</Layout>
)