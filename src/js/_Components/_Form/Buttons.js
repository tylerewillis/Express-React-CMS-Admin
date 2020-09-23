import React from 'react'

export default ({ addInput }) => {

	return (
		<div className='form-buttons'>
			<p>Add:</p>
			<p className='button' onClick={() => addInput('input')}>Input</p>
			<p className='button' onClick={() => addInput('textarea')}>Textarea</p>
			<p className='button' onClick={() => addInput('select')}>Select</p>
			<p className='button' onClick={() => addInput('checkbox')}>Checkbox</p>
			<p className='button' onClick={() => addInput('double')}>Double</p>
			<p className='button' onClick={() => addInput('payment')}>Payment</p>
			<p className='button' onClick={() => addInput('text-block')}>Text Block</p>
		</div>
	)
}