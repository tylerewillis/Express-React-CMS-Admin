import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import { API_PATH } from './_Components/_Config'
import Submit from './_Components/_API/Submit'

const Queries = React.memo(({ types, queries }) => {

	const [ active, setActive ] = useState('all')
	const [ search, setSearch ] = useState(false)
	const [ archived, setArchived ] = useState(false)

	const toggle = e => {
		setActive(e.target.value)
		//setActive(tab)
	}

	const searchQueries = e => {
		setSearch(e.target.value.toLowerCase())
	}

	const showArchived = e => {
		var temp = !archived
		setArchived(temp)
	}

	const archiveQuery = (element, id, status) => {
		if (status === 'archived') {
			if (window.confirm('Are you sure that you want to unarchive this query?')) {
				(async () => {
					await Submit(window.location.pathname + '/unarchive/' + id)
				})()
				element.closest('label').querySelector('input').checked = ''
			}
		} else {
			if (window.confirm('Are you sure that you want to archive this query?')) {
				(async () => {
					await Submit(window.location.pathname + '/archive/' + id)
				})()
				element.closest('label').querySelector('input').checked = 'checked'
			}
		}
	}

	const deleteQuery = (element, id) => {
		if (window.confirm('Are you sure that you want to delete this query? This cannot be undone.')) {
			(async () => {
				await Submit(window.location.pathname + '/delete/' + id)
			})()
			element.remove()
		}
	}

	// Activate checkboxes

	useEffect(() => {
		document.querySelectorAll('.archive-input').forEach(input => {
			if (input.getAttribute('data-status') === 'archived') input.checked = true
		})
	},[])

	return (
		<div className='admin-vert-list'>
			<div className='avl-select-header'>
				<select onChange={(e) => toggle(e)}>
					<option value='all'>All Queries</option>
					{types.map((t,i) => {
						return <option key={i} value={t}>{t.charAt(0).toUpperCase() + t.substr(1)}</option>
					})}
				</select>
				<a href={API_PATH + '/queries/export/' + active} target='_blank' rel="noopener noreferrer" style={{display: (active === 'all') ? 'none' : 'block'}}>Export</a>
			</div>
			<div className='avl-search-filter'>
				<input type='text' placeholder='Search' onChange={(e) => searchQueries(e)}/>
				<label>Show Archived
					<input type='checkbox' onChange={(e) => showArchived(e)} />
				</label>
			</div>
			{queries.map((q,i) => {
				return <div className={(q.status !== 'archived' || archived) && (active === 'all' || active === q.type) && (!search || JSON.stringify(q.data).toLowerCase().includes(search)) ? 'avl-post avlp-active' : 'avl-post'} key={i} id={i} >
					<div className='query'>
						<div className='query-header' onClick={(e) => { e.target.closest('.query').querySelector('.query-fields').classList.toggle('active') }}>
							<p>{q.data[0]} on {q.contact_date}</p>
							<i className="fas fa-chevron-down"></i>
						</div>
						<div className={(q.display) ? 'query-fields active' : 'query-fields'}>
							{q.data.map((value,j) => {
								if (value && value.name !== 'Ip') {
									return <p key={j}>{q.keys[j]}:
										<span>{value}</span>
									</p>
								} else {
									return null
								}
							})}
							<div className='actions'>
								<label>Archive
									<input type='checkbox' onChange={(e) => archiveQuery(e.target, q.ID, q.status)} data-status={q.status} class='archive-input' />
								</label>
								<label>Delete
									<input type='checkbox' onChange={(e) => deleteQuery(e.target.closest('.avl-post'), q.ID)} />
								</label>
							</div>
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