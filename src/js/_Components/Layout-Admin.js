import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Helmet } from "react-helmet"
import { useCookies } from 'react-cookie'
import Head from './Head'
import { API_PATH } from './_Config'

const Admin = React.memo((props) => {

	const [ page, setPage ] = useState(null)
	const [ cookies, setCookie ] = useCookies(['signedIn']) // eslint-disable-line

	useEffect(() => {
		(async function() {
			const path = window.location.pathname === '/' ? '/' : window.location.pathname
			const res = await fetch(API_PATH + path)
		  const json = await res.json()

		  setPage(json)
		})()
	},[])

	if (page) {
		if (!cookies.signedIn) {
			if (window.location.pathname !== '/admin/signin') {
				window.location.replace('/admin/signin')
			} else {
				return (
					<div className='page page-admin'>
						<Helmet>
			        <meta charSet="utf-8" />
			        <title>{page.title}</title>
			        <meta name='description' content=''/>
			        <meta property='og:locale' content='en_US' />
			        <meta property='og:type' content='website' />
			        <meta property='og:title' content={page.title} />
			        <meta property='og:description' content='' />
			        <meta property='og:image' content={''} />
			      </Helmet>
			      <Head />
			      <div className='pa-container'>
			      	<p className='breadcrumbs' dangerouslySetInnerHTML={{ __html: page.breadcrumbs }} />
							{React.cloneElement(props.children, {...page})}
						</div>
					</div>
				)
			}
		} else {
			return (
				<div className='page page-admin'>
					<Helmet>
		        <meta charSet="utf-8" />
		        <title>{page.title}</title>
		        <meta name='description' content=''/>
		        <meta property='og:locale' content='en_US' />
		        <meta property='og:type' content='website' />
		        <meta property='og:title' content={page.title} />
		        <meta property='og:description' content='' />
		        <meta property='og:image' content={''} />
		      </Helmet>
		      <Head />
		      <div className='pa-container'>
		      	<p className='breadcrumbs' dangerouslySetInnerHTML={{ __html: page.breadcrumbs }} />
						{React.cloneElement(props.children, {...page})}
					</div>
				</div>
			)
		}
	} else {
		return null
	}
})

Admin.propTypes = {
	children: PropTypes.element
}

export default Admin