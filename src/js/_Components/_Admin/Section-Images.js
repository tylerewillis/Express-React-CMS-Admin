import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dropzone from './Dropzone'
import { API_IMAGE_PATH } from '../_Config'
import Call from '../_API/Call'

const Images = React.memo(({ con, images, handleChange, role, removeSection }) => {

	const [ imagesState, setImagesState ] = useState(con.content)
	const [ imagesView, setImagesView ] = useState([])
	const [ toggle, setToggle ] = useState('none')
	const [ availableImages, setAvailableImages ] = useState(images)

	useEffect(() => {
		var imagesArray = imagesState.split(',')
		var newArray = []
		imagesArray.forEach(image => {
			if (image.length) {
				let temp = API_IMAGE_PATH + image
				newArray.push(temp)
			}
		})
		setImagesView(newArray) // eslint-disable-next-line
	},[])

	useEffect(() => {
		if (imagesState.charAt(0) === ',') {
			var state = imagesState
			var stateArray = state.split(',')
			stateArray.shift()
			var newState
			if (stateArray.length > 1) {
				newState = stateArray.join(',')
			} else {
				newState = stateArray[0]
			}
			setImagesState(newState)
		} // eslint-disable-next-line
	},[])

	const addImage = (e) => {
		const url = e.target.getAttribute('name')
		var state = imagesState
		state += (state.length > 0) ? ',' + url : url
		setImagesState(state)
		sendChange(state)
		const imageUrl = e.target.style.backgroundImage.slice(5,-2)
		var view = imagesView
		view.push(imageUrl)
		setImagesView(view)
	}

	const removeImage = (e) => {
		e.stopPropagation()
		const id = e.target.getAttribute('imgid')
		// Update state
		var state = imagesState
		var stateToArray = state.split(',')
		if (id === 0) stateToArray.shift()
		else stateToArray.splice(id, 1)
		var newState = stateToArray.join(',')
		setImagesState(newState)
		sendChange(newState)
		// Update view
		var view = imagesView
		if (id === 0) view.shift()
		else view.splice(id, 1)
		setImagesView(view)
	}

	const sendChange = (state) => {
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: state
		})
	}

	const containerToggle = () => {
		const temp = (toggle === 'block') ? 'none' : 'block'
		setToggle(temp)
	}

	const reloadContainer = () => {
		(async function() {
			const updatedImages = await Call('/admin/get-images-from-directory')
			setAvailableImages(updatedImages)
		})()
	}
	
	return (
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-images'>
				<div className='acb-images-current'>
					{imagesView.map((img, i) => {
						return <div key={i} name={img} className="acbi-active" style={{backgroundImage: 'url(' + ((img.charAt(0) === '/') ? img : '/' + img) + ')'}} onClick={containerToggle}>
							<i className="far fa-times-circle" imgid={i} onClick={e => removeImage(e)}></i>
						</div>
					})}
					{imagesView.length === 0 &&
						<p className='select-images' onClick={containerToggle}>Select Images</p>
					}
				</div>
				<div className='acbi-container' style={{display: toggle}}>
					<Dropzone reloadContainer={reloadContainer} />
					<div className='image-container'>
						{availableImages.map((img, i) => {
							return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + API_IMAGE_PATH + img + ')'}} onClick={e => addImage(e)}/>
						})}
					</div>
				</div>
			</div>
			{role === 'super' &&
				<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
			}
		</div>
	)
})

Images.propTypes = {
	con: PropTypes.array,
	handleChange: PropTypes.func,
	images: PropTypes.array
}

export default Images