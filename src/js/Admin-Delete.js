import React, { useEffect } from 'react'
import Layout from './_Components/Layout-Admin'
import PropTypes from 'prop-types'

const SignOut = React.memo(({ url }) => {

	useEffect(() => {
		setTimeout(() => {
			window.location.href = url
		}, 2000) // eslint-disable-next-line
	},[])

	return (
		<div className='admin-login-container'>
			<div className='alc-form-container'>
				<p className='alc-sign-out'>Deleting post ...</p>
			</div>
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