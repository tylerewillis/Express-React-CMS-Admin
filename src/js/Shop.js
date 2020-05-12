import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'
import Submit from './_Components/_API/Submit'

import Categories from './_Components/Shop-Categories'
import Pricing from './_Components/Shop-Pricing'
import Shipping from './_Components/Shop-Shipping'
import Description from './_Components/Shop-Description'
import Orders from './_Components/Shop-Orders'

const Shop = ({ shop, orders }) => {

	const [ loading, setLoading ] = useState(false)
	const [ data, setData ] = useState(shop)
	const [ tab, setTab ] = useState('categories')

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

	return (
		<React.Fragment>
			<div className='block'>
				<h1>Shop</h1>
				<p>Update settings related to your shop and the products appearing on the website.</p>
				<div className='tabs'>
					<p onClick={() => setTab('categories')} className={(tab === 'categories') ? 'active' : ''}>Categories</p>
					<p onClick={() => setTab('pricing')} className={(tab === 'pricing') ? 'active' : ''}>Pricing</p>
					<p onClick={() => setTab('shipping')} className={(tab === 'shipping') ? 'active' : ''}>Shipping</p>
					<p onClick={() => setTab('description')} className={(tab === 'description') ? 'active' : ''}>Descriptions</p>
					<p onClick={() => setTab('orders')} className={(tab === 'orders') ? 'active' : ''}>Orders</p>
				</div>
			</div>
			{(tab === 'categories') &&
				<Categories categories={data.categories} sendChange={handleChange} />
			}
			{(tab === 'pricing') &&
				<Pricing pricing={data.pricing} sendChange={handleChange} />
			}
			{(tab === 'shipping') &&
				<Shipping shipping={data.shipping} sendChange={handleChange} />
			}
			{(tab === 'description') &&
				<Description description={data.description} sendChange={handleChange} />
			}
			{(tab === 'orders') &&
				<Orders orders={orders} sendChange={handleChange} />
			}
			<div className='buttons-bottom'>
				<p className='save' onClick={handleSave}>Save</p>
				<p className='save save-close' onClick={handleSaveClose}>Save & Close</p>
			</div>
			{loading && <Loading />}
		</React.Fragment>
	)
}

export default () => (
	<Layout>
		<Shop />
	</Layout>
)