import React, { useState, useEffect } from 'react'
import Dropzone from './Dropzone'
import { useCookies } from 'react-cookie'

const Images = React.memo(({ con, handleChange, role, removeSection, blocksOpen, openBlocks, fileUploadHost, availableImages, reloadImages }) => {

	const [ cookies ] = useCookies(['role'])
	const [ imagesState, setImagesState ] = useState(con.content)
	const [ imagesView, setImagesView ] = useState([])
	const [ toggle, setToggle ] = useState('none')
	const [ search, setSearch ] = useState(false)
	const [ grid, setGrid ] = useState('small')
	const [ helperActive, setHelperActive ] = useState(false)

	useEffect(() => {
		var imagesArray = imagesState.split(',')
		var newArray = []
		imagesArray.forEach(image => {
			if (image.length) {
				let temp = fileUploadHost + '/static/images/' + image
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
		var url
		if (!e.target.classList.contains('acbic-single')) url = e.target.closest('.acbic-single').getAttribute('name')
		else url = e.target.getAttribute('name')
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

	const containerToggle = (e) => {
		if (!e.target.closest('.arrows')) {
			const temp = (toggle === 'block') ? 'none' : 'block'
			setToggle(temp)
		}
	}
	
	const moveLeft = async id => {
		if (id > 0) {
			// State
			var array = imagesState.split(',')
			var temp = array[id]
			array.splice(id, 1)
			array.splice(id - 1, 0, temp)
			setImagesState(array.join(','))
	  	sendChange(array)
	  	// Update view
			var view = imagesView
			temp = view[id]
			view.splice(id, 1)
			view.splice(id - 1, 0, temp)
			setImagesView(view)
	  }
	}

	const moveRight = async id => {
		if (id < imagesState.split(',').length - 1) {
			// State
			var array = imagesState.split(',')
			var temp = array[id]
			array.splice(id, 1)
			array.splice(id + 1, 0, temp)
			setImagesState(array.join(','))
	  	sendChange(array)
	  	// Update view
			var view = imagesView
			temp = view[id]
			view.splice(id, 1)
			view.splice(id + 1, 0, temp)
			setImagesView(view)
	  }
	}

	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	const audioFileTypes = ['mp3']
	const videoFileTypes = ['mov', 'mp4']
	const miscFileTypes = ['css', 'doc', 'docx', 'gif', 'html', 'pdf', 'tiff', 'txt', 'wav', 'xls', 'xlsx', 'zip']

	const mediaIcon = (type) => {
		if (audioFileTypes.includes(type)) {
			return <div className='media-icon'><i className="fas fa-volume-up"></i></div>
		} else if (videoFileTypes.includes(type)) {
			return <div className='media-icon'><i className="fas fa-video"></i></div>
		} else if (miscFileTypes.includes(type)) {
			return <div className='media-icon'><i className="fas fa-file"></i></div>
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
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is an multiple image element where you can add and remove images from the site's full media catalog.</p>
				</div>
			</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-images'>
				<div className='acb-images-current'>
					{imagesView.map((img, i) => (
						<div key={i} name={img} className="acbi-active" style={{backgroundImage: 'url(' + img + ')'}} onClick={(e) => containerToggle(e)}>
							<i className="far fa-times-circle" imgid={i} onClick={e => removeImage(e)}></i>
							{mediaIcon(img.split('.')[img.split('.').length - 1])}
							{mediaFileName(img.split('.')[img.split('.').length - 1],img)}
							<div className='arrows'>
								<i className="fas fa-caret-left" onClick={() => moveLeft(i)}></i>
								<i className="fas fa-caret-right" onClick={() => moveRight(i)}></i>
							</div>
						</div>
					))}
					{imagesView.length === 0 &&
						<p className='select-images' onClick={containerToggle}>Select Images</p>
					}
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
								return <div key={img} name={img} className='acbic-single' style={{backgroundImage: 'url(' + fileUploadHost + '/static/images/' + img + ')'}} onClick={e => addImage(e)}>
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

export default Images