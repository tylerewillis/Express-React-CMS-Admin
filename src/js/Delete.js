import React, { useState, useEffect } from 'react'
import Layout from './_Components/Layout'
import PropTypes from 'prop-types'

const SignOut = React.memo(({ url }) => {

	const [ seconds, setSeconds ] = useState(3)

	useEffect(() => {
		setTimeout(() => {
			window.location.href = url
		}, 3000)
	},[]) // eslint-disable-line

	// Timer
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
			<p>Deleting ...</p>
			<img src='https://64.media.tumblr.com/tumblr_mbui1kpPoU1rxdw8g.gif' alt='erase' />
		</div>
	)
})

SignOut.propTypes = {
	url: PropTypes.string
}

export default () => (
	<Layout>
		<SignOut />
	</Layout>
)