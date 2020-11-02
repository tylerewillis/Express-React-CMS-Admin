import React, { useState, useEffect } from 'react'
import Dropzone from './Dropzone'
import Call from '../_API/Call'
import { useCookies } from 'react-cookie'

const Images = React.memo(({ con, images, handleChange, role, removeSection, blocksOpen, openBlocks, fileUploadHost }) => {

	const [ cookies ] = useCookies(['role'])
	const [ imagesState, setImagesState ] = useState(con.content)
	const [ imagesView, setImagesView ] = useState([])
	const [ toggle, setToggle ] = useState('none')
	const [ availableImages, setAvailableImages ] = useState(images)
	const [ search, setSearch ] = useState(false)
	const [ grid, setGrid ] = useState('small')

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

	const reloadContainer = () => {
		(async function() {
			const updatedImages = await Call('/get-images-from-directory')
			setAvailableImages(updatedImages.images)
		})()
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

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='acb-images'>
				<div className='acb-images-current'>
					{imagesView.map((img, i) => {
						return <div key={i} name={img} className="acbi-active" style={{backgroundImage: 'url(' + img + ')'}} onClick={(e) => containerToggle(e)}>
							<i className="far fa-times-circle" imgid={i} onClick={e => removeImage(e)}></i>
							<div className='arrows'>
								<i className="fas fa-caret-left" onClick={() => moveLeft(i)}></i>
								<i className="fas fa-caret-right" onClick={() => moveRight(i)}></i>
							</div>
							{(img.substr(img.length - 4) === 'docx' || img.substr(img.length - 4) === '.doc' || img.substr(img.length - 4) === '.pdf') &&
								<p className='media-file-name'>{img.split('/')[img.split('/').length - 1]}</p>
							}
						</div>
					})}
					{imagesView.length === 0 &&
						<p className='select-images' onClick={containerToggle}>Select Images</p>
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
						{availableImages.map((img, i) => {
							if (!search || (search && (img.toLowerCase().includes(search) || img.replace(/-/g, ' ').toLowerCase().includes(search)))) {
								return <div key={img} name={img} className='acbic-single' style={{backgroundImage: 'url(' + fileUploadHost + '/static/images/' + img + ')'}} onClick={e => addImage(e)}>
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
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Images