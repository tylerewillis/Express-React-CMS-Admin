import React, { useState, useEffect } from 'react'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'
import Submit from './_Components/_API/Submit'

const Nav = ({ post, content }) => {

	const [ order, setOrder ] = useState(content)
	const [ loading, setLoading ] = useState(false)

	//------------------------------
	// Set initial formatting and assign levels
	//------------------------------

	useEffect(() => {
		let items = document.querySelectorAll('.nav .item')
		var level1 = '', level2 = ''
		for (let i = 0; i < items.length; i++) {
			let parent = items[i].getAttribute('data-parent')
			let name = items[i].getAttribute('data-name')
			if (parent) {
				if (parent === level1) items[i].style.marginLeft = '50px'
				if (parent === level2) items[i].style.marginLeft = '100px'
			}
			// Assign level
			if (!items[i].style.marginLeft || items[i].style.marginLeft === '0px') level1 = name
			else if (items[i].style.marginLeft === '50px') level2 = name
		}
	},[])

	//------------------------------
	// Update state
	//------------------------------

	const updateState = (ignore = false, add = false) => {
		// Reset variables
		let items = document.querySelectorAll('.nav .item')
		var level1 = '', level2 = '', level3 = '' //eslint-disable-line
		for (let i = 0; i < items.length; i++) {
			let name = items[i].getAttribute('data-name')
			// Assign level
			if (!items[i].style.marginLeft || items[i].style.marginLeft === '0px') level1 = name
			else if (items[i].style.marginLeft === '50px') level2 = name
			else level3 = name
			// Assign parent
			if (name === level1) items[i].setAttribute('data-parent', false)
			else if (name === level2) items[i].setAttribute('data-parent', level1)
			else items[i].setAttribute('data-parent', level2)
		}
		// Update State
		var newState = []
		document.querySelectorAll('.nav .item').forEach(item => {
			if ((ignore && !item.classList.contains(ignore)) || !ignore) {
				newState.push({
					id: parseInt(item.getAttribute('data-id')),
					name: item.getAttribute('data-name'),
					url: item.getAttribute('data-url'),
					parent: item.getAttribute('data-parent')
				})
			}
		})
		if (add) {
			// Generate ID
			var highest = 0
			newState.forEach(item => {
				if (item.id > highest) highest = item.id
			})
			newState.push({id: highest + 1, name: '',url: '',parent: false})
		}
		setOrder(newState)
	}

	//------------------------------
	// Drag / reorder
	//------------------------------

	const drag = (e, key) => { e.dataTransfer.setData("key", key)}
	const dragover = e => { e.preventDefault() }

	const drop = (e, key) => {
		e.preventDefault()
  	const movingKey = e.dataTransfer.getData("key")
  	console.log(movingKey)
  	document.querySelector(`.item-${movingKey}`).style.marginLeft = '0px'
  	document.querySelector(`.item-${movingKey}`).setAttribute('data-parent', false)
  	document.querySelector('.nav').insertBefore(document.querySelector(`.item-${movingKey}`), document.querySelector(`.item-${key}`))
		// Update parent of child elements
		const parentName = (document.querySelector(`.item-${key - 1}`)) ? document.querySelector(`.item-${key - 1}`).getAttribute('data-name') : false
		const newParentName = document.querySelector(`.item-${movingKey}`).getAttribute('data-name')
		if (parentName) {
			let items = document.querySelectorAll('.nav .item')
			for (let i = key; i < items.length; i++) {
				if (items[i].getAttribute('data-parent') === parentName) items[i].setAttribute('data-parent', newParentName)
			}
		}
		updateState()
	}

	//------------------------------
	// Shift right
	//------------------------------

	const tab = key => {
		// If not first element
		if (key !== 0) {
			// If previous element is not element's parent (to prevent double indentation)
			const prev = document.querySelector('.item-key-' + (key - 1)).getAttribute('data-name')
			const el = document.querySelector('.item-key-' + key)
			if (el.getAttribute('data-parent') !== prev) {
				// Tab
				if (!el.style.marginLeft || el.style.marginLeft === '0px') el.style.marginLeft = '50px'
				else if (el.style.marginLeft === '50px') el.style.marginLeft = '100px'
				else el.style.marginLeft = '0px'
				updateState()
			}
		}
	}

	//------------------------------
	// Shift left
	//------------------------------

	const unTab = key => {
		const el = document.querySelector('.item-key-' + key)
		// Tab
		if (!el.style.marginLeft || el.style.marginLeft === '50px') el.style.marginLeft = '0px'
		else if (el.style.marginLeft === '100px') el.style.marginLeft = '50px'
		else el.style.marginLeft = '100px'
		// If children, untab also
		let items = document.querySelectorAll('.nav .item')
		const name = el.getAttribute('data-name')
		for (let i = key; i < items.length; i++) {
			if (items[i].getAttribute('data-parent') === name) {
				if (!items[i].style.marginLeft || items[i].style.marginLeft === '50px') items[i].style.marginLeft = '0px'
				else if (items[i].style.marginLeft === '100px') items[i].style.marginLeft = '50px'
				else items[i].style.marginLeft = '100px'
			}
		}
		updateState()
	}

	//------------------------------
	// Change input
	//------------------------------

	const handleChange = (e) => {
		const el = e.target.closest('.item')
		const oldName = el.getAttribute('data-name')
		const newName = el.querySelector('.input-name').value
		el.setAttribute('data-name', newName)
		el.setAttribute('data-url', el.querySelector('.input-url').value)
		// Update children
		if (oldName !== newName) {
			let items = document.querySelectorAll('.nav .item')
			for (let i = 0; i < items.length; i++) {
				if (items[i].getAttribute('data-parent') === oldName) items[i].setAttribute('data-parent', newName)
			}
		}
		updateState()
	}

	//------------------------------
	// Delete item
	//------------------------------

	const deleteNav = index => {
		if (window.confirm('Are you sure that you want to delete this navigation item?')) {
			// Update children
			const name = document.querySelector('.item-' + index).getAttribute('data-name')
			let items = document.querySelectorAll('.nav .item')
			for (let i = 0; i < items.length; i++) {
				if (items[i].getAttribute('data-parent') === name) {
					items[i].setAttribute('data-parent', false)
					items[i].style.marginLeft = '0px'
				}
			}
			updateState('item-' + index)
		}
	}

	//------------------------------
	// Create new link
	//------------------------------

	const newItem = () => {
		updateState(false,true)
	}

	//------------------------------
	// Save
	//------------------------------

	const handleSave = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, order)
			setLoading(false)
		})()
	}

	const handleSaveClose = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, order)
			const prevUrl = window.location.pathname.split('/')
			prevUrl.pop()
			const url = prevUrl.join('/')
			window.location.replace(url)
		})()
	}

	const handleCancel = () => {
		window.location.replace('/')
	}

	return (
		<div className='admin-navigation'>
			<div className='block'>
				<h1>{post.name}</h1>
				<p>Drag and drop the menu items below to reorder how they appear on the website. To insert the item as a sub-link, drag and drop under the parent link and then indent.</p>
			</div>
			<div className='nav'>
				{order.map((item, i) => {
					return <div className={'item item-' + item.id + ' item-key-' + i} onDragStart={(e) => drag(e,item.id)} onDragOver={(e) => dragover(e)} onDrop={(e) => drop(e,item.id)} key={item.id} draggable="true" data-id={item.id} data-name={item.name} data-url={item.url} data-parent={(item.parent) ? item.parent : false}>
						<i class="fas fa-caret-left arrow arrow-left" onClick={() => unTab(i)}></i>
						<i className="fas fa-caret-right arrow arrow-right" onClick={() => tab(i)}></i>
						<div className='details'>
							<p className='number'>{(i + 1) + '.'}</p>
							<label>Name:
								<input type='text' className='input-name' defaultValue={item.name} onChange={handleChange} />
							</label>
							<label>URL:
								<input type='text' className='input-url' defaultValue={item.url} onChange={handleChange} />
							</label>
						</div>
						<i class="fas fa-times delete" onClick={() => deleteNav(item.id)}></i>
					</div>
				})}
			</div>
			<div className='buttons-bottom'>
				<div className='add-item' onClick={newItem}>
					<p>Add new navigation link</p>
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