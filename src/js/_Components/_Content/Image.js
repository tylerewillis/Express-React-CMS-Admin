import React, { useState } from 'react'
import Dropzone from './Dropzone'
import { API_IMAGE_PATH } from '../_Config'
import Call from '../_API/Call'
import { useCookies } from 'react-cookie'

const Image = React.memo(({ con, images, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])
	const [ image, setImage ] = useState(con.content)
	const [ toggle, setToggle ] = useState('none')
	const [ availableImages, setAvailableImages ] = useState(images)
	const [ search, setSearch ] = useState(false)
	const [ scrollPos, setScrollPos ] = useState(0)
	const [ grid, setGrid ] = useState('small')

	const sendChange = (e) => {
		var url
		if (!e.target.classList.contains('fa-times-circle')) {
			if (!e.target.classList.contains('acbic-single')) url = e.target.closest('.acbic-single').getAttribute('name')
			else url = e.target.getAttribute('name')
		} else url = ''
		handleChange({
			id: con.id,
			type: con.type,
			name: con.name,
			description: con.description,
			content: url
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
			setAvailableImages(updatedImages)
		})()
	}
	
	const removeImage = (e) => {
		setImage('')
		sendChange(e)
	}

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-image'>
				<div className='acbi-active' style={{backgroundImage: (image.length) ? 'url(' + API_IMAGE_PATH + image + ')' : 'none'}} onClick={() => containerToggle(true)}>
					<i className="far fa-times-circle" onClick={removeImage}></i>
					{(image && (image.substr(image.length - 4) === 'docx' || image.substr(image.length - 4) === '.doc' || image.substr(image.length - 4) === '.pdf')) &&
						<p className='media-file-name'>{image}</p>
					}
				</div>
				<div className='acbi-container' style={{display: toggle}}>
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
								return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + API_IMAGE_PATH + img + ')'}} onClick={e => sendChange(e)}>
									{(img.substr(img.length - 4) === 'docx' || img.substr(img.length - 4) === '.doc' || img.substr(img.length - 4) === '.pdf') &&
										<div className='media-file-icon'>
											<img src={API_IMAGE_PATH + 'fileicon.png'} alt={'file icon for documents'} />
										</div>
									}
									<p className='media-file-name'>{img}</p>
								</div>
							} else return false
						})}
					</div>
				</div>
			</div>
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Image