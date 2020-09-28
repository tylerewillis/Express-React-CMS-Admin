import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default React.memo(({ data, sendChange }) => {

	const handleCatChange = (e) => {
		sendChange({
			categories: e.target.value
		})
	}

	const handlePriceChange = () => {
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

	const handleShipChange = () => {
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

	const handleTextChange = () => {
		var temp = []
		const desc = document.querySelectorAll('.descr')
		desc.forEach(des => {
			temp.push({
				name: des.querySelector('h4').innerHTML,
				html: des.querySelector('.ql-editor').innerHTML
			})
		})
		sendChange({
			description: temp
		})
	}

	const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ]
  }
 
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'script',
    'align',
    'link'
  ]

	return (
		<div className='block'>
			<div className='section'>
				<h4>Categories</h4>
				<p className='desc'>List your product categories in order of priority separated by commas.</p>
				<input type='text' defaultValue={data.categories} onChange={handleCatChange} />
			</div>
			<h3>Global Pricing</h3>
			{data.pricing.map((price, i) => {
				return ( <div className='section section-multiple' key={i}>
						<h4 style={{display: 'none'}}>{price.name}</h4>
						<p className='desc'>{price.name}</p>
						<input type='text' defaultValue={price.price} onChange={(e) => handlePriceChange(e, price.name)} />
					</div>
				)
			})}
			<h3>Global Shipping</h3>
			{data.shipping.map((price, i) => {
				return ( <div className='section section-multiple' key={i}>
					<h4 style={{display: 'none'}}>{price.name}</h4>
						<p className='desc'>{price.name}</p>
						<input type='text' defaultValue={price.price} onChange={(e) => handleShipChange(e, price.name)} />
					</div>
				)
			})}
			<h3>Global Descriptions</h3>
			{data.description.map((desc, i) => {
				return ( <div className='section descr' key={i}>
						<h4>{desc.name}</h4>
						<p className='desc'>Set the default description for the product {desc.name.toLowerCase()}.</p>
						<div className='atbs-editor'>
							<ReactQuill defaultValue={desc.html} onChange={handleTextChange} modules={modules} formats={formats} />
						</div>
					</div>
				)
			})}
		</div>
	)
})