import React from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import Submit from './_Components/_API/Submit'

const Admins = ({ admins }) => {

	const setStatus = (element, type, id) => {
		if (type === 'approve') {
			if (window.confirm('Are you sure that you want to approve this admin request?')) {
				(async () => {
					await Submit(window.location.pathname + '/approved/' + id)
				})()
				element.querySelector('div').remove()
			}
		} else if (type === 'deny') {
			if (window.confirm('Are you sure that you want to deny this admin request?')) {
				(async () => {
					await Submit(window.location.pathname + '/denied/' + id)
				})()
				element.remove()
			}
		} else {
			if (window.confirm('Are you sure that you want to remove admin access for this user?')) {
				(async () => {
					await Submit(window.location.pathname + '/removed/' + id)
				})()
				element.remove()
			}
		}
	}

	return (
		<div className='admin-vert-list admin-admins'>
			{admins.map((a,i) => {
				return <div className='avl-post avl-admin-post' key={i}>
					<h3>{a.first_name} {a.last_name}</h3>
					<p>Email: <span>{a.email}</span></p>
					<div>
						{a.role === 'pending'
						? <React.Fragment>
								<p onClick={(e) => setStatus(e.target.closest('.avl-post'), 'approve', a.ID)}>Approve</p>
								<p onClick={(e) => setStatus(e.target.closest('.avl-post'), 'deny', a.ID)}>Deny</p>
							</React.Fragment>
						: <p onClick={(e) => setStatus(e.target.closest('.avl-post'), 'remove', a.ID)}>Remove Access</p>
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