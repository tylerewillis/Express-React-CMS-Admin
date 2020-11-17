import React from 'react'

export default ({ addInput }) => {

	return (
		<div className='form-buttons'>
			<p className='header'>Add:</p>
			<p className='button' onClick={() => addInput('input')}>Input<i className="fas fa-long-arrow-alt-right"></i></p>
			<p className='button' onClick={() => addInput('textarea')}>Textarea<i className="fas fa-long-arrow-alt-right"></i></p>
			<p className='button' onClick={() => addInput('select')}>Select<i className="fas fa-long-arrow-alt-right"></i></p>
			<p className='button' onClick={() => addInput('checkbox')}>Checkbox<i className="fas fa-long-arrow-alt-right"></i></p>
			<p className='button' onClick={() => addInput('double')}>Double<i className="fas fa-long-arrow-alt-right"></i></p>
			<p className='button' onClick={() => addInput('payment')}>Payment<i className="fas fa-long-arrow-alt-right"></i></p>
			<p className='button' onClick={() => addInput('text-block')}>Text Block<i className="fas fa-long-arrow-alt-right"></i></p>
		</div>
	)
}