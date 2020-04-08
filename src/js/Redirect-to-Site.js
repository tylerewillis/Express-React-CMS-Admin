import React, { useEffect } from 'react'
import { MAIN_SITE } from './_Components/_Config'

export default React.memo(() => {

	useEffect(() => {
		setTimeout(() => {
			window.location.replace(MAIN_SITE)
		},2000)
	},[])

	return (
		<div className='center-block'>
			<p>Redirecting you back to {MAIN_SITE} ...</p>
		</div>
	)

})