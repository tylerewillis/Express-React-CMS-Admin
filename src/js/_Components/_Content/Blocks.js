import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import Text from './_Blocks/Text'
import PlainText from './_Blocks/PlainText'
import List from './_Blocks/List'
import Dates from './_Blocks/Dates'
import Image from './_Blocks/Image'
import Images from './_Blocks/Images'
import Table from './_Blocks/Table'
import Select from './_Blocks/Select'
import Color from './_Blocks/Color'
import Forms from './_Blocks/Forms'
import Code from './_Blocks/Code'

const Blocks = React.memo(({ con, forms, handleChange, removeSection, blocksOpen, openBlocks, blocksDisplay, setBlocksDisplay, fileUploadHost, availableImages, reloadImages }) => {

	const [ cookies ] = useCookies(['role'])
	const [ data, setData ] = useState(con.content)
	const [ display, setDisplay ] = useState(false)
	const [ helperActive, setHelperActive ] = useState(false)

	const updateValue = async (p, i, obj) => {
		await setData(prevState => {
			data[p].value[i] = obj
			return [...prevState]
		})
		sendChange()
	}

	const sendChange = () => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: data
		})
	}

	const addSection = async () => {
		var newItem = JSON.parse(JSON.stringify(data[data.length - 1]))
		newItem.id = data.length
		newItem.value.forEach((item, i, a) => {
			a[i].value = ''
		})
		var temp = data
		temp.push(newItem)
		await setData(() => {
			return [...temp]
		})
		sendChange()
	}

	const moveUp = async id => {
		if (id > 0) {
			var array = data
			var temp = array[id]
			array.splice(id, 1)
			array.splice(id - 1, 0, temp)
			await setData(() => {
	  		return [...array]
	  	})
	  	sendChange()
	  }
	}

	const moveDown = async id => {
		if (id < data.length - 1) {
			var array = data
			var temp = array[id]
			array.splice(id, 1)
			array.splice(id + 1, 0, temp)
			await setData(() => {
	  		return [...array]
	  	})
	  	sendChange()
	  }
	}

	const removeSect = async i => {
		var temp = data
		temp.splice(i, 1)
		await setData(() => {
			return [...temp]
		})
		sendChange()
	}

	const toggleBlocks = () => {
		setDisplay(!display)
		setBlocksDisplay(!blocksDisplay)
	}

	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	return (
		<div className={(blocksOpen) ? 'ac-block ac-block-blocks active' : 'ac-block ac-block-blocks'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This section allows for multiple elements like lists, blocks and links. Click "Show List" to see and edit the elements.</p>
				</div>
			</h2>
			<p className='acb-description'>{con.description}</p>
			<p className='blocks-toggle' onClick={() => toggleBlocks()}>{(display) ? 'Hide List' : 'Show List'}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"/></svg>
			</p>
			<div className='sections' style={{'display': (display && blocksOpen) ? 'block' : 'none'}}>
				{data.map((section, i) => {
					return (
						<div className='section' key={section.id}>
							<div className='left'>
								<p className='number'>{i + 1}</p>
								<div className='arrows'>
									<i className="fas fa-caret-up" onClick={() => moveUp(i)}></i>
									<i className="fas fa-caret-down" onClick={() => moveDown(i)}></i>
								</div>
							</div>
							<i className="fas fa-times delete" onClick={() => removeSect(i)}/>
							<div className='section-content'>
								{section.value.map((item, index) => {
									switch(item.type) {
										case 'text':
											return <Text key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'plain-text':
											return <PlainText key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'list':
											return <List key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'select':
											return <Select key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'color':
											return <Color key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'dates':
											return <Dates key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'image':
											return	<Image key={index} p={i} i={index} con={item} updateValue={updateValue} availableImages={availableImages} reloadImages={reloadImages} fileUploadHost={fileUploadHost} />
										case 'table':
											return <Table key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'images':
											return <Images key={index} p={i} i={index} con={item} updateValue={updateValue} availableImages={availableImages} reloadImages={reloadImages} fileUploadHost={fileUploadHost} />
										case 'form':
											return <Forms key={index} p={i} i={index} con={item} forms={forms} updateValue={updateValue} />
										case 'code':
											return <Code key={index} p={i} i={index} con={item} updateValue={updateValue} />
										default:
											return null
									}
								})}
							</div>
						</div>
					)
				})}
			</div>
			<p className='add' onClick={addSection} style={{'display': (display && blocksOpen) ? 'block' : 'none'}}><i className="fas fa-plus"></i>Add New</p>
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Blocks