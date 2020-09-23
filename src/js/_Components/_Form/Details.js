import React from 'react'
import Text from './Text'

export default ({ data, handleDetailsChange }) => {

	return (
		<div className='block'>
			<h1>Form: {data[0].details[0].value}</h1>
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
	)
}