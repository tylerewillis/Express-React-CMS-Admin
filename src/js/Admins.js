import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'

import Settings from './_Components/_Admins/Settings'
import List from './_Components/_Admins/List'

const Admins = ({ admins, dashboardBlocks, levels }) => {

	const [ loading, setLoading ] = useState(false)
	const [ emails, setEmails ] = useState([])
	const [ users, setUsers ] = useState(admins)

	const removeUser = email => {
		let temp = users, index = false
		temp.forEach((user, i) => {
			if (user.email === email) index = i
		})
		temp.splice(index, 1)
		setUsers([ ...temp ])
	}

	const addUser = user => {
		let temp = users
		temp.push(user)
		setUsers([ ...temp ])
	}

	useEffect(() => {
		let temp = []
		admins.forEach(admin => {
			temp.push(admin.email)
		})
		setEmails(temp)
	},[]) //eslint-disable-line

	const removeLevelsFromUsers = name => {
		let temp = users
		temp.forEach(user => {
			if (user.role.toLowerCase() === name.toLowerCase()) user.role = 'Pending'
		})
		setUsers([ ...temp ])
	}

	return (
		<div className='admin-vert-list admin-admins'>
			<Settings emails={emails} levels={levels} dashboardBlocks={dashboardBlocks} setLoading={setLoading} addUser={addUser} removeLevelsFromUsers={removeLevelsFromUsers} />
			<List users={users} levels={levels} setLoading={setLoading} removeUser={removeUser} />
			{loading && <Loading />}
		</div>
	)
}

Admins.propTypes = {
	admins: PropTypes.array
}

export default () => (
	<Layout>
		<Admins />
	</Layout>
)