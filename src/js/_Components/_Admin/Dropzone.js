import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Submit from '../_API/SubmitFiles'

const Dropzone = ({ reloadContainer }) => {

  const onDrop = useCallback(acceptedFiles => {
    (async function() {
      const data = new FormData()
      acceptedFiles.forEach(file => {
        data.append('files[]', file)
      })
      await Submit('/admin/upload', data)
      reloadContainer()
		})() // eslint-disable-next-line
  },[])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className='acbic-new' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop files here, or click to select files</p>
      }
    </div>
  )
}

export default Dropzone