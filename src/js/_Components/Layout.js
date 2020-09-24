import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Helmet } from "react-helmet"
import { useCookies } from 'react-cookie'
import Head from './Head'
import { MAIN_SITE, API_PATH } from './_Config'
import Loading from './Loading'
import { API_IMAGE_PATH } from './_Config'

const Admin = React.memo((props) => {

	const [ page, setPage ] = useState(null)
	const [ cookies, setCookie ] = useCookies(['signedIn']) // eslint-disable-line

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
			if (window.location.pathname !== '/signin') {
				window.location.replace('/signin')
			} else {
				return (
					<div className='page page-admin'>
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
		        <title>{decodeURIComponent(page.title)}</title>
		        <meta name='description' content=''/>
		        <meta property='og:locale' content='en_US' />
		        <meta property='og:type' content='website' />
		        <meta property='og:title' content={page.title} />
		        <meta property='og:description' content='' />
		        <meta property='og:image' content={''} />
		      </Helmet>
		      <Head />
	      	<div className='admin-header'>
	      		<div className='container'>
			      	<div className='section'>
			      		<p className='main-site'>
					      	<a href={MAIN_SITE}>
					      		<i class="fas fa-reply"></i>
					      		<span>Go to Website</span>
					      	</a>
				      	</p>
				      	<span className='divider'>|</span>
				      	{cookies.name &&
				      		<React.Fragment>
				      			<p>Hi, {cookies.name} 🙂</p>
				      			<span className='divider'>|</span>
				      		</React.Fragment>
				      	}
				      	<p className='breadcrumbs' dangerouslySetInnerHTML={{ __html: page.breadcrumbs }} />
					    </div>
					    <div className='section'>
					    	<a href='/resources'>
					    		<i className="far fa-file-alt"></i>
					    		<span>Resources</span>
					    	</a>
					    	<a href='mailto:web@mullinashley.com'>
					    		<i className="far fa-comment"></i>
					    		<span>Support</span>
					    	</a>
					    	<a href='/signout'>
					    		<i className="fas fa-sign-out-alt"></i>
					    		<span>Sign Out</span>
					    	</a>
					    </div>
					  </div>
			    </div>
			    <div className='page-admin-main'>
						{React.cloneElement(props.children, {...page})}
					</div>
					<div className='admin-footer'>
						<img src={API_IMAGE_PATH + 'ma-vertical-logo-blue-peach.png'} alt='Mullin/Ashley logo' />
					</div>
				</div>
			)
		}
	} else {
		return <Loading />
	}
})

Admin.propTypes = {
	children: PropTypes.element
}

export default Admin