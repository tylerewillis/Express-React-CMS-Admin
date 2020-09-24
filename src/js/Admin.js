import React from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import Link from './_Components/Link'
import { useCookies } from 'react-cookie'

const Admin = React.memo(({ blocks }) => {

	const [ cookies, setCookie ] = useCookies(['signedIn', 'role']) // eslint-disable-line
	
	return (
		<div className='admin-dashboard'>
			{blocks.map(block => {
				return <Link key={block.id} title={block.name} desc={block.description} link={block.url} />
			})}
			{(cookies.role === 'admin' || cookies.role === 'super') && <Link title='Admins' desc="View and approve/revoke administrator access." link='admins' />}
			{cookies.role === 'super' && <Link title='Configuration' desc="Edit the site's admin dashboard and customo post types." link='config' />}
		</div>
	)
})

Admin.propTypes = {
	content: PropTypes.array,
	role: PropTypes.string
}

export default () => (
	<Layout>
		<Admin />
	</Layout>
)