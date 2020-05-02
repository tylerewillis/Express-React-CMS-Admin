import React, { useState } from 'react'
import Layout from './_Components/Layout-Admin'

const Nav = ({ nav, posts }) => {

	const [ order, setOrder ] = useState(nav)

	const updateState = (ignore = false, add = false) => {
		var newState = []
		document.querySelectorAll('.nav .item').forEach(item => {
			if (!item.classList.contains('add-item') && ((ignore && !item.classList.contains(ignore)) || !ignore)) {
				newState.push({
					name: item.getAttribute('data-name'),
					url: item.getAttribute('data-url'),
					parent: item.getAttribute('data-parent')
				})
			}
		})
		if (add) newState.push({name: '',url: '',parent: false})
		setOrder(newState)
	}

	const drag = (e, key) => { e.dataTransfer.setData("key", key)}
	const dragover = e => { e.preventDefault() }

	const drop = (e, key) => {
		e.preventDefault()
  	const movingKey = e.dataTransfer.getData("key")
  	document.querySelector(`.item-${movingKey}`).style.marginLeft = '0px'
  	document.querySelector(`.item-${movingKey}`).setAttribute('data-parent', false)
  	document.querySelector('.nav').insertBefore(document.querySelector(`.item-${movingKey}`), document.querySelector(`.item-${key}`))
		updateState()
	}

	const tab = key => {
		// If not first element
		if (key !== 0) {
			// If subsequent element is not element's parent
			const prev = document.querySelector('.item-' + (key - 1)).getAttribute('data-name')
			const el = document.querySelector('.item-' + key)
			if (el.getAttribute('data-parent') !== prev) {
				// Tab
				if (!el.style.marginLeft || el.style.marginLeft === '0px') el.style.marginLeft = '50px'
				else if (el.style.marginLeft === '50px') el.style.marginLeft = '100px'
				else el.style.marginLeft = '0px'
				// Set parent
				let items = document.querySelectorAll('.nav .item')
				if (el.style.marginLeft === '0px') el.setAttribute('data-parent',false)
				else {
					for (let i = key; i >= 0; i--) {
						if (isNaN(parseInt(items[i].style.marginLeft)) || parseInt(items[i].style.marginLeft) < parseInt(el.style.marginLeft)) {
							el.setAttribute('data-parent',items[i].getAttribute('data-name'))
							break
						}
					}
				}
				updateState()
			}
		}
	}

	const unTab = key => {
		const el = document.querySelector('.item-' + key)
		// Tab
		if (!el.style.marginLeft || el.style.marginLeft === '50px') el.style.marginLeft = '0px'
		else if (el.style.marginLeft === '100px') el.style.marginLeft = '50px'
		else el.style.marginLeft = '100px'
		// Set parent
		let items = document.querySelectorAll('.nav .item')
		if (el.style.marginLeft === '0px') el.setAttribute('data-parent',false)
		else {
			for (let i = key; i >= 0; i--) {
				if (isNaN(parseInt(items[i].style.marginLeft)) || parseInt(items[i].style.marginLeft) < parseInt(el.style.marginLeft)) {
					el.setAttribute('data-parent',items[i].getAttribute('data-name'))
					break
				}
			}
		}
		// If children, untab also
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
	}

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

	const newItem = () => {
		updateState(false,true)
	}

	return (
		<React.Fragment>
			<div className='block'>
				<h1>Site Navigation</h1>
				<p>Drag and drop the menu items below to reorder how they appear on the website. To insert the item as a sub-link, drag under the parent link and indent before dropping.</p>
			</div>
			<div className='nav'>
				{order.map((item, i) => {
					return <div className={'item item-' + i} onDragStart={(e) => drag(e,i)} onDragOver={(e) => dragover(e)} onDrop={(e) => drop(e,i)} key={item.name} draggable="true" data-name={item.name} data-url={item.url} data-parent={null}>
						<i class="fas fa-caret-left arrow arrow-left" onClick={() => unTab(i)}></i>
						<i className="fas fa-caret-right arrow arrow-right" onClick={() => tab(i)}></i>
						<div className='details'>
							<p className='number'>{(i + 1) + '.'}</p>
							<label>Name:</label>
							<input type='text' className='input-name' defaultValue={item.name} onChange={handleChange} />
							<label>URL:</label>
							<input type='text' className='input-url' defaultValue={item.url} onChange={handleChange} />
						</div>
						<i class="fas fa-times delete" onClick={() => deleteNav(i)}></i>
					</div>
				})}
				<div className='item add-item' onClick={newItem}>
					<p>Add new navigation link</p>
				</div>
			</div>
		</React.Fragment>
	)
}

export default () => (
	<Layout>
		<Nav />
	</Layout>
)