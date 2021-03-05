import React, { useState, useEffect } from 'react'
import Layout from './_Components/Layout'
import PropTypes from 'prop-types'

const New = React.memo(({ url }) => {

	const [ seconds, setSeconds ] = useState(3)

	useEffect(() => {
		setTimeout(() => {
			window.location.href = url
		}, 3000)
	},[]) //eslint-disable-line

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
			<p>Creating ...</p>
			<img src='https://i.pinimg.com/originals/18/e1/fb/18e1fb716b6c09af02bb658787b5404c.gif' alt='creating' />
		</div>
	)
})

New.propTypes = {
	url: PropTypes.string
}

export default () => (
	<Layout>
		<New />
	</Layout>
)