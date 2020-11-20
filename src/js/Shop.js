import React, { useState } from 'react'
import Layout from './_Components/Layout'

import Products from './_Components/_Shop/Products'
import Orders from './_Components/_Shop/Orders'

const Shop = ({ shop, orders, products, website }) => {

	const [ tab, setTab ] = useState('orders')

	return (
		<div className='page-admin-shop'>
			<div className='block'>
				<h1>Shop</h1>
				<p>Update settings related to your shop and the products appearing on the website.</p>
			</div>
			<div className='block'>
				<div className='tabs'>
					<p onClick={() => setTab('orders')} className={(tab === 'orders') ? 'active' : ''}>Orders</p>
					<p onClick={() => setTab('products')} className={(tab === 'products') ? 'active' : ''}>Products</p>
				</div>
			</div>
			{(tab === 'products') &&
				<Products products={products} website={website} />
			}
			{(tab === 'orders') &&
				<Orders orders={orders} website={website} />
			}
		</div>
	)
}

export default () => (
	<Layout>
		<Shop />
	</Layout>
)