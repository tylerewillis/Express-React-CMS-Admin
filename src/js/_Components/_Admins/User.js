import React , { useState} from 'react'
import Submit from '../_API/Submit'

export default ({ first, last, email, role, levels, setLoading, removeUser }) => {

	const [ newRole, setNewRole ] = useState(role)
	const [ changes, setChanges ] = useState(false)
	const [ currentRole, setCurrentRole ] = useState(role)

	const changeRole = e => {
		let temp = e.target.value
		setNewRole(temp)
		if (currentRole !== temp) setChanges(true)
		else setChanges(false)
	}

	const save = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname + '/update/' + email, { previous: role, new: newRole })
			setLoading(false)
			setCurrentRole(newRole)
			setChanges(false)
		})()
	}

	const revoke = () => {
		if (window.confirm('Are you sure that you want to revoke this user\'s administrator access?')) {
			setLoading(true);
			(async () => {
				await Submit(window.location.pathname + '/remove/' + email)
				setLoading(false)
				removeUser(email)
			})()
		}
	}

	return (
		<div className='avl-post avl-admin-post user'>
			<h3>{first} {last}</h3>
			<p>Email: <span>{email}</span></p>
			<div className='actions'>
				<select value={newRole} onChange={e => changeRole(e)}>
					<option value='pending'>Select Access</option>
					{levels.map((level, i) => {
						return <option value={level.name} key={i}>{level.name}</option>
					})}
				</select>
				<p className={changes ? 'save active': 'save'} onClick={() => save()}>Save</p>
				<p className='remove' onClick={() => revoke()}><i class="far fa-trash-alt"></i></p>
			</div>
		</div>
	)
}