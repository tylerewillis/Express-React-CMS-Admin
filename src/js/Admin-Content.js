import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from './_Components/Layout-Admin'
import { useCookies } from 'react-cookie'

import Text from './_Components/_Admin/Section-Text'
import PlainText from './_Components/_Admin/Section-PlainText'
import Dates from './_Components/_Admin/Section-Dates'
import Image from './_Components/_Admin/Section-Image'
import Images from './_Components/_Admin/Section-Images'
import Table from './_Components/_Admin/Section-Table'
import New from './_Components/_Admin/Section-New'
import WindowType from './_Components/_Admin/Section-Window-Type'

import Submit from './_Components/_API/Submit'

const Content = React.memo(({ post, content, images }) => {
	
	const [ data, setData ] = useState({content})
	const [ cookies, setCookie ] = useCookies(['role']) // eslint-disable-line

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			Submit(window.location.pathname, data.content)
			const prevUrl = window.location.pathname.split('/')
			prevUrl.pop()
			const url = prevUrl.join('/')
			window.location.replace(url)
		} catch(e) {
			const prevUrl = window.location.pathname.split('/')
			prevUrl.pop()
			const url = prevUrl.join('/')
			window.location.replace(url)
		}
	}
	
	const handleChange = (e) => {
		setData(prevState => {
			content[e.id].content = e.content
			return { ...prevState }
		})
	}

	const removeSection = (id) => {
		if (window.confirm('Are you sure you want to delete this content?')) {
			setData(prevState => {
				delete content[id]
				for (let i = id + 1; i < content.length; i++) {
					if (content[i]) content[i].id = i - 1
				}
				return { ...prevState }
			})
		}
	}

	const addSection = (section) => {
		section.id = content.length
		setData(prevState => {
			content[content.length] = section
			return { ...prevState }
		})
	}

	const section = content.map((con, index) => {
		switch(con.type) {
			case 'text':
				return <Text key={index} con={con} handleChange={handleChange} role={cookies['role']} removeSection={removeSection} />
			case 'plain-text':
				return <PlainText key={index} con={con} handleChange={handleChange} role={cookies['role']} removeSection={removeSection} />
			case 'dates':
				return <Dates key={index} con={con} handleChange={handleChange} role={cookies['role']} removeSection={removeSection} />
			case 'image':
				return	<Image key={index} con={con} handleChange={handleChange} images={images} role={cookies['role']} removeSection={removeSection} />
			case 'table':
				return <Table key={index} con={con} handleChange={handleChange} role={cookies['role']} removeSection={removeSection} />
			case 'images':
				return <Images key={index} con={con} handleChange={handleChange} images={images} role={cookies['role']} removeSection={removeSection} />
			case 'window-type':
				return <WindowType key={index} con={con} handleChange={handleChange} role={cookies['role']} removeSection={removeSection} />
			default:
				return null
		}
	})

	return (
		<div className='admin-content'>
			<div className='atbs-header'>
				<h2>{post.name}</h2>
			</div>
			<form onSubmit={handleSubmit}>
				{section}
				{cookies['role'] === 'super' &&
					<New content={content} addSection={addSection} />
				}
				<input type='submit' value='Save/Update Page' />
			</form>
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