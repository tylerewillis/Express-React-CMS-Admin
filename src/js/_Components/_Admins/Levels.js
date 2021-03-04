import React, { useState, useEffect } from 'react'
import Submit from '../_API/Submit'

export default ({ levels, dashboardBlocks, setLoading, removeLevelsFromUsers }) => {

	const [ levelsObjects, setLevelsObjects ] = useState(levels)
	const [ active, setActive ] = useState(levels[0])
	const [ blocks, setBlocks ] = useState(null)
	const [ newAccessDisplay, setNewAccessDisplay ] = useState(false)
	const [ updatesMade, setUpdatesMade ] = useState(false)
	const [ newAccessLevel, setNewAccessLevel ] = useState('')
	const [ removeDisplay, setRemoveDisplay ] = useState(false)

	const setActiveLevel = name => {
		levels.forEach(level => {
			if (level.name === name) {
				setActive(level)
				activateBlocks(level)
			}
		})
	}

	// Set initial blocks and active status
	useEffect(() => {
		activateBlocks()
	},[]) //eslint-disable-line

	const activateBlocks = (level = false) => {
		let temp = []
		dashboardBlocks.forEach(block => {
			if ((level && level.access.includes(block.name)) || (!level && active.access.includes(block.name))) temp.push({ name: block.name, active: true })
			else temp.push({ name: block.name, active: false })
		})
		setBlocks(temp)
	}

	const addLevel = name => {
		if (active.name !== 'Admin') {
			let temp = levelsObjects
			temp.forEach(obj => {
				if (obj.name === active.name) {
					if (!obj.access.includes(name)) {
						obj.access.push(name)
					} else {
						let index = obj.access.indexOf(name)
						obj.access.splice(index,1)
					}
					activateBlocks(obj)
				}
			})
			setUpdatesMade(true)
			setLevelsObjects(temp)
		}
	}

	const save = () => {
		setLoading(true);
		(async () => {
			await Submit(window.location.pathname + '/levels', levelsObjects)
			setLoading(false)
			setUpdatesMade(false)
		})()
	}

	const toggleNew = () => {
		let temp = newAccessDisplay
		setNewAccessDisplay(!temp)
		setRemoveDisplay(false)
	}

	const addNewAccessLevel = () => {
		if (newAccessLevel.toLowerCase() !== 'super') {
			let temp = levelsObjects, duplicate = false
			temp.forEach(obj => {
				if (obj.name.toLowerCase() === newAccessLevel.toLowerCase()) duplicate = true
			})
			if (!duplicate) {
				let obj = { name: newAccessLevel.charAt(0).toUpperCase() + newAccessLevel.substr(1), access: [] }
				temp.push(obj)
				setNewAccessLevel('')
				setNewAccessDisplay(false)
				setActive(obj)
				setUpdatesMade(true)
			} else {
				window.alert(`It looks like you already have a "${newAccessLevel}" access level.`)
			}
		} else {
			window.alert('Sorry, but you cannot override the existing "super" access level.')
		}
	}

	const toggleRemove = () => {
		let temp = removeDisplay
		setRemoveDisplay(!temp)
		setNewAccessDisplay(false)
	}

	const removeAccessLevel = e => {
		if (window.confirm(`Are you sure that you want to remove the "${e.target.value}" access level? All users currently assigned to this level will be set to "Pending".`)) {

			setLoading(true);
			(async () => {

				// Update levels on page
				let temp = levelsObjects, index = false
				temp.forEach((obj, i) => {
					if (obj.name === e.target.value) index = i
				})
				temp.splice(index, 1)
				setLevelsObjects(temp)

				// Update users with level on page
				removeLevelsFromUsers(e.target.value)

				await Submit(window.location.pathname + '/remove-level', { name: e.target.value })
				setLoading(false)
			})()
		}
	}

	return (
		<div className='levels'>
			<h6>Access Levels
				<span className='actions'>
					<span onClick={() => toggleNew()}><i class="fas fa-plus"></i>Add</span>
					<span onClick={() => toggleRemove()}><i class="fas fa-minus"></i>Remove</span>
				</span>
			</h6>
			{newAccessDisplay &&
				<div className='new-access'>
					<input placeholder='Name of new level' value={newAccessLevel} onChange={e => setNewAccessLevel(e.target.value)} />
					<input type='submit' value='Add Level' onClick={() => addNewAccessLevel()} />
				</div>
			}
			{removeDisplay &&
				<div className='remove-access'>
					<select value='' onChange={e => removeAccessLevel(e)}>
						<option value=''>Select Level to Remove</option>
						{levelsObjects.map((level, i) => {
							if (level.name.toLowerCase() !== 'admin') {
								return <option value={level.name}>{level.name}</option>
							} else return null
						})}
					</select>
				</div>
			}
			<select value={active.name} onChange={e => setActiveLevel(e.target.value)}>
				{levelsObjects.map((level, i) => {
					return <option value={level.name}>{level.name}</option>
				})}
			</select>
			<div className='dashboard-blocks'>
				{blocks && blocks.map((block, i) => {
					return <div className={(block.active || active.name === 'Admin') ? 'dash active': 'dash'} key={i} onClick={() => addLevel(block.name)}>
						{active.name === 'Admin' ? <i class="fas fa-lock"></i> : <i className="fas fa-check"></i>}
						<p>{block.name}</p>
					</div>
				})}
				<p className={updatesMade ? 'save active' : 'save'} onClick={() => save()}>Save Updates</p>
			</div>
		</div>
	)
}