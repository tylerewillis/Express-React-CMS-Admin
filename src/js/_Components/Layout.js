import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Helmet } from "react-helmet"
import { useCookies } from 'react-cookie'
import Head from './Head'
import Header from './Header'
import Footer from './Footer'
import { API_PATH } from './_Config'
import Loading from './Loading'

const Admin = React.memo((props) => {

	const [ page, setPage ] = useState(null)
	const [ cookies, setCookie ] = useCookies(['signedIn','darkMode']) // eslint-disable-line
	const [ darkMode, setDarkMode ] = useState(cookies.darkMode)

	useEffect(() => {
		(async function() {
			const path = window.location.pathname === '/' ? '/' : window.location.pathname
			try {
				const res = await fetch(API_PATH + path)
				const json = await res.json()
		  	setPage(json)
			} catch(e) {
				setTimeout(() => {
					window.location.reload()
				},2000)
			}
		})()
	},[])

	if (page) {
		if (!cookies.signedIn) {
			if (window.location.pathname !== '/signin' && window.location.pathname.substring(0,15) !== '/password-reset') {
				window.location.replace('/signin')
			} else {
				return (
					<div className={(cookies.darkMode && cookies.darkMode === 'yes') ? 'page page-admin page-admin-dark-mode' : 'page page-admin'}>
						<Helmet>
			        <meta charSet="utf-8" />
			        <title>{decodeURIComponent(page.title)}</title>
			        <meta name='description' content=''/>
			        <meta property='og:locale' content='en_US' />
			        <meta property='og:type' content='website' />
			        <meta property='og:title' content={page.title} />
			        <meta property='og:description' content='' />
			        <meta property='og:image' content={''} />
			      </Helmet>
			      <Head />
			      <Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} />
			      <div className='page-admin-main'>
							{React.cloneElement(props.children, {...page})}
						</div>
						<Footer page={page} />
					</div>
				)
			}
		} else {
			return (
				<div className={(cookies.darkMode && cookies.darkMode === 'yes') ? 'page page-admin page-admin-dark-mode' : 'page page-admin'}>
					<Helmet>
		        <meta charSet="utf-8" />
		        <title>{decodeURIComponent(page.title)}</title>
		        <meta name='description' content=''/>
		        <meta property='og:locale' content='en_US' />
		        <meta property='og:type' content='website' />
		        <meta property='og:title' content={page.title} />
		        <meta property='og:description' content='' />
		        <meta property='og:image' content={''} />
		      </Helmet>
		      <Head />
	      	<Header page={page} darkMode={darkMode} setDarkMode={setDarkMode} />
			    <div className='page-admin-main'>
						{React.cloneElement(props.children, {...page})}
					</div>
					<Footer />
				</div>
			)
		}
	} else {
		return <Loading darkMode={darkMode} />
	}
})

Admin.propTypes = {
	children: PropTypes.element
}

export default Admin