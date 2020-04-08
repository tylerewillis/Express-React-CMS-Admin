import React, { useEffect } from 'react'
import { API_PATH } from './_Components/_Config'

export default React.memo(() => {

	useEffect(() => {
		setTimeout(() => {
			window.location.replace(API_PATH)
		},2000)
	},[])

	return (
		<div className='center-block'>
			<p>Redirecting you back to {API_PATH} ...</p>
		</div>
	)

})