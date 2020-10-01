import React, { useState } from 'react'
import Layout from './_Components/Layout'
import { API_PATH } from './_Components/_Config'
import Call from './_Components/_API/Call'
import Submit from './_Components/_API/Submit'
import Loading from './_Components/Loading'

import Settings from './_Components/_Files/Settings'
import Search from './_Components/_Files/Search'
import AddNew from './_Components/_Files/Add-New'

const FileSharing = ({ settings, files, url }) => {

	const [ availFiles, setAvailFiles ] = useState(files)
	const [ loading, setLoading ] = useState(false)
	const [ search, setSearch ] = useState(false)
	const [ accessLevels, setAccessLevels ] = useState(settings.access_levels)
	const [ showAddNew, setShowAddNew ] = useState(false)

	const reloadContainer = () => {
		(async function() {
			const updatedFiles = await Call('/get-files-from-directory')
			setAvailFiles(updatedFiles)
		})()
	}

	const deleteFile = (id, index) => {
		if (window.confirm('Are you sure that you want to delete this file(s)? This cannot be undone.')) {
			setLoading(true);
			(async function() {
	      await Submit('/file-share/delete/' + id)
	      setTimeout(() => {
	      	// Remove from view
	      	let temp = availFiles
					temp.splice(index, 1)
					setAvailFiles([...temp])
	      	setLoading(false)
	      },1000)
			})()
		}
	}

	const transferFile = id => {
		setLoading(true);
		(async function() {
      await Submit('/file-share/transfer/' + id)
      setTimeout(() => {
      	setLoading(false)
      },1000)
		})()
	}

	const downloadFile = (id, element) => {
		(async function() {
      await Submit('/file-share/downloads/' + id)
		})()
		// View
		var dEl = element.closest('.file').querySelector('.downloads')
		dEl.textContent = parseInt(dEl.textContent) + 1
	}

	const saveSettings = (allowUploads) => {
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

	return (
		<div className='admin-file-sharing'>
			<Settings settings={settings} accessLevels={accessLevels} setAccessLevels={setAccessLevels} saveSettings={saveSettings} />
			<Search search={search} setSearch={setSearch} setShowAddNew={setShowAddNew} />
			<div className='files'>
				<div className='container'>
					<div className='file label'>
						<p>Name</p>
						<p>Description</p>
						<p>Access Level</p>
						<p>Uploaded By</p>
						<p>Date Uploaded</p>
						<p>Available Until</p>
						<p>Link</p>
						<p>Downloads</p>
						<p></p>
					</div>
					{availFiles && availFiles.map((file, i) => {
						if (!search || (search && (JSON.stringify(file).toLowerCase().includes(search) || JSON.stringify(file).replace(/-/g, ' ').toLowerCase().includes(search)))) {
							return <div className='file' data-id={file.id}>
								<p>{file.name}</p>
								<p>{file.description}</p>
								<p>{accessLevelName(file.access)}</p>
								<p>{file.uploaded_by}</p>
								<p>{file.uploaded_date}</p>
								<p>{(file.available_until) ? file.available_until : ''}</p>
								<p>
									{file.path.split(',').map((path, j) => {
										return <a onClick={(e) => downloadFile(file.id, e.target)} href={API_PATH.substring(0, API_PATH.length - 6) + '/static/files/' + path} target='_blank' rel='noopener noreferrer'>Download</a>
									})}
								</p>
								<p className='downloads'>{file.downloads}</p>
								<p>
									<svg title='Transfer file to media directory' onClick={() => transferFile(file.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M564.907 196.35L388.91 12.366C364.216-13.45 320 3.746 320 40.016v88.154C154.548 130.155 0 160.103 0 331.19c0 94.98 55.84 150.231 89.13 174.571 24.233 17.722 58.021-4.992 49.68-34.51C100.937 336.887 165.575 321.972 320 320.16V408c0 36.239 44.19 53.494 68.91 27.65l175.998-184c14.79-15.47 14.79-39.83-.001-55.3zm-23.127 33.18l-176 184c-4.933 5.16-13.78 1.73-13.78-5.53V288c-171.396 0-295.313 9.707-243.98 191.7C72 453.36 32 405.59 32 331.19 32 171.18 194.886 160 352 160V40c0-7.262 8.851-10.69 13.78-5.53l176 184a7.978 7.978 0 0 1 0 11.06z"/></svg>
									<svg title='Delete file(s)' onClick={() => deleteFile(file.id, i)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" /></svg>
								</p>
							</div>
						} else return false
					})}
					{!availFiles.length &&
						<p className='no-files'>There are no files available for download.</p>
					}
				</div>
			</div>
			<AddNew showAddNew={showAddNew} settings={settings} setLoading={setLoading} reloadContainer={reloadContainer} setShowAddNew={setShowAddNew} accessLevels={accessLevels} />
			{loading && <Loading />}
		</div>
	)
}

export default () => (
	<Layout>
		<FileSharing />
	</Layout>
)