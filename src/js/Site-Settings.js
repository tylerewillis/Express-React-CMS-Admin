import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'
import Submit from './_Components/_API/Submit'

const Nav = ({ details, dashboard, post_types, settings }) => {

	const [ loading, setLoading ] = useState(false)
	const [ data, setData ] = useState(settings)

	const handleChange = () => {
		var newState = []
		document.querySelectorAll('.settings .setting').forEach(item => {
			newState.push({
				id: item.getAttribute('data-id'),
				name: item.querySelector('h2').textContent,
				description: item.querySelector('p').textContent,
				value: item.querySelector('textarea').value
			})
		})
		setData(newState)
	}

	const handleSave = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, {
				details, dashboard, post_types,
				settings: data
			})
			setLoading(false)
		})()
	}

	const handleSaveClose = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, {
				details, dashboard, post_types,
				settings: data
			})
			window.location.replace('/')
		})()
	}

	const handleCancel = () => {
		window.location.replace('/')
	}

	return (
		<div className='admin-config'>
			{/***************/}
			<div className='block'>
				<h1>Global Site Settings</h1>
				<p>Edit site settings including code blocks that appear on each page.</p>
			</div>
			<div className='settings'>
				{settings.map(item => {
					return <div className='setting' data-id={item.id} key={item.id}>
						<h2>{item.name}</h2>
						<p>{item.description}</p>
						<textarea defaultValue={item.value} onChange={handleChange} />
					</div>
				})}
			</div>
			<div className='buttons-bottom'>
				<div>
					<p className='save' onClick={handleSave}>Save</p>
					<p className='plain' onClick={handleSaveClose}>Save & Close</p>
					<p className='plain' onClick={handleCancel}>Cancel & Go Back</p>
				</div>
			</div>
			{loading && <Loading />}
		</div>
	)
}

export default () => (
	<Layout>
		<Nav />
	</Layout>
)