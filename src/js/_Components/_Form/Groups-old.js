import React from 'react'

export default ({ data, drag, dragover, dropGroup, deleteGroup, handleChange }) => {

	return (
		<div className='form-inputs'>
			<p className='header'>Form Inputs</p>
			<div className='form-groups'>
				{data[0].groups.map((group,i) => {
					return (
						<div className={'group group-' + i + ((i === data[0].groups.length - 1) ? ' group-submit' : '')} key={group.id} data-id={group.id} onDragStart={(e) => drag(e,i)} onDragOver={(e) => dragover(e)} onDrop={(e) => dropGroup(e,i)} draggable={(i === data[0].groups.length - 1) ? "false" : "true"}>
							{(i !== data[0].groups.length - 1) && <i className="fas fa-grip-lines lines"></i>}
							{group.inputs.map((input, j) => {
								return (
									<div className='input' key={input.id} data-id={input.id} data-type={input.type} data-label={input.label} data-required={input.required} data-placeholder={input.placeholder} data-options={input.options} data-payment-value={input.paymentValue} data-payment-value-link={input.paymentValueLink} data-text={input.text} style={{width: 'calc(' + (100 / group.inputs.length) + '% - ' + ((group.inputs.length > 1) ? '10px' : '0px)')}}>
										<p>{input.type}</p>
										{input.hasOwnProperty('label') &&
											<React.Fragment>
												<label>Label:</label>
												<input className='label-input' type='text' defaultValue={input.label} onChange={handleChange} />
											</React.Fragment>
										}
										{input.hasOwnProperty('options') &&
											<React.Fragment>
												<label>Options:</label>
												<input className='options-input' type='text' defaultValue={input.options} onChange={handleChange} />
											</React.Fragment>
										}
										{input.hasOwnProperty('placeholder') &&
											<React.Fragment>
												<label>Placeholder:</label>
												<input className='placeholder-input' type='text' defaultValue={input.placeholder} onChange={handleChange} />
											</React.Fragment>
										}
										{input.hasOwnProperty('required') &&
											<React.Fragment>
												<label>Required:</label>
												<input className='required-input' type='checkbox' defaultChecked={(input.required === 'true') ? true : false} onChange={handleChange} />
											</React.Fragment>
										}
										{input.hasOwnProperty('paymentValue') &&
											<React.Fragment>
												<label>Value:</label>
												<input className='payment-value-input' type='text' defaultValue={input.paymentValue} onChange={handleChange} placeholder="Leave at 0 if value to be linked to another input" />
											</React.Fragment>
										}
										{input.hasOwnProperty('paymentValueLink') &&
											<React.Fragment>
												<label>Value Link:</label>
												<input className='payment-value-link-input' type='text' defaultValue={input.paymentValueLink} onChange={handleChange} placeholder="Name of element to get value from" />
											</React.Fragment>
										}
										{input.hasOwnProperty('text') &&
											<React.Fragment>
												<label>Text:</label>
												<input className='text-input' type='text' defaultValue={input.text} onChange={handleChange} placeholder="The text to display here." />
											</React.Fragment>
										}
									</div>
								)
							})}
							{i !== data[0].groups.length - 1 &&
								<i className="fas fa-times delete" onClick={() => deleteGroup(i)}></i>
							}
						</div>
					)
				})}
			</div>
		</div>
	)
}