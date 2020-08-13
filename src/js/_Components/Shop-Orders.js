import React, { useState } from 'react'
import Submit from './_API/Submit'
import Loading from './Loading'

export default React.memo(({ orders }) => {

	const [ loading, setLoading ] = useState(false)

	const toggleShow = (e) => {
		e.target.closest('.order').classList.toggle('active')
	}

	const toggleStatus = (e) => {
		setLoading(true)
		var element
		if (e.target.tagName !== 'DIV') element = e.target.closest('.status')
		else element = e.target

		let status = element.getAttribute('data-status')
		Submit('/shop-status', ({
			status,
			id: element.getAttribute('data-id')
		}))
		setTimeout(() => {
			if (status === 'pending') {
				element.classList.remove('pending')
				element.classList.add('complete')
				element.setAttribute('data-status', 'complete')
			} else if (status === 'complete') {
				element.classList.remove('complete')
				element.classList.add('pending')
				element.setAttribute('data-status', 'pending')
			}
			setLoading(false)
		},1000)
	}

	return (
		<div className='orders'>
			{orders.map((order, i) => {
				return (
					<div className='order' key={i} onClick={(e) => toggleShow(e)}>
						<div className='top'>
							<div className='details'>
								<p>#{order.id}</p>
								<p>{order.date}</p>
								<p>{order.data[3].value} {order.data[4].value}</p>
								<p>${order.data[0].value}</p>
							</div>
							<div className={'status ' + order.data[13].status} data-id={order.id} data-status={order.data[13].status} onClick={(e) => toggleStatus(e)}>
								<svg className='warn' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm42-104c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42zm-81.37-211.401l6.8 136c.319 6.387 5.591 11.401 11.985 11.401h41.17c6.394 0 11.666-5.014 11.985-11.401l6.8-136c.343-6.854-5.122-12.599-11.985-12.599h-54.77c-6.863 0-12.328 5.745-11.985 12.599z"/></svg>
								<svg className='done' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg>
							</div>
						</div>
						<div className='main'>
							<div className='person'>
								<p>Email: <span>{order.data[5].value}</span></p>
								<p>Phone: <span>{order.data[6].value}</span></p>
								<p>Address: <span>{order.data[7].value}</span></p>
								<p>City: <span>{order.data[8].value}</span></p>
								<p>State: <span>{order.data[9].value}</span></p>
								<p>Country: <span>{order.data[10].value}</span></p>
							</div>
							<div className='product'>
								{order.data[12] && order.data[12].items && order.data[12].items.map((item, j) => {
									return (
										<div className='item' key={j}>
											<p>{item.name}</p>
											<p>Size: {item.size}, Quantity: {item.qty}, Price Each: ${item.price}</p>
										</div>
									)
								})}
								<p>Delivery Instructions: <span>{order.data[11].value}</span></p>
							</div>
						</div>
					</div>
				)
			})}
			{loading && <Loading />}
		</div>
	)
})