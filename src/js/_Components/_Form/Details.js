import React, { useState, useEffect } from 'react'
import Text from './Text'

export default ({ data, handleDetailsChange }) => {

	const [ detailsActive, setDetailsActive ] = useState(false)

	const toggleDetails = () => {
		setDetailsActive(!detailsActive)
	}

	useEffect(() => {
		if (window.location.href.indexOf('new=') > -1) setDetailsActive(true)
	},[])

	return (
		<React.Fragment>
			<div className='form-details-header' onClick={() => toggleDetails()}>
        <p>Form Details</p>
        <svg style={{'transform': detailsActive ? 'rotate(180deg)' : 'none'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"/></svg>
      </div>
			<div className='block' style={{'display': detailsActive ? 'block' : 'none'}}>
				<div className='form-details'>
					{data[0].details.map((det,i) => {
						return (
							<div className={'detail detail-' + det.name.replace(/ /g, '-').toLowerCase()} key={i} data-options={(det.options) ? det.options : ''}>
								<h2>{det.name}</h2>
								<p>{det.description}</p>
								{det.type === 'plain-text' &&
									<input type='text' defaultValue={det.value} onChange={handleDetailsChange} />
								}
								{det.type === 'select' &&
									<select defaultValue={det.value} onChange={handleDetailsChange}>
										{det.options.split(',').map((opt,j) => {
											return <option value={opt} key={j}>{opt[0].toUpperCase() + opt.substr(1)}</option>
										})}
									</select>
								}
								{det.type === 'text' &&
									<Text value={det.value} handleDetailsChange={handleDetailsChange} />
								}
							</div>
						)
					})}
				</div>
			</div>
		</React.Fragment>
	)
}