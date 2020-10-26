import React, { useState } from 'react'
import Layout from './_Components/Layout'
import Loading from './_Components/Loading'
import Dropzone from './_Components/_Bulk-Upload/Dropzone'
import { API_PATH } from './_Components/_Config'

const FileSharing = ({ postTypes, fileUploadHost, website }) => {

	const [ loading, setLoading ] = useState(false)
	const [ confirmation, setConfirmation ] = useState(false)
	const [ downloadLinks, setDownloadLinks ] = useState(false)

	const downloadFiles = type => {
		(async function() {
			setLoading(true)
			setDownloadLinks(false)
			const path = API_PATH + '/bulk-upload/export/' + type.type + '/' + fileUploadHost.split('://')[1] + '/main'
			try {
				const res = await fetch(path)
				const json = await res.json()
		  	setDownloadLinks(json)
			} catch(e) {}
			setLoading(false)
		})()
	}

	return (
		<div className='admin-bulk-upload'>
			<div className='instructions'>
				<h2>Instructions:</h2>
				<p>To bulk-upload pages, posts or products, download the blank CSV template listed below. Replace the placeholder date at the top (optional) and the row of example content under the column headers (leave the headers). Add as many rows as posts to create. To include images, put the exact file name in the relevant cell (for inputs allowing multiple images, list the multiple file names separated by commas). Then, drag and drop or select the updated database file(s) AND all necessary images together to create the new posts.</p>
				<p>In the event where a page or post contains an input allowing for multiple page elements (or blocks), be sure to download, update and re-upload all files listed.</p>
				<p>Be sure to not change the name of the database file(s). However, if you have previously download files of the same name, your browser may increment the file name (i.e. database (1).csv). Please erase the incrementing before re-uploading (i.e. database.csv).</p>
			</div>
			<div className='downloads'>
				{postTypes.map(type => {
					if (type.type !== 'forms' && type.type !== 'navigations') {
						return <p className='block' onClick={() => downloadFiles(type)}>
							<span>{type.type.charAt(0).toUpperCase() + type.type.substr(1)}</span>
							<i className="fas fa-file-alt"></i>
						</p>
					} else return null
				})}
			</div>
			{downloadLinks &&
				<p className='download-links-message' dangerouslySetInnerHTML={{ __html: downloadLinks.message }} />
			}
			<Dropzone fileUploadHost={fileUploadHost} setLoading={setLoading} setConfirmation={setConfirmation} />
			{confirmation &&
				<p className='confirmation-message'>{confirmation.message}</p>
			}
			{loading && <Loading />}
		</div>
	)
}

export default () => (
	<Layout>
		<FileSharing />
	</Layout>
)