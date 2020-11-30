import React, { useState } from 'react'
import Dropzone from '../Dropzone'
import Call from '../../_API/Call'

const Image = React.memo(({ con, p, i, images, updateValue, fileUploadHost }) => {

	const [ image, setImage ] = useState(con.value)
	const [ toggle, setToggle ] = useState('none')
	const [ availableImages, setAvailableImages ] = useState(images)
	const [ search, setSearch ] = useState(false)
	const [ scrollPos, setScrollPos ] = useState(0)
	const [ grid, setGrid ] = useState('small')
	const [ helperActive, setHelperActive ] = useState(false)

	const updateItem = (e) => {
		var url
		if (!e.target.classList.contains('acbic-single')) url = e.target.closest('.acbic-single').getAttribute('name')
		else url = e.target.getAttribute('name')
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: url
		})
		setImage(url)
		containerToggle()
		window.scrollTo(0, scrollPos)
	}

	const containerToggle = (scroll = false) => {
		const temp = (toggle === 'block') ? 'none' : 'block'
		setToggle(temp)
		if (scroll) setScrollPos(window.scrollY)
	}

	const reloadContainer = () => {
		(async function() {
			const updatedImages = await Call('/get-images-from-directory')
			setAvailableImages(updatedImages.images)
		})()
	}
	
	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	return (
		<div className='item'>
			<h2>{con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is an image element where you can click on the block to open and select from the site's full media catalog.</p>
				</div>
			</h2>
			<div className='acb-image'>
				<div className='acbi-active' style={{backgroundImage: (image.length) ? 'url(' + fileUploadHost + '/static/images/' + image + ')': ''}} onClick={() => containerToggle(true)}>
					{image && (image.substr(image.length - 4) === 'docx' || image.substr(image.length - 4) === '.doc' || image.substr(image.length - 4) === '.pdf') &&
						<p className='media-file-name'>{image}</p>
					}
				</div>
				<div className='acbi-container' style={{display: toggle}}>
					<Dropzone reloadContainer={reloadContainer} fileUploadHost={fileUploadHost} />
					<div className='image-search'>
						<input value={(search) ? search : ''} placeholder='Search' onChange={(e) => setSearch(e.target.value.toLowerCase())} />
						<div className='actions'>
							<i className={(grid === 'small') ? 'fas fa-th active' : 'fas fa-th'} onClick={() => setGrid('small')}></i>
							<i className={(grid === 'large') ? 'fas fa-th-large active' : 'fas fa-th-large'} onClick={() => setGrid('large')}></i>
						</div>
					</div>
					<div className={'image-container image-container-grid-' + grid}>
						{availableImages && availableImages.map((img, i) => {
							if (!search || (search && (img.toLowerCase().includes(search) || img.replace(/-/g, ' ').toLowerCase().includes(search)))) {
								return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + fileUploadHost + '/static/images/' + img + ')'}} onClick={e => updateItem(e)}>
									{(img.substr(img.length - 4) === 'docx' || img.substr(img.length - 4) === '.doc' || img.substr(img.length - 4) === '.pdf') &&
										<div className='media-file-icon'>
											<img src={fileUploadHost + '/static/images/fileicon.png'} alt={'file icon for documents'} />
										</div>
									}
									<p className='media-file-name'>{img}</p>
								</div>
							} else return false
						})}
					</div>
				</div>
			</div>
		</div>
	)
})

export default Image