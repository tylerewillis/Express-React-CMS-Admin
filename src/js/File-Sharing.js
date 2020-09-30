import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Dropzone from './_Components/_Files/Dropzone'
import { API_PATH } from './_Components/_Config'
import Call from './_Components/_API/Call'
import Submit from './_Components/_API/Submit'
import Loading from './_Components/Loading'

const FileSharing = ({ settings, files, url }) => {

	const [ availFiles, setAvailFiles ] = useState(files)
	const [ loading, setLoading ] = useState(false)
	const [ search, setSearch ] = useState(false)
	const [ fileName, setFileName ] = useState('')
	const [ yourName, setYourName ] = useState('')
	const [ accessLevel, setAccessLevel ] = useState(settings.access_levels[0].code)
	const [ accessLevels, setAccessLevels ] = useState(settings.access_levels)
	const [ availableUntil, setAvailableUntil ] = useState('')
	const [ allowUploads, setAllowUploads ] = useState(settings.uploads)
	const [ showSettings, setShowSettings ] = useState(false)
	const [ showAddNew, setShowAddNew ] = useState(false)
	const [ fileNames, setFileNames ] = useState([])

	const uploadedFileNames = files => {
		setFileNames(files)
	}

	const reloadContainer = () => {
		(async function() {
			const updatedFiles = await Call('/get-files-from-directory')
			setAvailFiles(updatedFiles)
		})()
	}

	const deleteFile = id => {
		
	}

	const transferFile = id => {
		
	}

	const downloadFile = id => {

	}

	const uploadFiles = () => {
		const data = {
			name: fileName,
			path: fileNames,
			uploaded_by: yourName,
			access: accessLevel,
			available_until: availableUntil
		}

		setLoading(true);
		(async function() {
      await Submit('/file-share/file-details', data)
      setTimeout(() => {
      	reloadContainer()
      	setLoading(false)
      },1000)
		})() // eslint-disable-next-line
	}

	const updateLevels = () => {
		let temp = []
		document.querySelectorAll('.level').forEach(lev => {
			temp.push({
				id: lev.getAttribute('data-id'),
				name: lev.querySelector('.level-name').value,
				code: lev.querySelector('.level-code').value
			})
		})
		setAccessLevels(temp)
	}

	const makeId = length => {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result
	}

	const addLevel = () => {
		let temp = accessLevels
		temp.push({id: temp.length, name: '', code: makeId(10)})
		setAccessLevels([...temp])
	}

	const deleteLevel = id => {
		if (window.confirm('Are you sure that you want to delete this file access level?')) {
			let temp = accessLevels
			temp.splice(id, 1)
			setAccessLevels([...temp])
		}
	}

	const saveSettings = () => {
		setLoading(true);
		(async function() {
      await Submit('/file-share/settings', {
      	uploads: allowUploads,
      	access_levels: accessLevels
      })
      setTimeout(() => {
      	setLoading(false)
      },1000)
		})() // eslint-disable-next-line
	}

	const accessLevelName = code => {
		var name = ''
		accessLevels.forEach(lev => {
			if (lev.code === code) name = lev.name
		})
		return name
	}

	const toggleSettings = () => {
		setShowSettings(!showSettings)
	}

	return (
		<div className='admin-file-sharing'>
			<div className='settings-header' onClick={() => toggleSettings()}>
				<p>Settings</p>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"/></svg>
			</div>
			<div className='settings' style={{ display: (showSettings) ? 'block' : 'none' }}>
				<div className='section'>
					<h2>Allow Uploads?</h2>
					<select value={allowUploads} onChange={(e) => setAllowUploads(e.target.value)}>
						<option value='on'>Yes</option>
						<option value='off'>No</option>
					</select>
				</div>
				<div className='section'>
					<h2>Access Levels</h2>
					{accessLevels.map((level, i) => {
						return <div className='level' key={i} data-id={level.id}>
							<label>{(i === 0) ? 'Primary Level Name (for all files)' : 'Level Name'}
								<input className='level-name' defaultValue={level.name} onChange={updateLevels} />
							</label>
							<label>Level Code
								<input className='level-code' defaultValue={level.code} onChange={updateLevels} />
							</label>
							{i > 0 && <svg onClick={() => deleteLevel(level.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" /></svg> }
							{i === 0 && <svg className='no-hover' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zM103.265 408.735c-80.622-80.622-84.149-208.957-10.9-293.743l304.644 304.643c-84.804 73.264-213.138 69.706-293.744-10.9zm316.37-11.727L114.992 92.365c84.804-73.263 213.137-69.705 293.743 10.9 80.622 80.621 84.149 208.957 10.9 293.743z"/></svg> }
						</div>
					})}
					<p className='add-level' onClick={addLevel}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
							<path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" />
						</svg>
						<span>Add Level</span>
					</p>
				</div>
				<p className='save-settings' onClick={saveSettings}>Save Settings</p>
			</div>
			{/********************************/}
			<div className='file-search'>
				<div className='container'>
					<input value={(search) ? search : ''} placeholder='Search' onChange={(e) => setSearch(e.target.value.toLowerCase())} />
					<p className='add-new-button' onClick={() => setShowAddNew(true)}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
							<path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" />
						</svg>
						<span>Add New</span>
					</p>
				</div>
			</div>
			{/********************************/}
			<div className='files'>
				<div className='container'>
					<div className='file label'>
						<p>Name</p>
						<p>Access Level</p>
						<p>Uploaded By</p>
						<p>Date Uploaded</p>
						<p>Available Until</p>
						<p>Link</p>
						<p>Downloads</p>
					</div>
					{availFiles.length && availFiles.map((file, i) => {
						if (!search || (search && (JSON.stringify(file).toLowerCase().includes(search) || JSON.stringify(file).replace(/-/g, ' ').toLowerCase().includes(search)))) {
							return <div className='file' data-id={file.id}>
								<p>{file.name}</p>
								<p>{accessLevelName(file.access)}</p>
								<p>{file.uploaded_by}</p>
								<p>{file.uploaded_date}</p>
								<p>{(file.available_until) ? file.available_until : ''}</p>
								<p>
									{file.path.split(',').map((path, j) => {
										return <a href={API_PATH.substring(0, API_PATH.length - 6) + '/static/files/' + path} target='_blank' rel='noopener noreferrer'>Download</a>
									})}
								</p>
								<p>{file.downloads}</p>
							</div>
						} else return false
					})}
					{!availFiles.length &&
						<p className='no-files'>There are no files available for download.</p>
					}
				</div>
			</div>
			{/********************************/}
			<div className={(showAddNew) ? 'add-new active' : 'add-new'}>
				<svg onClick={() => setShowAddNew(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
				</svg>
				<form>
					<label>File Name
						<input value={fileName} onChange={(e) => setFileName(e.target.value)} />
					</label>
					<Dropzone uploadedFileNames={uploadedFileNames} />
					<label>Your Name
						<input value={yourName} onChange={(e) => setYourName(e.target.value)} />
					</label>
					<label>Access Level
						<select value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)}>
							{accessLevels.map((level, i) => {
								return <option value={level.code}>{level.name}</option>
							})}
						</select>
					</label>
					<label>Available Until
						<input type='datetime-local' value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} />
					</label>
					<input type='submit' value='Upload' onClick={() => uploadFiles()} />
				</form>
			</div>
			{loading && <Loading />}
		</div>
	)
}

export default () => (
	<Layout>
		<FileSharing />
	</Layout>
)