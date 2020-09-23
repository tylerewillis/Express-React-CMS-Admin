import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'
import Submit from './_Components/_API/Submit'
import Groups from './_Components/_Form/Groups'
import Buttons from './_Components/_Form/Buttons'
import Details from './_Components/_Form/Details'

const Form = ({ post, content }) => {

	const [ data, setData ] = useState(content)
	const [ loading, setLoading ] = useState(false)
	const pathArray = window.location.pathname.split('/')
	const path = pathArray[pathArray.length - 2]

	//--------------------------
	//- Update State
	//--------------------------

	const updateState = (add = false, replace = false, replaceWith = false, deleteEl = false) => {
		var tempDetails = []
		var tempGroups = []
		const details = document.querySelectorAll('.form-details .detail')
		for (let i = 0; i < details.length; i++) {
			if (details[i].classList.contains('detail-email-message')) {
				tempDetails.push({
					type: 'text',
					name: details[i].querySelector('h2').textContent,
					description: details[i].querySelector('p').textContent,
					value: details[i].querySelector('.ql-editor').innerHTML,
				})
			} else if (details[i].querySelector('input')) {
				tempDetails.push({
					type: 'plain-text',
					name: details[i].querySelector('h2').textContent,
					description: details[i].querySelector('p').textContent,
					value: details[i].querySelector('input').value
				})
			} else if (details[i].querySelector('select')) {
				tempDetails.push({
					type: 'select',
					name: details[i].querySelector('h2').textContent,
					description: details[i].querySelector('p').textContent,
					value: details[i].querySelector('select').value,
					options: details[i].getAttribute('data-options')
				})
			}
		}
		const groups = document.querySelectorAll('.form-groups .group')
		for (let i = 0; i < groups.length; i++) {
			if (!deleteEl || (deleteEl && !groups[i].classList.contains('group-' + deleteEl))) {
				let inputs = groups[i].querySelectorAll('.input')
				let array = []
				for (let j = 0; j < inputs.length; j++) {
					if (inputs[j].getAttribute('data-type') === 'submit') {
						array.push({
							id: inputs[j].getAttribute('data-id'),
							type: inputs[j].getAttribute('data-type'),
							label: inputs[j].getAttribute('data-label')
						})
					} else if (inputs[j].getAttribute('data-type') === 'select') {
						array.push({
							id: inputs[j].getAttribute('data-id'),
							type: inputs[j].getAttribute('data-type'),
							label: inputs[j].getAttribute('data-label'),
							required: inputs[j].getAttribute('data-required'),
							placeholder: inputs[j].getAttribute('data-placeholder'),
							options: inputs[j].getAttribute('data-options')
						})
					} else if (inputs[j].getAttribute('data-type') === 'payment') {
						array.push({
							id: inputs[j].getAttribute('data-id'),
							type: inputs[j].getAttribute('data-type'),
							paymentValue: inputs[j].getAttribute('data-payment-value'),
							paymentValueLink: inputs[j].getAttribute('data-payment-value-link')
						})
					} else if (inputs[j].getAttribute('data-type') === 'text-block') {
						array.push({
							id: inputs[j].getAttribute('data-id'),
							type: inputs[j].getAttribute('data-type'),
							text: inputs[j].getAttribute('data-text')
						})
					} else {
						array.push({
							id: inputs[j].getAttribute('data-id'),
							type: inputs[j].getAttribute('data-type'),
							label: inputs[j].getAttribute('data-label'),
							required: inputs[j].getAttribute('data-required'),
							placeholder: inputs[j].getAttribute('data-placeholder')
						})
					}
				}
				// Add new
				if (i === groups.length - 1) {
					let id = Math.floor(Math.random() * 100)
					if (add && add === 'input') tempGroups.push({id, inputs:[{id: String(id) + "0", type:"input",label:"",required:"false",placeholder:""}]})
					else if (add && add === 'textarea') tempGroups.push({id, inputs:[{id: String(id) + "0", type:"textarea",label:"",required:"false",placeholder:""}]})
					else if (add && add === 'select') tempGroups.push({id, inputs:[{id: String(id) + "0", type:"select",label:"",required:"false",placeholder:"",options:"option 1, option 2, ..."}]})
					else if (add && add === 'checkbox') tempGroups.push({id, inputs:[{id: String(id) + "0", type:"checkbox",label:"",required:"false",placeholder:""}]})
					else if (add && add === 'double') tempGroups.push({id, inputs:[{id: String(id) + "0", type:"input",label:"",required:"false",placeholder:""},{id: String(id) + "1", type:"input",label:"",required:"false",placeholder:""}]})
					else if (add && add === 'payment') tempGroups.push({id, inputs:[{id: String(id) + "0", type:"payment",paymentValue:"0",paymentValueLink:""}]})
					else if (add && add === 'text-block') tempGroups.push({id, inputs:[{id: String(id) + "0", type:"text-block",text:""}]})
				}
				tempGroups.push({
					id: groups[i].getAttribute('data-id'),
					inputs: array
				})
			}
		}
		// Swap
		if (replace) {
			tempGroups.splice(replace, 0, tempGroups[replaceWith])
			tempGroups.splice(replaceWith, 1)
		}
		setData([{
			details: tempDetails,
			groups: tempGroups
		}])
	}

	//--------------------------
	//- Drag
	//--------------------------

	const drag = (e, key) => { e.dataTransfer.setData("key", key)}
	const dragover = e => { e.preventDefault() }

	const dropGroup = (e, key) => {
		e.preventDefault()
  	const movingKey = e.dataTransfer.getData("key")
  	document.querySelector('.form-groups').insertBefore(document.querySelector(`.group-${movingKey}`), document.querySelector(`.group-${key}`))
		updateState()
	}

	const handleDetailsChange = (e) => {
		console.log(e.target.innerHTML)
		updateState()
	}

	//--------------------------
	//- Input Change
	//--------------------------

	const handleChange = (e) => {
		const el = e.target.closest('.input')
		console.log(el.getAttribute('data-payment-value'))
		if (el.querySelector('.label-input')) el.setAttribute('data-label', el.querySelector('.label-input').value)
		if (el.getAttribute('data-required')) el.setAttribute('data-required', (el.getAttribute('data-required') === 'true') ? 'false' : 'true')
		if (el.querySelector('.placeholder-input')) el.setAttribute('data-placeholder', el.querySelector('.placeholder-input').value)
		if (el.querySelector('.options-input')) el.setAttribute('data-options', el.querySelector('.options-input').value)
		if (el.querySelector('.payment-value-input')) el.setAttribute('data-payment-value', el.querySelector('.payment-value-input').value)
		if (el.querySelector('.payment-value-link-input')) el.setAttribute('data-payment-value-link', el.querySelector('.payment-value-link-input').value)
		if (el.querySelector('.text-input')) el.setAttribute('data-text', el.querySelector('.text-input').value)
		updateState()
	}

	//--------------------------
	//- Add
	//--------------------------

	const addInput = (type) => {
		updateState(type)
	}

	//--------------------------
	//- Delete
	//--------------------------

	const deleteGroup = i => {
		updateState(false, false, false, String(i))
	}

	//--------------------------
	//- Save/Delete Form
	//--------------------------

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
			const prevUrl = window.location.pathname.split('/')
			prevUrl.pop()
			const url = prevUrl.join('/')
			window.location.replace(url)
		})()
	}

	const handleSaveCopy = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname + '/copy', data)
			const prevUrl = window.location.pathname.split('/')
			prevUrl.pop()
			const url = prevUrl.join('/')
			window.location.replace(url)
		})()
	}

	const handleCancel = () => {
		const prevUrl = window.location.pathname.split('/')
		prevUrl.pop()
		const url = prevUrl.join('/')
		window.location.replace(url)
	}

	const handleDelete = (id) => {
		if (window.confirm('Are you sure that you want to delete this form?')) {
			window.location.replace('/' + path + '/delete/' + id)
		}
	}

	const scrollTop = () => {
		document.documentElement.style.scrollBehavior = 'auto'
		setTimeout(() => { window.scrollTo(0,0) })
		setTimeout(() => { document.documentElement.style.scrollBehavior = 'smooth' }, 1000)
	}

	return (
		<React.Fragment>
			<Details data={data} handleDetailsChange={handleDetailsChange} />
			<Groups data={data} drag={drag} dragover={dragover} dropGroup={dropGroup} deleteGroup={deleteGroup} handleChange={handleChange} />
			<Buttons addInput={addInput} />
			<div className='buttons-bottom'>
				<div>
					<p className='save' onClick={handleSave}>Save</p>
					<p className='plain' onClick={handleSaveClose}>Save & Close</p>
					<p className='plain' onClick={handleSaveCopy}>Save as Copy</p>
					<p className='plain' onClick={handleCancel}>Cancel & Go Back</p>
					<p className='plain' onClick={() => handleDelete(post.ID)}>Delete Form</p>
				</div>
				<div>
					<p className='top' onClick={scrollTop}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M6.101 359.293L25.9 379.092c4.686 4.686 12.284 4.686 16.971 0L224 198.393l181.13 180.698c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 132.908c-4.686-4.686-12.284-4.686-16.971 0L6.101 342.322c-4.687 4.687-4.687 12.285 0 16.971z"/></svg></p>
				</div>
			</div>
			{loading && <Loading />}
		</React.Fragment>
	)
}

export default () => (
	<Layout>
		<Form />
	</Layout>
)