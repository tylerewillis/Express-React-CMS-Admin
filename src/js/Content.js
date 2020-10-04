import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout'
import { useCookies } from 'react-cookie'
import Loading from './_Components/Loading'

import Text from './_Components/_Content/Text'
import PlainText from './_Components/_Content/PlainText'
import List from './_Components/_Content/List'
import Dates from './_Components/_Content/Dates'
import Image from './_Components/_Content/Image'
import Images from './_Components/_Content/Images'
import Table from './_Components/_Content/Table'
import New from './_Components/_Content/New'
import Forms from './_Components/_Content/Forms'
import Select from './_Components/_Content/Select'
import Blocks from './_Components/_Content/Blocks'
import Color from './_Components/_Content/Color'
import Submit from './_Components/_API/Submit'

const Content = React.memo(({ postType, postUrl, post, content, images, forms }) => {
	
	const [ data, setData ] = useState({content})
	const [ loading, setLoading ] = useState(false)
	const [ name, setName ] = useState(content[0].content)
	const [ url, setUrl ] = useState(postUrl)
	const [ cookies, setCookie ] = useCookies(['role']) // eslint-disable-line
	const pathArray = window.location.pathname.split('/')
	const path = pathArray[pathArray.length - 2]
	const [ pubDate, setPubDate ] = useState(post.pub_date)
	const [ blocksOpen, setBlocksOpen ] = useState(false)

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

	//--------------------
	//- Open Blocks from Closed
	//--------------------

	const openBlocks = (e = false) => {
		if (e) {
			let element = (e.target.closest('.ac-block')) ? e.target.closest('.ac-block') : e.target
			if (!element.classList.contains('active')) {
				setLoading(true)
				setBlocksOpen(true)
				setTimeout(() => {
					setLoading(false)
					element.scrollIntoView()
					// Remove focus from all other elements
					document.querySelectorAll('.ac-block').forEach(block => block.classList.remove('block-focused'))
					// Add focus to element
					element.classList.add('block-focused')
				},250)
			}
		}
	}

	const section = content.map((con, index) => {
		switch(con.type) {
			case 'text':
				return <Text key={index} con={con} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'plain-text':
				return <PlainText key={index} con={con} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'list':
				return <List key={index} con={con} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'dates':
				return <Dates key={index} con={con} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'image':
				return	<Image key={index} con={con} handleChange={handleChange} images={images} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'table':
				return <Table key={index} con={con} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'images':
				return <Images key={index} con={con} handleChange={handleChange} images={images} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'select':
				return <Select key={index} con={con} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'color':
				return <Color key={index} con={con} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'form':
				return <Forms key={index} con={con} forms={forms} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			case 'blocks':
				return <Blocks key={index} con={con} images={images} forms={forms} handleChange={handleChange} removeSection={removeSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />
			default:
				return null
		}
	})

	const handleSave = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, { content: data.content, pub_date: pubDate })
			setLoading(false)
		})()
	}

	const handleSaveClose = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname, { content: data.content, pub_date: pubDate })
			const prevUrl = window.location.pathname.split('/')
			prevUrl.pop()
			const url = prevUrl.join('/')
			window.location.replace(url)
		})()
	}

	const handleSaveCopy = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname + '/copy', { type: postType, content: data.content, pub_date: pubDate })
			const prevUrl = window.location.pathname.split('/')
			prevUrl.pop()
			const url = prevUrl.join('/')
			window.location.replace(url)
		})()
	}

	const handleCancel = () => {
		const prevUrl = window.location.pathname.split('/')
		prevUrl.pop()
		const url = prevUrl.join('/')
		window.location.replace(url)
	}

	const handleDelete = (id) => {
		if (window.confirm('Are you sure that you want to delete this post? This will break any existing links pointed this page and it cannot be undone.')) {
			window.location.replace('/' + path + '/delete/' + id)
		}
	}

	const scrollTop = () => {
		document.documentElement.style.scrollBehavior = 'auto'
		setTimeout(() => { window.scrollTo(0,0) })
		setTimeout(() => { document.documentElement.style.scrollBehavior = 'smooth' }, 1000)
	}

	//--------------------
	//- Scroll Bottom Buttons
	//--------------------

	useEffect(() => {
		window.addEventListener('scroll', handleScroll())
		return () => {
			window.removeEventListener('scroll', handleScroll())
		}
	})

	const handleScroll = (e) => {
		window.onscroll = function(){
			var st = window.pageYOffset + window.innerHeight
			const formEl = document.querySelector('.admin-content form')
			const buttons = document.querySelector('.buttons-bottom')
			if (st > (formEl.offsetTop + formEl.offsetHeight)) {
				buttons.classList.add('absolute-bottom')
			} else {
				buttons.classList.remove('absolute-bottom')
			}
		}
	}

	return (
		<div className='admin-content'>
			<div className='atbs-header'>
				<h2>{name}</h2>
				<div className='atbs-header-sub'>
					<div className='left'>
						{path !== 'alerts' && path !== 'meta' && <input className='url-header' value={url} readonly /> }
						<svg className={!blocksOpen ? 'active' : ''} onClick={() => setBlocksOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48H48C21.49 32 0 53.49 0 80zm320-16v106.667H192V64h128zm160 245.333H352V202.667h128v106.666zm-160 0H192V202.667h128v106.666zM32 202.667h128v106.667H32V202.667zM160 64v106.667H32V80c0-8.837 7.163-16 16-16h112zM32 432v-90.667h128V448H48c-8.837 0-16-7.163-16-16zm160 16V341.333h128V448H192zm160 0V341.333h128V432c0 8.837-7.163 16-16 16H352zm128-277.333H352V64h112c8.837 0 16 7.163 16 16v90.667z"/></svg>
						<svg className={blocksOpen ? 'active' : ''} onClick={() => setBlocksOpen(true)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm16 336c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v288z"/></svg>
					</div>
					{path !== 'alerts' && path !== 'meta' && <p>Pageviews: {post.pageviews.toLocaleString()}</p> }
				</div>
			</div>
			<form>
				{section}
				{cookies.role === 'super' && <New content={content} addSection={addSection} blocksOpen={blocksOpen} openBlocks={openBlocks} />}
				<div className='buttons-bottom absolute-bottom'>
					<div>
						<p>Publish:
							<input type='datetime-local' value={pubDate} onChange={(e) => setPubDate(e.target.value)} />
						</p>
						<p className='save' onClick={handleSave}>Save</p>
						<p className='plain' onClick={handleSaveClose}>Save & Close</p>
						<p className='plain' onClick={handleSaveCopy}>Save As Copy</p>
						<p className='plain' onClick={handleCancel}>Cancel & Go Back</p>
						<p className='plain' onClick={() => handleDelete(post.ID)}>Delete</p>
					</div>
					<div>
						<p className='top' onClick={scrollTop}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M6.101 359.293L25.9 379.092c4.686 4.686 12.284 4.686 16.971 0L224 198.393l181.13 180.698c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 132.908c-4.686-4.686-12.284-4.686-16.971 0L6.101 342.322c-4.687 4.687-4.687 12.285 0 16.971z"/></svg></p>
					</div>
				</div>
			</form>
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