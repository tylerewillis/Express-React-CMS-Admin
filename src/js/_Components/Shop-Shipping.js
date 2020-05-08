import React from 'react'

export default React.memo(({ shipping, sendChange }) => {

	const handleChange = () => {
		var temp = []
		const prices = document.querySelectorAll('.shipping')
		prices.forEach(price => {
			temp.push({
				name: price.querySelector('h4').innerHTML,
				price: price.querySelector('input').value
			})
		})
		sendChange({
			shipping: temp
		})
	}

	return (
		<div className='block'>
			{shipping.map((price, i) => {
				return ( <div className='section shipping' key={i}>
						<h4>{price.name}</h4>
						<p className='desc'>Set the shipping price for the "{price.name}" items.</p>
						<input type='text' defaultValue={price.price} onChange={(e) => handleChange(e, price.name)} />
					</div>
				)
			})}
		</div>
	)
})