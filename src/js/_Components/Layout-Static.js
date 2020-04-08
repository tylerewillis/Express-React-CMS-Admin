import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Helmet } from "react-helmet"
import { API_PATH } from './_Config'

import Head from './Head'
import Header from './Header'
import Footer from './Footer'
import Loading from './Loading'

const Static = React.memo((props) => {
	const [ page, setPage ] = useState(null)
	const [ pageClass, setPageClass ] = useState(null)

	useEffect(() => {
		(async function() {
			const path = window.location.pathname === '/' ? '/home' : window.location.pathname
			const res = await fetch(API_PATH + path)
		  const json = await res.json()

		  setPageClass(path.replace(/\//g, '-'))
		  setPage(json)
		})()
	},[])

	return (
		<React.Fragment>
			{page
			?	<div className={'page page' + pageClass}>
					<Helmet>
		        <meta charSet="utf-8" />
		        <title>{page.meta.title}</title>
		        <meta name='description' content={page.meta.description} />
		        <meta property='og:locale' content='en_US' />
		        <meta property='og:type' content='website' />
		        <meta property='og:title' content={page.meta.title} />
		        <meta property='og:description' content={page.meta.description} />
		        <meta property='og:image' content={'/static/media/' + page.meta.image} />
		      </Helmet>
		      <Head />
     			<Header />
					{React.cloneElement(props.children, {...page})}
					<Footer />
				</div>
			: <Loading />}
		</React.Fragment>
	)
})

Static.propTypes = {
	children: PropTypes.element
}

export default Static