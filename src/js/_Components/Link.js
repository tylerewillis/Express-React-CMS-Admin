import React from 'react'
import PropTypes from 'prop-types'

const Link = React.memo(({ title, desc, link }) => {
	if (link && link !== 'false') {
		return (
			<a className='ad-single' href={'/' + link}>
				<h2>{title}</h2>
				<p>{desc}</p>
			</a>
		)
	} else {
		return (
			<p className='ad-single'>
				<h2>{title}</h2>
				<p>{desc}</p>
			</p>
		)
	}
})

Link.propTypes = {
	title: PropTypes.string,
	desc: PropTypes.string,
	link: PropTypes.string
}

export default Link