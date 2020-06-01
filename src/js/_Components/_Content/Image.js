import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Dropzone from './Dropzone'
import { API_IMAGE_PATH } from '../_Config'
import Call from '../_API/Call'

const Image = React.memo(({ con, images, handleChange, removeSection }) => {

	const [ image, setImage ] = useState(con.content)
	const [ toggle, setToggle ] = useState('none')
	const [ availableImages, setAvailableImages ] = useState(images)

	const sendChange = (e) => {
		const url = e.target.getAttribute('name')
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: url
		})
		setImage(url)
		containerToggle()
	}

	const containerToggle = () => {
		const temp = (toggle === 'block') ? 'none' : 'block'
		setToggle(temp)
	}

	const reloadContainer = () => {
		(async function() {
			const updatedImages = await Call('/get-images-from-directory')
			setAvailableImages(updatedImages)
		})()
	}
	
	const removeImage = (e) => {
		setImage('')
		sendChange(e)
	}

	return (
		<div className='ac-block'>
			<h2>{con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-image'>
				<div className='acbi-active' style={{backgroundImage: 'url(' + API_IMAGE_PATH + image + ')'}} onClick={containerToggle}>
					<i className="far fa-times-circle" onClick={removeImage}></i>
				</div>
				<div className='acbi-container' style={{display: toggle}}>
					<Dropzone reloadContainer={reloadContainer} />
					<div className='image-container'>
						{availableImages.map((img, i) => {
							return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + API_IMAGE_PATH + img + ')'}} onClick={e => sendChange(e)}/>
						})}
					</div>
				</div>
			</div>
			<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
		</div>
	)
})

Image.propTypes = {
	con: PropTypes.array,
	handleChange: PropTypes.func,
	images: PropTypes.array
}

export default Image