import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Shortcodes from './_Text/Shortcodes'
import { useCookies } from 'react-cookie'

const Text = React.memo(({ con, handleChange, removeSection, blocksOpen, openBlocks }) => {

	const [ cookies ] = useCookies(['role'])

	const section = React.createRef()
	const editor = React.createRef()

	const sendChange = (e) => {
		if (e.target.closest('.ql-editor')) {
			handleChange({
				id: con.id,
				type: con.type,
				name: con.name,
				description: con.description,
				content: e.target.closest('.ql-editor').innerHTML
			})
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll())
		return () => {
			window.removeEventListener('scroll', handleScroll())
		}
	})

	const handleScroll = (e) => {
		window.onscroll = function(){
			var st = window.pageYOffset
			if (editor.current && section.current) {
				if (st > (editor.current.offsetTop + section.current.offsetTop)) {
					if (st < section.current.offsetTop + editor.current.offsetTop + editor.current.offsetHeight) {
						section.current.classList.add('ac-block-active')
					} else {
						section.current.classList.remove('ac-block-active')
					}
				} else {
					section.current.classList.remove('ac-block-active')
				}
			}
		}
	}

	const modules = {
    toolbar: {
    	container: [
	      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	      ['bold', 'italic', 'underline','strike', 'blockquote'],
	      [{ 'color': []}, { 'background': []}],
	      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
	      [{ 'script': 'sub' }, { 'script': 'super' }],
	      [{ 'align': [] }],
	      ['link'],
	      ['clean']
	    ]
	  }
  }
 
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'color', 'background',
    'script',
    'align',
    'link'
  ]

	return (
		<div className={(blocksOpen) ? 'ac-block active' : 'ac-block'} ref={section} onClick={(e) => openBlocks(e)}>
			<h2><span>{con.id + 1}.</span> {con.name}</h2>
			<p className='acb-description'>{con.description}</p>
			<div className='atbs-editor' ref={editor} onBlur={sendChange}>
				<ReactQuill defaultValue={con.content} modules={modules} formats={formats} />
			</div>
			<Shortcodes />
			{cookies.role === 'super' && con.id !== 0 && <i className="fas fa-times" onClick={() => removeSection(con.id)}/>}
		</div>
	)
})

export default Text