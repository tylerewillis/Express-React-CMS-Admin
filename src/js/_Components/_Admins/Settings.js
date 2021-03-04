import React from 'react'
import NewAdmin from './New'
import LevelsUI from './Levels'

export default ({ emails, levels, dashboardBlocks, setLoading, addUser, removeLevelsFromUsers }) => {

	return (
		<div className='settings'>
			<NewAdmin emails={emails} levels={levels} setLoading={setLoading} addUser={addUser} />
			<LevelsUI levels={levels} dashboardBlocks={dashboardBlocks} setLoading={setLoading} removeLevelsFromUsers={removeLevelsFromUsers} />
		</div>
	)
}