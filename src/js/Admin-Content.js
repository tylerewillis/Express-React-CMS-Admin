import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout-Admin'
import { useCookies } from 'react-cookie'
import Loading from './_Components/Loading'

import Text from './_Components/_Admin/Section-Text'
import PlainText from './_Components/_Admin/Section-PlainText'
import Dates from './_Components/_Admin/Section-Dates'
import Image from './_Components/_Admin/Section-Image'
import Images from './_Components/_Admin/Section-Images'
import Table from './_Components/_Admin/Section-Table'
import New from './_Components/_Admin/Section-New'
import Forms from './_Components/_Admin/Section-Forms'
import WindowType from './_Components/_Admin/Section-Window-Type'
import Blocks from './_Components/_Admin/Section-Blocks'
import Submit from './_Components/_API/Submit'

const Content = React.memo(({ post, content, images, forms }) => {
	
	const [ data, setData ] = useState({content})
	const [ loading, setLoading ] = useState(false)
	const [ name, setName ] = useState(content[0].content)
	const [ url, setUrl ] = useState(false)
	const [ needToSave, setNeedToSave ] = useState(false)
	const [ cookies, setCookie ] = useCookies(['role']) // eslint-disable-line
	const pathArray = window.location.pathname.split('/')
	const path = pathArray[pathArray.length - 2]

	useEffect(() => {
		if (path === 'pages') setUrl('/' + post.url)
		else if (path === 'products') setUrl('/shop/' + post.url)
		else setUrl('/' + path + '/' + post.url)
	},[]) //eslint-disable-line

	const toUrl = string => {
	  var clean = string.replace(/[^a-zA-Z0-9- ]/g, '')
	  var url = clean.replace(/ /gm, "-").toLowerCase()

	  if (path === 'pages') return '/' + url
		else if (path === 'products') return '/shop/' + url
		else return '/' + path + '/' + url
	}

	const handleChange = (e) => {
		setData(prevState => {
			content[e.id].content = e.content
			return { ...prevState }
		})
		if (e.id === 0) setName(e.content)
		if (e.id === 1 && e.name === 'URL') setUrl(toUrl(e.content))
		document.querySelector('body').addEventListener('mouseleave', (e) => {
			setNeedToSave(true)
		})
	}

	const removeSection = (id) => {
		if (window.confirm('Are you sure you want to delete this content? Formatting on the page may be broken.')) {
			setData(prevState => {
				prevState.content.splice(id, 1)
				for (let i = id; i < content.length; i++) {
					if (content[i]) content[i].id = i
				}
				return { ...prevState }
			})
		}
	}

	const addSection = (section) => {
		section.id = content.length
		setData(prevState => {
			content[prevState.content.length] = section
			return { ...prevState }
		})
	}

	const hideSaveMessage = () => {
		document.querySelector('.need-to-save').remove()
	}

	const section = content.map((con, index) => {
		switch(con.type) {
			case 'text':
				return <Text key={index} con={con} handleChange={handleChange} removeSection={removeSection} />
			case 'plain-text':
				return <PlainText key={index} con={con} handleChange={handleChange} removeSection={removeSection} />
			case 'dates':
				return <Dates key={index} con={con} handleChange={handleChange} removeSection={removeSection} />
			case 'image':
				return	<Image key={index} con={con} handleChange={handleChange} images={images} removeSection={removeSection} />
			case 'table':
				return <Table key={index} con={con} handleChange={handleChange} removeSection={removeSection} />
			case 'images':
				return <Images key={index} con={con} handleChange={handleChange} images={images} removeSection={removeSection} />
			case 'window-type':
				return <WindowType key={index} con={con} handleChange={handleChange} removeSection={removeSection} />
			case 'form':
				return <Forms key={index} con={con} forms={forms} handleChange={handleChange} removeSection={removeSection} />
			case 'blocks':
				return <Blocks key={index} con={con} images={images} forms={forms} handleChange={handleChange} removeSection={removeSection} />
			default:
				return null
		}
	})

	const handleSave = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, data.content)
			setLoading(false)
		})()
	}

	const handleSaveClose = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, data.content)
			const prevUrl = window.location.pathname.split('/')
			prevUrl.pop()
			const url = prevUrl.join('/')
			window.location.replace(url)
		})()
	}

	const handleDelete = (id) => {
		if (window.confirm('Are you sure that you want to delete this post? This will break any existing links pointed this page and it cannot be undone.')) {
			window.location.replace('/' + path + '/delete/' + id)
		}
	}

	return (
		<div className='admin-content'>
			<div className='atbs-header'>
				<h2>{name}</h2>
				{(path !== 'alerts' && path !== 'meta') && <input className='url-header' value={url} readonly />}
			</div>
			<form>
				{section}
				<New content={content} addSection={addSection} />
				<div className='buttons-bottom'>
					<p className='save' onClick={handleSave}>Save</p>
					<p className='save save-close' onClick={handleSaveClose}>Save & Close</p>
					<p className='save delete' onClick={() => handleDelete(post.ID)}>Delete</p>
				</div>
			</form>
			{needToSave &&
				<div className='need-to-save' onClick={hideSaveMessage}>
					<p>Changes have been made to this page. Make sure to save before exiting!</p>
				</div>
			}
			{loading && <Loading />}
		</div>
	)
})

Content.propTypes = {
	post: PropTypes.array,
	content: PropTypes.array,
	images: PropTypes.array,
	role: PropTypes.string
}

export default () => (
	<Layout>
		<Content />
	</Layout>
)