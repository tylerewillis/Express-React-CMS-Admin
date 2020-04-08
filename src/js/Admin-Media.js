import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout-Admin'
import Dropzone from './_Components/_Admin/Dropzone'
import { API_IMAGE_PATH } from './_Components/_Config'
import Call from './_Components/_API/Call'

const Media = ({ images, url }) => {

	const [ availableImages, setAvailableImages ] = useState(images)

	const copyImage = (img) => {
		const input = document.createElement('textarea')
		input.value = url + img
		document.body.appendChild(input)
		input.select()
		document.execCommand('copy')
		document.body.removeChild(input)
	}

	const reloadContainer = () => {
		(async function() {
			const updatedImages = await Call('/admin/get-images-from-directory')
			setAvailableImages(updatedImages)
		})()
	}

	return (
		<div className='admin-media-container'>
			<Dropzone reloadContainer={reloadContainer} />
			<div className='image-container'>
				{availableImages.map((img, i) => {
					return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + API_IMAGE_PATH + img + ')'}} onClick={() => copyImage(img)} />
				})}
			</div>
		</div>
	)
}

Media.propTypes = {
	images: PropTypes.array,
	url: PropTypes.string
}

export default () => (
	<Layout>
		<Media />
	</Layout>
)