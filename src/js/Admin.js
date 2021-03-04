import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import Link from './_Components/Link'
import { useCookies } from 'react-cookie'
import Search from './_Components/_Dashboard/Search'
import Results from './_Components/_Dashboard/Results'

const Admin = React.memo(({ blocks, results, types, accessLevels }) => {

	const [ cookies, setCookie ] = useCookies(['signedIn', 'role']) // eslint-disable-line
	const [ search, setSearch ] = useState('')
	const [ approved, setApproved ] = useState([])

	useEffect(() => {
		console.log(cookies.role)
		console.log(accessLevels)
		accessLevels.forEach(level => {
			if (level.name.toLowerCase() === cookies.role.toLowerCase()) {
				setApproved(level.access)
			}
		})
	},[]) //eslint-disable-line

	return (
		<div className='admin-dashboard'>
			<Search search={search} setSearch={setSearch} types={types} />
			{!search && blocks.map(block => {
				if (cookies.role.toLowerCase() === 'super' || cookies.role.toLowerCase() === 'admin' || approved.includes(block.name)) {
					return <Link key={block.id} title={block.name} desc={block.description} link={block.url} />
				} else return false
			})}
			{!search && (cookies.role.toLowerCase() === 'admin' || cookies.role.toLowerCase() === 'super') && <Link title='Admins' desc="View and approve/revoke administrator access." link='admins' />}
			{!search && cookies.role.toLowerCase() === 'super' && <Link title='Configuration' desc="Edit the site's admin dashboard and custom post types." link='config' />}
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