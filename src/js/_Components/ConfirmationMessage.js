import React from 'react'
import PropTypes from 'prop-types'

function Message({ first }){
	return (
		<p className='form-confirmation'>Thanks for your message, {first}. We'll get back to you shortly.</p>
	)
}

Message.propTypes = {
	first: PropTypes.string
}

export default Message