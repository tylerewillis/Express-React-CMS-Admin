import React, { useState, useEffect } from 'react'
import Loading from '../Loading'
import Submit from '../_API/Submit'

export default React.memo(({ products }) => {

	const [ loading, setLoading ] = useState(false)
	const [ data, setData ] = useState({})
	const [ updateName, setUpdateName ] = useState('')
	const [ updateItemNum, setUpdateItemNum ] = useState('')
	const [ updatePrice, setUpdatePrice ] = useState('')
	const [ updateTax, setUpdateTax ] = useState('')
	const [ updateShip, setUpdateShip ] = useState('')
	const [ updateInv, setUpdateInv ] = useState('')

	const scrollTop = () => {
		document.documentElement.style.scrollBehavior = 'auto'
		setTimeout(() => { window.scrollTo(0,0) })
		setTimeout(() => { document.documentElement.style.scrollBehavior = 'smooth' }, 1000)
	}

	const handleChange = () => {
		var temp = []
		document.querySelectorAll('.variation').forEach(variation => {
			if (temp[variation.getAttribute('data-post-id')]) {
				temp[variation.getAttribute('data-post-id')].variations.push({
					index: variation.getAttribute('data-index'),
					1: variation.querySelector('input:nth-child(2)').value,
					2: variation.querySelector('input:nth-child(3)').value,
					3: variation.querySelector('input:nth-child(4)').value,
					4: variation.querySelector('input:nth-child(5)').value,
					5: variation.querySelector('input:nth-child(6)').value,
					6: variation.querySelector('input:nth-child(7)').value
				})
			} else {
				temp[variation.getAttribute('data-post-id')] = {
					variations: [
						{
							index: variation.getAttribute('data-index'),
							1: variation.querySelector('input:nth-child(2)').value,
							2: variation.querySelector('input:nth-child(3)').value,
							3: variation.querySelector('input:nth-child(4)').value,
							4: variation.querySelector('input:nth-child(5)').value,
							5: variation.querySelector('input:nth-child(6)').value,
							6: variation.querySelector('input:nth-child(7)').value
						}
					]
				}
			}
		})
		setData(temp)
	}

	useEffect(() => {
		var temp = []
		document.querySelectorAll('.variation').forEach(variation => {
			if (temp[variation.getAttribute('data-post-id')]) {
				temp[variation.getAttribute('data-post-id')].variations.push({
					index: variation.getAttribute('data-index'),
					1: variation.querySelector('input:nth-child(2)').value,
					2: variation.querySelector('input:nth-child(3)').value,
					3: variation.querySelector('input:nth-child(4)').value,
					4: variation.querySelector('input:nth-child(5)').value,
					5: variation.querySelector('input:nth-child(6)').value,
					6: variation.querySelector('input:nth-child(7)').value
				})
			} else {
				temp[variation.getAttribute('data-post-id')] = {
					variations: [
						{
							index: variation.getAttribute('data-index'),
							1: variation.querySelector('input:nth-child(2)').value,
							2: variation.querySelector('input:nth-child(3)').value,
							3: variation.querySelector('input:nth-child(4)').value,
							4: variation.querySelector('input:nth-child(5)').value,
							5: variation.querySelector('input:nth-child(6)').value,
							6: variation.querySelector('input:nth-child(7)').value
						}
					]
				}
			}
		})
		setData(temp)
	},[])

	//---------------------------
	//- Bulk Updates
	//---------------------------

	const calcPricePerc = (current, val) => {
		return (parseFloat(current) * parseFloat((val.slice(0,-1) / 100))).toFixed(2)
	}

	const calcTaxPerc = (current, val) => {
		return (parseFloat(current) * parseFloat((val.slice(0,-1) / 100))).toFixed(2)
	}

	const updateAll = (index, value) => {
		var newValue = value
		document.querySelectorAll('.variation').forEach(variation => {
			if (value.includes('%')) {
				if (index === 4) newValue = calcPricePerc(variation.querySelector(`input:nth-child(${index})`).value, value)
				else if (index === 5) newValue = calcTaxPerc(variation.querySelector(`input:nth-child(${index - 1})`).value, value)
				else if (index === 6) newValue = calcTaxPerc(variation.querySelector(`input:nth-child(${index - 2})`).value, value)
			}
			variation.querySelector(`input:nth-child(${index})`).value = newValue
		})
		handleChange()
	}

	const updateEmpty = (index, value) => {
		var newValue = value
		document.querySelectorAll('.variation').forEach(variation => {
			if (variation.querySelector(`input:nth-child(${index})`).value.length === 0) {
				if (value.includes('%')) {
					if (index === 4) newValue = calcPricePerc(variation.querySelector(`input:nth-child(${index})`).value, value)
					else if (index === 5) newValue = calcTaxPerc(variation.querySelector(`input:nth-child(${index - 1})`).value, value)
					else if (index === 6) newValue = calcTaxPerc(variation.querySelector(`input:nth-child(${index - 2})`).value, value)
				}
				variation.querySelector(`input:nth-child(${index})`).value = newValue
			}
		})
		handleChange()
	}

	const updateNotEmpty = (index, value) => {
		var newValue = value
		document.querySelectorAll('.variation').forEach(variation => {
			if (variation.querySelector(`input:nth-child(${index})`).value.length > 0) {
				if (value.includes('%')) {
					if (index === 4) newValue = calcPricePerc(variation.querySelector(`input:nth-child(${index})`).value, value)
					else if (index === 5) newValue = calcTaxPerc(variation.querySelector(`input:nth-child(${index - 1})`).value, value)
					else if (index === 6) newValue = calcTaxPerc(variation.querySelector(`input:nth-child(${index - 2})`).value, value)
				}
				variation.querySelector(`input:nth-child(${index})`).value = newValue
			}
		})
		handleChange()
	}

	//---------------------------
	//- Save Buttons
	//---------------------------

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

	return (
		<div className='products'>
			<div className='product labels'>
				<p>Product</p>
				<p>Variation</p>
				<p>Item #</p>
				<p>Price</p>
				<p>Tax Amt</p>
				<p>Shipping</p>
				<p>Inventory</p>
			</div>
			{products.map(product => {
				return (
					<div className='product'>
						{JSON.parse(product.content)[8].content.map((variation, i) => {
							return (
								<div className='variation' data-post-id={product.ID} key={i} data-index={i}>
									<input value={product.name} readOnly />
									<input defaultValue={variation.value[0].value} onChange={handleChange} />
									<input defaultValue={variation.value[1].value} />
									<input defaultValue={parseFloat(variation.value[2].value).toFixed(2)} />
									<input defaultValue={parseFloat(variation.value[3].value).toFixed(2)} />
									<input defaultValue={parseFloat(variation.value[4].value).toFixed(2)} />
									<input defaultValue={variation.value[5].value} />
								</div>
							)
						})}
					</div>
				)
			})}
			<div className='product updates'>
				<p>Bulk Update:</p>
				<div className={(updateName.length) ? 'input active' : 'input'}>
					<input onChange={(e) => setUpdateName(e.target.value)} />
					<div className='actions'>
						<span onClick={() => updateAll(2,updateName)}>Overwrite All</span>
						<span onClick={() => updateEmpty(2,updateName)}>Empty</span>
						<span onClick={() => updateNotEmpty(2,updateName)}>Not Empty</span>
					</div>
				</div>
				<div className={(updateItemNum.length) ? 'input active' : 'input'}>
					<input onChange={(e) => setUpdateItemNum(e.target.value)} />
					<div className='actions'>
						<span onClick={() => updateAll(3,updateItemNum)}>Overwrite All</span>
						<span onClick={() => updateEmpty(3,updateItemNum)}>Empty</span>
						<span onClick={() => updateNotEmpty(3,updateItemNum)}>Not Empty</span>
					</div>
				</div>
				<div className={(updatePrice.length) ? 'input active' : 'input'}>
					<input onChange={(e) => setUpdatePrice(e.target.value)} />
					<div className='actions'>
						<span onClick={() => updateAll(4,updatePrice)}>Overwrite All</span>
						<span onClick={() => updateEmpty(4,updatePrice)}>Empty</span>
						<span onClick={() => updateNotEmpty(4,updatePrice)}>Not Empty</span>
					</div>
				</div>
				<div className={(updateTax.length) ? 'input active' : 'input'}>
					<input onChange={(e) => setUpdateTax(e.target.value)} />
					<div className='actions'>
						<span onClick={() => updateAll(5,updateTax)}>Overwrite All</span>
						<span onClick={() => updateEmpty(5,updateTax)}>Empty</span>
						<span onClick={() => updateNotEmpty(5,updateTax)}>Not Empty</span>
					</div>
				</div>
				<div className={(updateShip.length) ? 'input active' : 'input'}>
					<input onChange={(e) => setUpdateShip(e.target.value)} />
					<div className='actions'>
						<span onClick={() => updateAll(6,updateShip)}>Overwrite All</span>
						<span onClick={() => updateEmpty(6,updateShip)}>Empty</span>
						<span onClick={() => updateNotEmpty(6,updateShip)}>Not Empty</span>
					</div>
				</div>
				<div className={(updateInv.length) ? 'input active' : 'input'}>
					<input onChange={(e) => setUpdateInv(e.target.value)} />
					<div className='actions'>
						<span onClick={() => updateAll(7,updateInv)}>Overwrite All</span>
						<span onClick={() => updateEmpty(7,updateInv)}>Empty</span>
						<span onClick={() => updateNotEmpty(7,updateInv)}>Not Empty</span>
					</div>
				</div>
			</div>
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
})