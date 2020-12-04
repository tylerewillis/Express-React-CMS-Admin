import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'
import Submit from './_Components/_API/Submit'

const Nav = ({ details, blocks, types, settings }) => {

	const [ dets, setDets ] = useState(details)
	const [ order, setOrder ] = useState(blocks)
	const [ typesState, setTypesState ] = useState(types)
	const [ loading, setLoading ] = useState(false)

	const updateState = (ignore = false, add = false, ignoreType = false, addType = false) => {
		// Details
		var newState = []
		document.querySelectorAll('.client-details .item').forEach(item => {
			newState.push({
				id: item.getAttribute('data-id'),
				name: item.getAttribute('data-name'),
				value: item.getAttribute('data-value')
			})
		})
		setDets(newState)
		// Blocks
		var id = 0, newState = [] //eslint-disable-line
		document.querySelectorAll('.dashboard-blocks .item').forEach(item => {
			if (parseInt(item.getAttribute('data-id')) > id) id = parseInt(item.getAttribute('data-id'))
			if ((ignore && !item.classList.contains(ignore)) || !ignore) {
				newState.push({
					id: item.getAttribute('data-id'),
					name: item.getAttribute('data-name'),
					url: item.getAttribute('data-url'),
					description: item.getAttribute('data-description')
				})
			}
		})
		if (add) newState.push({id: id + 1, name: '', url: '', description: ''})
		setOrder(newState)
		// Post types
		var id = 0, newState = [] //eslint-disable-line
		document.querySelectorAll('.post-types .item').forEach(item => {
			if (parseInt(item.getAttribute('data-id')) > id) id = parseInt(item.getAttribute('data-id'))
			if ((ignoreType && !item.classList.contains(ignoreType)) || !ignoreType) {
				newState.push({
					id: item.getAttribute('data-id'),
					type: item.getAttribute('data-type'),
					single: item.getAttribute('data-single'),
					content: item.getAttribute('data-content')
				})
			}
		})
		if (addType) newState.push({id: id + 1, name: '', url: '', description: ''})
		setTypesState(newState)
	}

	const drag = (e, key) => { e.dataTransfer.setData("key", key)}
	const dragover = e => { e.preventDefault() }

	const drop = (e, key) => {
		e.preventDefault()
  	const movingKey = e.dataTransfer.getData("key")
  	document.querySelector(`.item-${movingKey}`).style.marginLeft = '0px'
  	document.querySelector(`.item-${movingKey}`).setAttribute('data-parent', false)
  	document.querySelector('.dashboard-blocks').insertBefore(document.querySelector(`.item-${movingKey}`), document.querySelector(`.item-${key}`))
		updateState()
	}

	const handleChange = (e) => {
		const el = e.target.closest('.item')
		el.setAttribute('data-name', el.querySelector('.input-name').value)
		el.setAttribute('data-url', el.querySelector('.input-url').value)
		el.setAttribute('data-description', el.querySelector('.input-desc').value)
		updateState()
	}

	const handleChangeType = (e) => {
		const el = e.target.closest('.item')
		el.setAttribute('data-type', el.querySelector('.input-type').value)
		el.setAttribute('data-single', el.querySelector('.input-single').value)
		el.setAttribute('data-content', el.querySelector('.input-content').value)
		updateState()
	}

	const handleChangeDet = (e) => {
		const el = e.target.closest('.item')
		el.setAttribute('data-value', el.querySelector('.input-value').value)
		updateState()
	}

	const deleteBlock = index => {
		if (window.confirm('Are you sure that you want to delete this dashboard block?')) {
			updateState('item-' + index)
		}
	}

	const deleteType = index => {
		if (window.confirm('Are you sure that you want to delete this post type?')) {
			updateState(false, false, 'item-' + index)
		}
	}

	const newItem = () => {
		updateState(false,true)
	}

	const newType = () => {
		updateState(false, false, false, true)
	}

	const handleSave = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, {
				details: dets,
				dashboard: order,
				post_types: typesState,
				settings
			})
			setLoading(false)
		})()
	}

	const handleSaveClose = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, {
				details: dets,
				dashboard: order,
				post_types: typesState,
				settings
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
				<h1>Client Details</h1>
				<p>Update the client details below.</p>
			</div>
			<div className='client-details'>
				{dets.map(item => {
					return <div className={'item item-' + item.id} key={item.id} data-id={item.id} data-name={item.name} data-value={item.value}>
						<label>{item.name}:</label>
						<input type='text' className='input-value' defaultValue={item.value} onChange={handleChangeDet} />
					</div>
				})}
			</div>
			{/***************/}
			<div className='block'>
				<h1>Dashboard Blocks</h1>
				<p>Drag and drop the blocks below to reorder how they appear in the dashboard.</p>
			</div>
			<div className='dashboard-blocks'>
				{order.map(item => {
					return <div className={'item item-' + item.id} onDragStart={(e) => drag(e,item.id)} onDragOver={(e) => dragover(e)} onDrop={(e) => drop(e,item.id)} key={item.id} draggable="true" data-id={item.id} data-name={item.name} data-description={item.description} data-url={item.url}>
						<div className='details'>
							<label>Name:
								<input type='text' className='input-name' defaultValue={item.name} onChange={handleChange} />
							</label>
							<label>URL:
								<input type='text' className='input-url' defaultValue={item.url} onChange={handleChange} />
							</label>
							<div className='desc'>
								<label>Description:
									<input type='text' className='input-desc' defaultValue={item.description} onChange={handleChange} />
								</label>
							</div>
						</div>
						<i class="fas fa-times delete" onClick={() => deleteBlock(item.id)}></i>
					</div>
				})}
			</div>
			<div className='buttons-bottom'>
				<div className='add-item' onClick={newItem}>
					<p>Add new block</p>
				</div>
			</div>
			{/***************/}
			<div className='block' style={{marginTop: '50px'}}>
				<h1>Post Types</h1>
				<p>Create and edit the blocks below to add new post types.</p>
			</div>
			<div className='post-types'>
				{typesState.map(item => {
					return <div className={'item item-' + item.id} key={item.id} data-id={item.id} data-type={item.type} data-single={item.single} data-content={item.content}>
						<div className='details'>
							<label>Type:
								<input type='text' className='input-type' defaultValue={item.type} onChange={handleChangeType} />
							</label>
							<label>Type Single:
								<input type='text' className='input-single' defaultValue={item.single} onChange={handleChangeType} />
							</label>
							<div className='desc'>
								<label>Content:
									<textarea className='input-content' defaultValue={item.content} onChange={handleChangeType} />
								</label>
							</div>
						</div>
						<i class="fas fa-times delete" onClick={() => deleteType(item.id)}></i>
					</div>
				})}
			</div>
			<div className='buttons-bottom'>
				<div className='add-item' onClick={newType}>
					<p>Add new post type</p>
				</div>
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