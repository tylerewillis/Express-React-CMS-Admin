import React, { useState, useEffect } from 'react'
import Dropzone from '../Dropzone'

const Images = React.memo(({ con, p, i, updateValue, role, removeSection, fileUploadHost, availableImages, reloadImages }) => {

	const [ imagesState, setImagesState ] = useState(con.value)
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
		updateItem(state)
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
		updateItem(newState)
		// Update view
		var view = imagesView
		if (id === 0) view.shift()
		else view.splice(id, 1)
		setImagesView(view)
	}

	const updateItem = (state) => {
		updateValue(p,i, {
			type: con.type,
			name: con.name,
			value: state
		})
	}

	const containerToggle = () => {
		const temp = (toggle === 'block') ? 'none' : 'block'
		setToggle(temp)
	}
	
	const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	return (
		<div className='item'>
			<h2>{con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is an multiple image element where you can add and remove images from the site's full media catalog.</p>
				</div>
			</h2>
			<div className='acb-images'>
				<div className='acb-images-current'>
					{imagesView.map((img, i) => {
						return <div key={i} name={img} className="acbi-active" style={{backgroundImage: 'url(' + img + ')'}} onClick={containerToggle}>
							<i className="far fa-times-circle" imgid={i} onClick={e => removeImage(e)}></i>
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
								return <div key={i} name={img} className='acbic-single' style={{backgroundImage: 'url(' + fileUploadHost + '/static/images/' + img + ')'}} onClick={e => addImage(e)}>
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
			{role === 'super' &&
				<i className="fas fa-times" onClick={() => removeSection(con.id)}/>
			}
		</div>
	)
})

export default Images