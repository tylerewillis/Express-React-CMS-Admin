import React, { useState } from 'react'
import Text from './_Blocks/Text'
import PlainText from './_Blocks/PlainText'
import Dates from './_Blocks/Dates'
import Image from './_Blocks/Image'
import Images from './_Blocks/Images'
import Table from './_Blocks/Table'
import Forms from './_Blocks/Forms'

const Blocks = React.memo(({ con, images, forms, handleChange, removeSection }) => {

	const [ data, setData ] = useState(con.content)

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
			<div className='sections'>
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
			<p className='add' onClick={addSection}><i className="fas fa-plus"></i>Add New</p>
			{(con.id !== 0) && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Blocks