import React, { useState } from 'react'

const Settings = ({ settings, all, accessLevels, setAccessLevels, saveSettings }) => {

  const [ showSettings, setShowSettings ] = useState(false)
  const [ allowUploads, setAllowUploads ] = useState(settings.uploads)

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const updateLevels = () => {
    let temp = []
    document.querySelectorAll('.level').forEach(lev => {
      temp.push({
        id: lev.getAttribute('data-id'),
        name: lev.querySelector('.level-name').value,
        code: lev.querySelector('.level-code').value
      })
    })
    setAccessLevels(temp)
  }

  const makeId = length => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }

  const addLevel = () => {
    let temp = accessLevels
    temp.push({id: temp.length, name: '', code: makeId(10)})
    setAccessLevels([...temp])
  }

  const deleteLevel = id => {
    if (window.confirm('Are you sure that you want to delete this file access level?')) {
      let temp = accessLevels
      temp.splice(id, 1)
      setAccessLevels([...temp])
    }
  }

  return (
    <React.Fragment>
      <div className='settings-header' onClick={() => toggleSettings()}>
        <p>Settings</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"/></svg>
      </div>
      <div className='settings' style={{ display: (showSettings) ? 'block' : 'none' }}>
        <div className='section'>
          <h2>Allow Uploads?</h2>
          <select value={allowUploads} onChange={(e) => setAllowUploads(e.target.value)}>
            <option value='on'>Yes</option>
            <option value='off'>No</option>
          </select>
        </div>
        <div className='section'>
          <h2>Access Levels</h2>
          {accessLevels.map((level, i) => {
            return <div className='level' key={i} data-id={level.id}>
              <label>{(i === 0) ? 'Level Name (primary level for all files)' : 'Level Name'}
                <input className='level-name' defaultValue={level.name} onChange={updateLevels} />
              </label>
              <label>Level Code
                <input className='level-code' defaultValue={level.code} onChange={updateLevels} />
              </label>
              {i > 0 && <svg onClick={() => deleteLevel(level.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" /></svg> }
              {i === 0 && <svg className='no-hover' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zM103.265 408.735c-80.622-80.622-84.149-208.957-10.9-293.743l304.644 304.643c-84.804 73.264-213.138 69.706-293.744-10.9zm316.37-11.727L114.992 92.365c84.804-73.263 213.137-69.705 293.743 10.9 80.622 80.621 84.149 208.957 10.9 293.743z"/></svg> }
            </div>
          })}
          <p className='add-level' onClick={addLevel}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>Add Level</span>
          </p>
        </div>
        <p className='save-settings' onClick={() => saveSettings(allowUploads)}>Save Settings</p>
      </div>
    </React.Fragment>
  )
}

export default Settings