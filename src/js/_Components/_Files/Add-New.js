import React, { useState } from 'react'
import Dropzone from './Dropzone'
import Submit from '../_API/Submit'

const Search = ({ showAddNew, settings, setLoading, reloadContainer, setShowAddNew, accessLevels }) => {

  const [ fileName, setFileName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ fileNames, setFileNames ] = useState([])
  const [ yourName, setYourName ] = useState('')
  const [ accessLevel, setAccessLevel ] = useState(settings.access_levels[0].code)
  const [ availableUntil, setAvailableUntil ] = useState('')

  const uploadedFileNames = files => {
    setFileNames(files)
  }

  const uploadFiles = () => {
    const data = {
      name: fileName,
      description,
      path: fileNames,
      uploaded_by: yourName,
      access: accessLevel,
      available_until: availableUntil
    }

    setLoading(true);
    (async function() {
      await Submit('/file-share/file-details', data)
      setTimeout(() => {
        reloadContainer()
        setLoading(false)
      },1000)
    })() // eslint-disable-next-line
  }

  return (
    <div className={(showAddNew) ? 'add-new active' : 'add-new'}>
      <svg onClick={() => setShowAddNew(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" />
      </svg>
      <form>
        <label>File Name
          <input value={fileName} onChange={(e) => setFileName(e.target.value)} />
        </label>
        <label>Description
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <Dropzone uploadedFileNames={uploadedFileNames} />
        <label>Your Name
          <input value={yourName} onChange={(e) => setYourName(e.target.value)} />
        </label>
        <label>Access Level
          <select value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)}>
            {accessLevels.map((level, i) => {
              return <option value={level.code}>{level.name}</option>
            })}
          </select>
        </label>
        <label>Available Until
          <input type='datetime-local' value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} />
        </label>
        <input type='submit' value='Upload' onClick={() => uploadFiles()} />
      </form>
    </div>
  )
}

export default Search