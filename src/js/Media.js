import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import Dropzone from './_Components/_Content/Dropzone'
import Call from './_Components/_API/Call'
import Submit from './_Components/_API/Submit'
import Loading from './_Components/Loading'

const Media = ({ images, url, fileUploadHost }) => {

	const [ availableImages, setAvailableImages ] = useState(images)
	const [ loading, setLoading ] = useState(false)
	const [ search, setSearch ] = useState(false)
	const [ grid, setGrid ] = useState('small')

	const copyImage = (img, pdf = false) => {
		const input = document.createElement('textarea')
		input.value = url + '/' + img
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
			setAvailableImages(updatedImages.images)
		})()
	}

	const deleteImg = (img) => {
		if (window.confirm('Are you sure you want to delete this image? Any links to this image will be broken.')) {
			setLoading(true);
			(async function() {
	      await Submit('/admin/upload/delete', {
	      	path: img
	      }, 'POST', fileUploadHost)
	      setTimeout(() => {
	      	reloadContainer()
	      	setLoading(false)
	      },1000)
			})() // eslint-disable-next-line
			setTimeout(() => { // hide loading/reload container after 5 seconds regardless
				if (loading) {
					reloadContainer()
					setLoading(false)
				}
			},5000)
		}
	}

	const audioFileTypes = ['mp3']
	const videoFileTypes = ['mov', 'mp4']
	const miscFileTypes = ['css', 'doc', 'docx', 'gif', 'html', 'pdf', 'tiff', 'txt', 'wav', 'xls', 'xlsx', 'zip']

	return (
		<div className='admin-media-container'>
			<Dropzone reloadContainer={reloadContainer} fileUploadHost={fileUploadHost} />
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
						return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + fileUploadHost + '/static/images/' + img + ')'}}>
							<div className='copy-area' onClick={() => copyImage(img)}/>
							<i className="fas fa-times-circle delete" onClick={() => deleteImg(img)}></i>
							<a className='download-image' href={fileUploadHost + '/static/images/' + img} target='_blank' rel='noreferrer noopener'>
								<i className="fas fa-download" />
							</a>
							{audioFileTypes.includes(img.split('.')[img.split('.').length - 1]) &&
								<div className='media-icon' onClick={() => copyImage(img,true)}>
									<i class="fas fa-volume-up"></i>
								</div>
							}
							{videoFileTypes.includes(img.split('.')[img.split('.').length - 1]) &&
								<div className='media-icon' onClick={() => copyImage(img,true)}>
									<i class="fas fa-video"></i>
								</div>
							}
							{miscFileTypes.includes(img.split('.')[img.split('.').length - 1]) &&
								<div className='media-icon' onClick={() => copyImage(img,true)}>
									<i class="fas fa-file"></i>
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