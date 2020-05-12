import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'
import Submit from './_Components/_API/Submit'

const Form = ({ post, content }) => {

	const [ data, setData ] = useState(content)
	const [ loading, setLoading ] = useState(false)
	const pathArray = window.location.pathname.split('/')
	const path = pathArray[pathArray.length - 2]

	const updateState = (add = false, replace = false, replaceWith = false, deleteEl = false) => {
		var tempDetails = []
		var tempGroups = []
		const details = document.querySelectorAll('.form-details .detail')
		for (let i = 0; i < details.length; i++) {
			tempDetails.push({
				name: details[i].querySelector('h2').textContent,
				description: details[i].querySelector('p').textContent,
				value: details[i].querySelector('input').value
			})
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

	const drag = (e, key) => { e.dataTransfer.setData("key", key)}
	const dragover = e => { e.preventDefault() }

	const dropGroup = (e, key) => {
		e.preventDefault()
  	const movingKey = e.dataTransfer.getData("key")
  	document.querySelector('.form-groups').insertBefore(document.querySelector(`.group-${movingKey}`), document.querySelector(`.group-${key}`))
		updateState()
	}

	const handleDetailsChange = (e) => {
		updateState()
	}

	const handleChange = (e) => {
		const el = e.target.closest('.input')
		el.setAttribute('data-label', el.querySelector('.label-input').value)
		if (el.getAttribute('data-required')) el.setAttribute('data-required', (el.getAttribute('data-required') === 'true') ? 'false' : 'true')
		if (el.getAttribute('data-placeholder')) el.setAttribute('data-placeholder', el.querySelector('.placeholder-input').value)
		if (el.getAttribute('data-options')) el.setAttribute('data-options', el.querySelector('.options-input').value)
		updateState()
	}

	const addInput = (type) => {
		updateState(type)
	}

	const deleteGroup = i => {
		updateState(false, false, false, String(i))
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

	return (
		<React.Fragment>
			<div className='block'>
				<h1>Form: {data[0].details[0].value}</h1>
				<div className='form-details'>
					{data[0].details.map((det,i) => {
						return (
							<div className='detail' key={i}>
								<h2>{det.name}</h2>
								<p>{det.description}</p>
								<input type='text' defaultValue={det.value} onChange={handleDetailsChange} />
							</div>
						)
					})}
				</div>
			</div>
			<div className='form-groups'>
				{data[0].groups.map((group,i) => {
					return (
						<div className={'group group-' + i + ((i === data[0].groups.length - 1) ? ' group-submit' : '')} key={group.id} data-id={group.id} onDragStart={(e) => drag(e,i)} onDragOver={(e) => dragover(e)} onDrop={(e) => dropGroup(e,i)} draggable={(i === data[0].groups.length - 1) ? "false" : "true"}>
							{(i !== data[0].groups.length - 1) && <i className="fas fa-grip-lines lines"></i>}
							{group.inputs.map((input, j) => {
								return (
									<div className='input' key={input.id} data-id={input.id} data-type={input.type} data-label={input.label} data-required={input.required} data-placeholder={input.placeholder} data-options={input.options} style={{width: 'calc(' + (100 / group.inputs.length) + '% - ' + ((group.inputs.length > 1) ? '10px' : '0px)')}}>
										<p>{input.type}</p>
										<label>Label:</label>
										<input className='label-input' type='text' defaultValue={input.label} onChange={handleChange} />
										{input.hasOwnProperty('options') &&
											<React.Fragment>
												<label>Options:</label>
												<input className='options-input' type='text' defaultValue={input.options} onChange={handleChange} />
											</React.Fragment>
										}
										{input.hasOwnProperty('placeholder') &&
											<React.Fragment>
												<label>Placeholder:</label>
												<input className='placeholder-input' type='text' defaultValue={input.placeholder} onChange={handleChange} />
											</React.Fragment>
										}
										{input.hasOwnProperty('required') &&
											<React.Fragment>
												<label>Required:</label>
												<input className='required-input' type='checkbox' defaultChecked={(input.required === 'true') ? true : false} onChange={handleChange} />
											</React.Fragment>
										}
									</div>
								)
							})}
							{i !== data[0].groups.length - 1 &&
								<i className="fas fa-times delete" onClick={() => deleteGroup(i)}></i>
							}
						</div>
					)
				})}
			</div>
			<div className='form-buttons'>
				<p>Add:</p>
				<p className='button' onClick={() => addInput('input')}>Input</p>
				<p className='button' onClick={() => addInput('textarea')}>Textarea</p>
				<p className='button' onClick={() => addInput('select')}>Select</p>
				<p className='button' onClick={() => addInput('checkbox')}>Checkbox</p>
				<p className='button' onClick={() => addInput('double')}>Double</p>
			</div>
			<div className='buttons-bottom'>
				<div>
					<p className='save' onClick={handleSave}>Save</p>
					<p className='save save-close' onClick={handleSaveClose}>Save & Close</p>
				</div>
				<div>
					<p className='save cancel' onClick={handleCancel}>Cancel & Go Back</p>
					<p className='save delete' onClick={() => handleDelete(post.ID)}>Delete Form</p>
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