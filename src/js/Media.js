import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import Dropzone from './_Components/_Content/Dropzone'
import { API_IMAGE_PATH } from './_Components/_Config'
import Call from './_Components/_API/Call'
import Submit from './_Components/_API/Submit'
import Loading from './_Components/Loading'

const Media = ({ images, url }) => {

	const [ availableImages, setAvailableImages ] = useState(images)
	const [ loading, setLoading ] = useState(false)

	const copyImage = (img) => {
		const input = document.createElement('textarea')
		input.value = url + img
		document.body.appendChild(input)
		input.select()
		document.execCommand('copy')
		document.body.removeChild(input)

		// Confirmation
		document.querySelector('.image-copied-confirmation').classList.add('image-copied-confirmation-active')
		setTimeout(() => {
			document.querySelector('.image-copied-confirmation').classList.remove('image-copied-confirmation-active')
		},2000)
	}

	const reloadContainer = () => {
		(async function() {
			const updatedImages = await Call('/get-images-from-directory')
			setAvailableImages(updatedImages)
		})()
	}

	const deleteImg = (img) => {
		if (window.confirm('Are you sure you want to delete this image? Any links to this image will be broken.')) {
			setLoading(true);
			(async function() {
	      await Submit('/upload/delete', {
	      	path: img
	      })
	      setTimeout(() => {
	      	reloadContainer()
	      	setLoading(false)
	      },1000)
			})() // eslint-disable-next-line
		}
	}

	return (
		<div className='admin-media-container'>
			<Dropzone reloadContainer={reloadContainer} />
			<div className='image-container'>
				{availableImages.map((img, i) => {
					return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + API_IMAGE_PATH + img + ')'}}>
						<div className='copy-area' onClick={() => copyImage(img)}/>
						<i class="fas fa-times-circle delete" onClick={() => deleteImg(img)}></i>
						{(img.substr(img.length - 4) === 'docx' || img.substr(img.length - 4) === '.doc' || img.substr(img.length - 4) === '.pdf') &&
							<p className='media-file-name'>{img}</p>
						}
					</div>
				})}
			</div>
			<div className='image-copied-confirmation'>
				<p>Image source copied to clipboard</p>
			</div>
			{loading && <Loading />}
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