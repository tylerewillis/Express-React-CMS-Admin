import React , { useState} from 'react'
import Submit from '../_API/Submit'

export default ({ emails, levels, setLoading, addUser }) => {

	const [ first, setFirst ] = useState('')
	const [ last, setLast ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ level, setLevel ] = useState('')

	const send = () => {
		if (!emails.includes(email)) {
			if (first && last && email && level) {
				setLoading(true);
				(async () => {
					await Submit(window.location.pathname + '/new-admin', { first, last, email, level })
					setFirst('')
					setLast('')
					setEmail('')
					setLevel('')
					setLoading(false)
				})()
				addUser({ first_name: first, last_name: last, email, level })
			} else {
				window.alert('Please be sure to populate every input before sending the invite.')
			}
		} else {
			window.alert('This email has already been assigned administrator access.')
		}
	}

	return (
		<div className='new-admin'>
			<h6>Invite a new admin</h6>
			<div className='input-group'>
				<input placeholder='First' value={first} onChange={e => setFirst(e.target.value)} />
				<input placeholder='Last' value={last} onChange={e => setLast(e.target.value)} />
			</div>
			<input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
			<select value={level.name} onChange={e => setLevel(e.target.value)}>
				<option value=''>Select Access</option>
				{levels.map((level, i) => {
					return <option value={level.name}>{level.name}</option>
				})}
			</select>
			<input class={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && level.length && first.length && last.length ? 'active' : ''} type='submit' value='Send Invite' onClick={() => send()} />
		</div>
	)
}