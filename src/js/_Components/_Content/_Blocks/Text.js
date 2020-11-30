import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Shortcodes from '../_Text/Shortcodes'

const Text = React.memo(({ con, p, i, updateValue, removeSection }) => {

	const [ helperActive, setHelperActive ] = useState(false)
	const section = React.createRef()
	const editor = React.createRef()

	const updateItem = (e) => {
		if (e.target.closest('.ql-editor')) {
			updateValue(p,i, {
				type: con.type,
				name: con.name,
				value: e.target.closest('.ql-editor').innerHTML
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
    toolbar: [
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
 
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'color', 'background',
    'script',
    'align',
    'link'
  ]

  const helperToggle = () => {
		setHelperActive(!helperActive)
	}

	return (
		<div className='item' ref={section}>
			<h2>{con.name}
				<div className='title-helper'>
					<i className="far fa-question-circle" onClick={() => helperToggle()}></i>
					<p className={(helperActive) ? 'title-content active' : 'title-content'}>This is a text input field where you can add and format text and shortcodes as listed below.</p>
				</div>
			</h2>
			<div className='atbs-editor' ref={editor} onBlur={updateItem}>
				<ReactQuill defaultValue={con.value} modules={modules} formats={formats} />
			</div>
			<Shortcodes />
		</div>
	)
})

export default Text