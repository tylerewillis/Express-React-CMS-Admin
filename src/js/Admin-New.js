import React, { useEffect } from 'react'
import Layout from './_Components/Layout-Admin'
import PropTypes from 'prop-types'

const New = React.memo(({ url }) => {

	useEffect(() => {
		setTimeout(() => {
			window.location.href = url
		}, 2000) // eslint-disable-next-line
	},[])

	return (
		<div className='admin-login-container'>
			<div className='alc-form-container'>
				<p className='alc-sign-out'>Creating new post ...</p>
			</div>
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