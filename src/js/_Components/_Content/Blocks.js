import React, { useState } from 'react'
import Text from './_Blocks/Text'
import PlainText from './_Blocks/PlainText'
import Dates from './_Blocks/Dates'
import Image from './_Blocks/Image'
import Images from './_Blocks/Images'
import Table from './_Blocks/Table'
import Select from './_Blocks/Select'
import Color from './_Blocks/Color'
import Forms from './_Blocks/Forms'

const Blocks = React.memo(({ con, images, forms, handleChange, removeSection }) => {

	const [ data, setData ] = useState(con.content)
	const [ display, setDisplay ] = useState(false)

	const updateValue = async (p, i, obj) => {
		await setData(prevState => {
			data[p][i] = obj
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
		newItem.forEach((item, i, a) => {
			a[i].value = ''
		})
		var temp = data
		temp.push(newItem)
		await setData(() => {
			return [...temp]
		})
		sendChange()
	}

	const drag = (e, key) => { e.dataTransfer.setData("key", key)}
	const dragover = e => { e.preventDefault() }

	const drop = async (e, key) => {
		e.preventDefault()
  	const movingKey = e.dataTransfer.getData("key")
  	var array = data
  	var temp = array[movingKey]
  	array.splice(movingKey, 1)
  	array.splice(key, 0, temp)
  	await setData(() => {
  		return [...array]
  	})
  	sendChange()
	}

	const removeSect = async i => {
		var temp = data
		temp.splice(i, 1)
		await setData(() => {
			return [...temp]
		})
		sendChange()
	}

	return (
		<div className='ac-block ac-block-blocks'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<p className='blocks-toggle' onClick={() => setDisplay(!display)}>{(display) ? 'Hide List' : 'Show List'}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"/></svg>
			</p>
			<div className='sections' style={{'display': (display) ? 'block' : 'none'}}>
				{data.map((section, i) => {
					return (
						<div className='section' key={i} draggable="true" onDragStart={(e) => drag(e,i)} onDragOver={(e) => dragover(e)} onDrop={(e) => drop(e,i)}>
							<i className="fas fa-grip-lines lines"></i>
							<i className="fas fa-times delete" onClick={() => removeSect(i)}/>
							<div className='section-content'>
								{section.map((item, index) => {
									switch(item.type) {
										case 'text':
											return <Text key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'plain-text':
											return <PlainText key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'select':
											return <Select key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'color':
											return <Color key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'dates':
											return <Dates key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'image':
											return	<Image key={index} p={i} i={index} con={item} updateValue={updateValue} images={images} />
										case 'table':
											return <Table key={index} p={i} i={index} con={item} updateValue={updateValue} />
										case 'images':
											return <Images key={index} p={i} i={index} con={item} updateValue={updateValue} images={images} />
										case 'form':
											return <Forms key={index} p={i} i={index} con={item} forms={forms} updateValue={updateValue} />
										default:
											return null
									}
								})}
							</div>
						</div>
					)
				})}
			</div>
			<p className='add' onClick={addSection} style={{'display': (display) ? 'block' : 'none'}}><i className="fas fa-plus"></i>Add New</p>
			{(con.id !== 0) && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Blocks