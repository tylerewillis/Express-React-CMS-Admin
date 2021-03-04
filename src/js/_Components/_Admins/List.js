import React from 'react'
import User from './User'

export default ({ users, levels, setLoading, removeUser }) => {

	return (
		<div className='list'>
			{users.map((a,i) => {
				return <User id={a.ID} first={a.first_name} last={a.last_name} email={a.email} role={a.role} key={i} levels={levels} display={a.display} setLoading={setLoading} removeUser={removeUser} />
			})}
			{users.length === 0 &&
				<p className='no-posts'>There are no admins to manage.</p>
			}
		</div>
	)
}