import React from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout-Admin'
import Call from './_Components/_API/Call'

const Admins = ({ admins }) => {

	const setStatus = (type, id) => {
		if (type === 'approve') {
			Call('/api/admin/admins/approved/' + id)
		} else {
			Call('/api/admin/admins/removed/' + id)
		}
	}

	return (
		<div className='admin-vert-list'>
			{admins.map((a,i) => {
				return <div className='avl-post avl-admin-post' key={i}>
					<h3>{a.first_name} {a.last_name}</h3>
					<p>Email: <span>{a.email}</span></p>
					<div>
						{a.role === 'pending'
						? <React.Fragment>
								<p onClick={() => setStatus('approve', a.ID)}>Approve</p>
								<p onClick={() => setStatus('deny', a.ID)}>Deny</p>
							</React.Fragment>
						: <p onClick={() => setStatus('remove', a.ID)}>Remove Access</p>
						}
					</div>
				</div>
			})}
			{admins.length === 0 &&
				<p className='no-posts'>There are no admins to manage.</p>
			}
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