import React, { useState } from 'react'
import Dropzone from './Dropzone'
import { useCookies } from 'react-cookie'

const Image = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks, fileUploadHost, availableImages, reloadImages }) => {

	const [ cookies ] = useCookies(['role'])
	const [ image, setImage ] = useState(con.content)
	const [ toggle, setToggle ] = useState('none')
	const [ search, setSearch ] = useState(false)
	const [ scrollPos, setScrollPos ] = useState(0)
	const [ grid, setGrid ] = useState('small')
	const [ helperActive, setHelperActive ] = useState(false)

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
	
	const removeImage = (e) => {
		setImage('')
		sendChange(e)
	}

	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	const audioFileTypes = ['mp3']
	const videoFileTypes = ['mov', 'mp4']
	const miscFileTypes = ['css', 'doc', 'docx', 'gif', 'html', 'pdf', 'tiff', 'txt', 'wav', 'xls', 'xlsx', 'zip']

	const mediaIcon = (type, name = false) => {
		if (audioFileTypes.includes(type)) {
			return <div className='media-icon'><i class="fas fa-volume-up"></i></div>
		} else if (videoFileTypes.includes(type)) {
			return <div className='media-icon'><i class="fas fa-video"></i></div>
		} else if (miscFileTypes.includes(type)) {
			return <div className='media-icon'><i class="fas fa-file"></i></div>
		} else return null
	}

	const mediaFileName = (type, name) => {
		if (audioFileTypes.includes(type)) {
			return <p className='media-file-name'>Audio: {name}</p>
		} else if (videoFileTypes.includes(type)) {
			return <p className='media-file-name'>Video: {name}</p>
		} else if (miscFileTypes.includes(type)) {
			return <p className='media-file-name'>File: {name}</p>
		} else return null
	}

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is an image element where you can click on the block to open and select from the site's full media catalog.</p>
				</div>
			</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-image'>
				<div className='acbi-active' style={{backgroundImage: (image.length) ? 'url(' + fileUploadHost + '/static/images/' + image + ')' : 'none'}} onClick={() => containerToggle(true)}>
					<i className="far fa-times-circle" onClick={removeImage}></i>
					{mediaIcon(image.split('.')[image.split('.').length - 1])}
					{mediaFileName(image.split('.')[image.split('.').length - 1],image)}
				</div>
				<div className='acbi-container' style={{display: toggle}}>
					<Dropzone reloadContainer={reloadImages} fileUploadHost={fileUploadHost} />
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
								return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + fileUploadHost + '/static/images/' + img + ')'}} onClick={e => sendChange(e)}>
									{mediaIcon(img.split('.')[img.split('.').length - 1])}
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