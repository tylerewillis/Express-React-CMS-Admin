import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Submit from '../_API/SubmitFiles'
import Loading from '../Loading'

const Dropzone = ({ reloadContainer, fileUploadHost }) => {

  const [ loading, setLoading ] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
    setLoading(true);
    (async function() {
      const data = new FormData()
      acceptedFiles.forEach(file => {
        data.append('files[]', file)
      })
      await Submit('/admin/upload', data, 'POST', fileUploadHost)
      setTimeout(() => {
        reloadContainer()
        setLoading(false)
        rmvHighlight()
      },1000)
		})() // eslint-disable-next-line
  },[])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop}) //eslint-disable-line

  const highlight = () => {
    const container = document.querySelector('.acbic-new')
    container.style.border = '2px solid #f1645f'
    container.querySelector('.text').textContent = 'Drop files ...'
  }

  const rmvHighlight = () => {
    const container = document.querySelector('.acbic-new')
    container.style.border = '2px solid #d3d3d3'
    container.querySelector('.text').textContent = "Drag 'n' drop files here, or click to select files"
  }

  return (
    <div className='acbic-new' {...getRootProps()} onDragOver={highlight} onDragLeave={rmvHighlight}>
      <input {...getInputProps()} />
      <p className='text'>Drag 'n' drop files here, or click to select files</p>
      {loading && <Loading />}
    </div>
  )
}

export default Dropzone