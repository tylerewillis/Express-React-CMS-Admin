import React, { useState } from 'react'
import Layout from './_Components/Layout-Admin'

const Nav = React.memo(({ nav, posts }) => {

	const [ order, setOrder ] = useState(nav)

	const updateState = () => {
		var newState = []
		document.querySelectorAll('.nav .item').forEach(item => {
			newState.push({
				name: item.getAttribute('data-name'),
				url: item.getAttribute('data-url'),
				parent: item.getAttribute('data-parent')
			})
		})
		setOrder(newState)
	}

	const drag = (e, key) => {
		e.dataTransfer.setData("key", key)
	}

	const dragover = e => {
		e.preventDefault()
	}

	const drop = (e, key) => {
		e.preventDefault()
		// Update page
  	const movingKey = e.dataTransfer.getData("key")
  	document.querySelector(`.item-${movingKey}`).style.marginLeft = false
  	document.querySelector('.nav').insertBefore(document.querySelector(`.item-${movingKey}`), document.querySelector(`.item-${key}`))
		updateState()
	}

	const tab = key => {
		// If not first element
		if (key !== 0) {
			// If subsequent element is not element's parent
			const prev = document.querySelector('.item-' + (key - 1) + ' .name').textContent
			const el = document.querySelector('.item-' + key)
			if (el.getAttribute('data-parent') !== prev) {
				// Tab
				el.style.marginLeft = (!el.style.marginLeft) ? '50px' : '100px'
				// Set parent
				el.setAttribute('data-parent', prev)
				updateState()
			}
		}
	}

	const unTab = key => {
		// If not first element
		if (key !== 0) {
			// If subsequent element is not element's parent
			const prev = document.querySelector('.item-' + (key - 1) + ' .name').textContent
			const el = document.querySelector('.item-' + key)
			if (el.getAttribute('data-parent') !== prev) {
				// Tab
				el.style.marginLeft = (el.style.marginLeft === 'text') ? '50px' : '100px'
				// Set parent
				el.setAttribute('data-parent', prev)
			}
		}
	}

	return (
		<React.Fragment>
			<div className='block'>
				<h1>Site Navigation</h1>
				<p>Drag and drop the menu items below to reorder how they appear on the website. To insert the item as a sub-link, drag under the parent link and indent before dropping.</p>
			</div>
			<div className='nav'>
				{order.map((item, i) => {
					return <div className={'item item-' + i} onDragStart={(e) => drag(e,i)} onDragOver={(e) => dragover(e)} onDrop={(e) => drop(e,i)} key={i} draggable="true" data-name={item.name} data-url={item.url} data-parent={null}>
						<i class="fas fa-caret-left arrow arrow-left" onClick={() => unTab(i)}></i>
						<div className='details'>
							<p className='number'>{(i + 1) + '.'}</p>
							<p className='name'>{item.name}</p>
						</div>
						<i class="fas fa-caret-right arrow arrow-right" onClick={() => tab(i)}></i>
					</div>
				})}
			</div>
		</React.Fragment>
	)
})

export default () => (
	<Layout>
		<Nav />
	</Layout>
)