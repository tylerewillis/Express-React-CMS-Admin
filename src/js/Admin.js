import React from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout-Admin'
import Link from './_Components/Admin-Link'
import { useCookies } from 'react-cookie'

const Admin = React.memo(({ role }) => {

	const [ cookies, setCookie ] = useCookies(['signedIn', 'role']) // eslint-disable-line
	
	return (
		<div className='admin-dashboard'>
			<Link title='Pages' desc='Review and edit page content displayed on the website.' link='pages' />
			<Link title='Support' desc='Contact Mullin/Ashley for support at support@mullinashley.com' link='#' />
			<Link title='Sign Out' desc='Click to sign out of the administrator dashboard.' link='signout' />
			<Link title='Events' desc='Review upcoming and past events, and create new events.' link='events' />
			<Link title='Blog' desc='Create new blog posts or review/edit existing posts.' link='blog' />
			<Link title='News' desc='Create new news posts or review/edit existing posts.' link='news' />
			<Link title='Comments' desc='Create new comments or review existing comments.' link='comments' />
			<Link title='Media' desc='Review and upload new files.' link='media' />
			<Link title='Navigation' desc="Update the site's main navigation" link='nav' />
			<Link title='Alerts' desc='Review and create alerts to be displayed to visitors on the website.' link='alerts' />
			<Link title='Metadata' desc='The behind-the-scenes context effecting SEO of each web page.' link='meta' />
			<Link title='Queries' desc='Review user queries that have been submitted to the website.' link='queries' />
			<Link title='Resources' desc='Tips and tricks to help you with your website.' link='resources' />
			{role !== 'approved' &&
				<Link title='Admins' desc='View and approve/revoke administrator access.' link='admins' />
			}
			{cookies['role'] === 'super' && 
				<Link title='New Page' desc='For super users, add a new page.' link='new-page' />
			}
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