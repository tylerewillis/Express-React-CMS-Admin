import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout-Admin'
import { API_PATH } from './_Components/_Config'

const Queries = React.memo(({ types, queries }) => {

	const [ active, setActive ] = useState(types[0])

	const toggle = (tab) => {
		setActive(tab)
	}

	return (
		<div className='admin-vert-list'>
			<div className='avl-tabs'>
				{types.map((t,i) => {
					return <p key={i} className={(active === t) ? 'avct-active' : ''} onClick={() => toggle(t)}>{t.charAt(0).toUpperCase() + t.substr(1)}</p>
				})}
			</div>
			<div className='avl-post-header'>
				{types.map((t,i) => {
					return (
						<div style={{'display': (active === t) ? 'flex' : 'none'}}>
							<p>{t.charAt(0).toUpperCase() + t.substr(1)} Queries</p>
							<a href={API_PATH + '/queries/export/' + t} key={i} target='_blank' rel="noopener noreferrer">Export</a>
						</div>
					)
				})}
			</div>
			{queries.map((q,i) => {
				return <div className={(active === q.type) ? 'avl-post avlp-active' : 'avl-post'} key={i} id={i} >
					<div className='query'>
						<div className='query-header'>
							<p>{q.data[0]} on {q.contact_date}</p>
						</div>
						<div className='query-fields'>
							{q.data.map((value,j) => {
								if (value && q.keys[j] !== 'Ip') {
									return <p key={j}>{q.keys[j]}:
										<span>{value}</span>
									</p>
								} else {
									return null
								}
							})}
						</div>
					</div>
				</div>
			})}
		</div>
	)
})

Queries.propTypes = {
	types: PropTypes.array,
	queries: PropTypes.array
}

export default () => (
	<Layout>
		<Queries />
	</Layout>
)