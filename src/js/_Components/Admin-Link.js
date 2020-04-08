import React from 'react'
import PropTypes from 'prop-types'

const Link = React.memo(({ title, desc, link }) => {
	return (
		<a className='ad-single' href={'/admin/' + link}>
			<h2>{title}</h2>
			<p>{desc}</p>
		</a>
	)
})

Link.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
	link: PropTypes.string
}

export default Link