import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'
import Submit from './_Components/_API/Submit'

import Products from './_Components/_Shop/Products'
import Orders from './_Components/_Shop/Orders'

const Shop = ({ shop, orders, website }) => {

	const [ loading, setLoading ] = useState(false)
	const [ data, setData ] = useState(shop)
	const [ tab, setTab ] = useState('settings')

	const handleChange = (obj) => {
		setData(prev => ({
			...prev,
			...obj
		}))
	}

	const handleSave = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, data)
			setLoading(false)
		})()
	}

	const handleSaveClose = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, data)
			window.location.replace('/')
		})()
	}

	const handleCancel = () => {
		const prevUrl = window.location.pathname.split('/')
		prevUrl.pop()
		const url = prevUrl.join('/')
		window.location.replace(url)
	}

	const scrollTop = () => {
		document.documentElement.style.scrollBehavior = 'auto'
		setTimeout(() => { window.scrollTo(0,0) })
		setTimeout(() => { document.documentElement.style.scrollBehavior = 'smooth' }, 1000)
	}

	return (
		<div className='page-admin-shop'>
			<div className='block'>
				<h1>Shop</h1>
				<p>Update settings related to your shop and the products appearing on the website.</p>
			</div>
			<div className='block'>
				<div className='tabs'>
					<p onClick={() => setTab('settings')} className={(tab === 'settings') ? 'active' : ''}>Settings</p>
					<p onClick={() => setTab('orders')} className={(tab === 'orders') ? 'active' : ''}>Orders</p>
				</div>
			</div>
			{(tab === 'orders') &&
				<Orders orders={orders} sendChange={handleChange} website={website} />
			}
			<div className='buttons-bottom'>
				<div>
					<p className='save' onClick={handleSave}>Save</p>
					<p className='plain' onClick={handleSaveClose}>Save & Close</p>
					<p className='plain' onClick={handleCancel}>Cancel & Go Back</p>
				</div>
				<div>
					<p className='top' onClick={scrollTop}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M6.101 359.293L25.9 379.092c4.686 4.686 12.284 4.686 16.971 0L224 198.393l181.13 180.698c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 132.908c-4.686-4.686-12.284-4.686-16.971 0L6.101 342.322c-4.687 4.687-4.687 12.285 0 16.971z"/></svg></p>
				</div>
			</div>
			{loading && <Loading />}
		</div>
	)
}

export default () => (
	<Layout>
		<Shop />
	</Layout>
)