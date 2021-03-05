import React, { useState, useEffect } from 'react'
import Layout from './_Components/Layout'

const NoAccess = React.memo(() => {

	const [ seconds, setSeconds ] = useState(10)

	useEffect(() => {
		setTimeout(() => {
			window.location.href = '/'
		}, 10000) // eslint-disable-next-line
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
			<p>Sorry, you don't have access to this page. Please check with the site's administrator.</p>
			<img src='https://media1.giphy.com/media/TOnojCoZnkDMdrwAuk/giphy.gif?cid=ecf05e47tt3bjjnfprbjssilbya9bnqw0032i53kuai36l4c&rid=giphy.gif' alt='denied' />
		</div>
	)
})

export default () => (
	<Layout>
		<NoAccess />
	</Layout>
)