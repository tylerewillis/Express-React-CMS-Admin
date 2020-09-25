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
	const [ search, setSearch ] = useState(false)
	const [ grid, setGrid ] = useState('small')

	const copyImage = (img, pdf = false) => {
		const input = document.createElement('textarea')
		input.value = url + img
		document.body.appendChild(input)
		input.select()
		document.execCommand('copy')
		document.body.removeChild(input)

		if (pdf) document.querySelector('.image-copied-confirmation p').textContent = 'Document path copied to clipboard'
		else document.querySelector('.image-copied-confirmation p').textContent = 'Image path copied to clipboard'

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
			<div className='image-search'>
				<input value={(search) ? search : ''} placeholder='Search' onChange={(e) => setSearch(e.target.value.toLowerCase())} />
				<div className='actions'>
					<i className={(grid === 'small') ? 'fas fa-th active' : 'fas fa-th'} onClick={() => setGrid('small')}></i>
					<i className={(grid === 'large') ? 'fas fa-th-large active' : 'fas fa-th-large'} onClick={() => setGrid('large')}></i>
				</div>
			</div>
			<div className={'image-container image-container-grid-' + grid}>
				{availableImages.map((img, i) => {
					if (!search || (search && (img.toLowerCase().includes(search) || img.replace(/-/g, ' ').toLowerCase().includes(search)))) {
						return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + API_IMAGE_PATH + img + ')'}}>
							<div className='copy-area' onClick={() => copyImage(img)}/>
							<i class="fas fa-times-circle delete" onClick={() => deleteImg(img)}></i>
							{(img.substr(img.length - 4) === 'docx' || img.substr(img.length - 4) === '.doc' || img.substr(img.length - 4) === '.pdf') &&
								<div className='media-file-icon' onClick={() => copyImage(img,true)}>
									<img src={API_IMAGE_PATH + 'fileicon.png'} alt={'file icon for documents'} />
								</div>
							}
							<p className='media-file-name' onClick={() => copyImage(img,true)}>{img}</p>
						</div>
					} else return false
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