import React, { useState, useEffect, useReducer } from 'react'
import Layout from './_Components/Layout-Admin'
import Loading from './_Components/Loading'
import Submit from './_Components/_API/Submit'

const Form = ({ content }) => {

	const [ data, setData ] = useState(content)
	const [ loading, setLoading ] = useState(false)
	var groupsData = content[0].groups
	

	const updateState = (add = false, replace = false, replaceWith = false) => {
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
			let inputs = groups[i].querySelectorAll('.input')
			let array = []
			for (let j = 0; j < inputs.length; j++) {
				if (inputs[j].getAttribute('data-type') !== 'submit') {
					array.push({
						type: inputs[j].getAttribute('data-type'),
						label: inputs[j].getAttribute('data-label'),
						required: inputs[j].getAttribute('data-required'),
						placeholder: inputs[j].getAttribute('data-placeholder')
					})
				} else {
					array.push({
						type: inputs[j].getAttribute('data-type'),
						label: inputs[j].getAttribute('data-label')
					})
				}
			}
			if (i === groups.length - 1) {
				if (add && add === 'input') tempGroups.push({inputs:[{type:"input",label:"",required:"false",placeholder:""}]})
			}
			tempGroups.push({
				inputs: array
			})
		}
		if (replace) {
			tempGroups.splice(replace, 0, tempGroups[replaceWith])
			tempGroups.splice(replaceWith, 1)
		}
		setData([{
			details: tempDetails,
			groups: tempGroups
		}])
		groupsData = tempGroups
	}

	const deleteInput = i => {

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
		updateState()
	}

	const addInput = (type) => {
		var html = ''
		var index = document.querySelectorAll('.form-groups .group').length
		if (type === 'input') html = `<div class='group group-${index}' ondragstart='(e) => drag(e,${index})' ondragover='(e) => dragover(e)' ondrop='(e) => dropGroup(e,i)' draggable='true'><i class="fas fa-grip-lines lines"></i><div class='input' data-type='input' data-label='' data-required='false' data-placeholder='' style='width:100%'><p>input</p><label>Label:</label><input class='label-input' type='text' value='' onchange='(e) => handleChange(e)' /><label>Placeholder:</label><input class='placeholder-input' type='text' value='' onchange='handleChange()' /><label>Required:</label><input class='required-input' type='checkbox' checked=false onchange='handleChange()' /><i class="fas fa-times delete" onclick='() => deleteInput()'></i></div>`
		const last = document.querySelector('.form-groups .group-' + (index - 1))
		const temp = last
		last.remove()
		const parent = document.querySelector('.form-groups')
		parent.innerHTML = parent.innerHTML + html
		parent.appendChild(temp)
		updateState()

		// Problem: currently updating groups in state but pulling data from stateless groupsData variable.
		// The problem is that by doing that I can't access the functions and state. I need to relink these
		// back to state somehow
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
				{groupsData.map((group,i) => {
					return (
						<div className={'group group-' + i + ((i === groupsData.length - 1) ? ' group-submit' : '')} key={i} onDragStart={(e) => drag(e,i)} onDragOver={(e) => dragover(e)} onDrop={(e) => dropGroup(e,i)} draggable={(i === groupsData.length - 1) ? "false" : "true"}>
							{(i !== groupsData.length - 1) && <i className="fas fa-grip-lines lines"></i>}
							{group.inputs.map((input, j) => {
								return (
									<div className='input' key={j} data-type={input.type} data-label={input.label} data-required={input.required} data-placeholder={input.placeholder} style={{width: 'calc(' + (100 / group.inputs.length) + '% - ' + ((group.inputs.length > 1) ? '10px' : '0px)')}}>
										<p>{input.type}</p>
										<label>Label:</label>
										<input className='label-input' type='text' defaultValue={input.label} onChange={handleChange} />
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
										{input.type !== 'submit' &&
											<i className="fas fa-times delete" onClick={() => deleteInput()}></i>
										}
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
			<div className='form-buttons'>
				<p>Add:</p>
				<p className='button' onClick={() => addInput('input')}>Input</p>
				<p className='button'>Textarea</p>
				<p className='button'>Select</p>
				<p className='button'>Checkbox</p>
				<p className='button'>Double</p>
				<p className='button'>Triple</p>
			</div>
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
		<Form />
	</Layout>
)