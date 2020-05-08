import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default React.memo(({ description, sendChange }) => {

	const handleChange = () => {
		var temp = []
		const desc = document.querySelectorAll('.descr')
		desc.forEach(des => {
			temp.push({
				name: des.querySelector('h4').innerHTML,
				html: des.querySelector('.ql-editor').innerHTML
			})
		})
		sendChange({
			description: temp
		})
	}

	const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
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
    'list', 'bullet', 'indent',
    'script',
    'align',
    'link'
  ]

	return (
		<div className='block'>
			{description.map((desc, i) => {
				return ( <div className='section descr' key={i}>
						<h4>{desc.name}</h4>
						<p className='desc'>Set the default description for the product {desc.name.toLowerCase()}.</p>
						<div className='atbs-editor'>
							<ReactQuill defaultValue={desc.html} onChange={handleChange} modules={modules} formats={formats} />
						</div>
					</div>
				)
			})}
		</div>
	)
})