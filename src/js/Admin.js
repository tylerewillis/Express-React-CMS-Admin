import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import Link from './_Components/Link'
import { useCookies } from 'react-cookie'
import Search from './_Components/_Dashboard/Search'
import Results from './_Components/_Dashboard/Results'

const Admin = React.memo(({ blocks, results, types }) => {

	const [ cookies, setCookie ] = useCookies(['signedIn', 'role']) // eslint-disable-line
	const [ search, setSearch ] = useState('')
	
	return (
		<div className='admin-dashboard'>
			<Search search={search} setSearch={setSearch} types={types} />
			{!search && blocks.map(block => {
				return <Link key={block.id} title={block.name} desc={block.description} link={block.url} />
			})}
			{!search && (cookies.role === 'admin' || cookies.role === 'super') && <Link title='Admins' desc="View and approve/revoke administrator access." link='admins' />}
			{!search && cookies.role === 'super' && <Link title='Configuration' desc="Edit the site's admin dashboard and customo post types." link='config' />}
			<Results search={search} results={results} />
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