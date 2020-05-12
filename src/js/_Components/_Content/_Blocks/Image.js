import React, { useState } from 'react'
import Dropzone from '../Dropzone'
import { API_IMAGE_PATH } from '../../_Config'
import Call from '../../_API/Call'

const Image = React.memo(({ con, p, i, images, updateValue }) => {

	const [ image, setImage ] = useState(con.value)
	const [ toggle, setToggle ] = useState('none')
	const [ availableImages, setAvailableImages ] = useState(images)

	const updateItem = (e) => {
		const url = e.target.getAttribute('name')
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: url
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
	
	return (
		<div className='item'>
			<h2>{con.name}</h2>
			<div className='acb-image'>
				<div className='acbi-active' style={{backgroundImage: 'url(' + API_IMAGE_PATH + image + ')'}} onClick={containerToggle} />
				<div className='acbi-container' style={{display: toggle}}>
					<Dropzone reloadContainer={reloadContainer} />
					<div className='image-container'>
						{availableImages.map((img, i) => {
							return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + API_IMAGE_PATH + img + ')'}} onClick={e => updateItem(e)}/>
						})}
					</div>
				</div>
			</div>
		</div>
	)
})

export default Image