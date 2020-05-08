import React from 'react'

export default React.memo(({ pricing, sendChange }) => {

	const handleChange = () => {
		var temp = []
		const prices = document.querySelectorAll('.pricing')
		prices.forEach(price => {
			temp.push({
				name: price.querySelector('h4').innerHTML,
				price: price.querySelector('input').value
			})
		})
		sendChange({
			pricing: temp
		})
	}

	return (
		<div className='block'>
			{pricing.map((price, i) => {
				return ( <div className='section pricing' key={i}>
						<h4>{price.name}</h4>
						<p className='desc'>Set the price for the "{price.name}" items.</p>
						<input type='text' defaultValue={price.price} onChange={(e) => handleChange(e, price.name)} />
					</div>
				)
			})}
		</div>
	)
})