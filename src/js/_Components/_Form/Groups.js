import React, { useState, useEffect } from 'react'
import Buttons from './Buttons'

export default ({ data, drag, dragover, dropGroup, deleteGroup, handleChange, inputList, addInput }) => {

	const [ paymentFixed, setPaymentFixed ] = useState(false)

	useEffect(() => {
		data[0].groups.forEach(group => {
			group.inputs.forEach(input => {
				if (input.type === 'payment' && (input.paymentValue !== '0' && input.paymentValue !== '')) setPaymentFixed(true)
			})
		})
	},[]) //eslint-disable-line

	const togglePaymentFixed = () => {
		if (paymentFixed) {
			alert('Be sure to set the fixed amount due to 0 or leave it empty if wanting to populate the amount from another input field. Otherwise, it will pull the set fixed amount.')
		}
		setPaymentFixed(!paymentFixed)
	}

	return (
		<div className='form-inputs'>
			<p className='header'>Form Inputs</p>
			<Buttons addInput={addInput} />
			<div className='form-groups'>
				{data[0].groups.map((group,i) => {
					return (
						<div className={'group group-' + i + ((i === data[0].groups.length - 1) ? ' group-submit' : ` group-${group.inputs[0].type}`)} key={group.id} data-id={group.id} onDragStart={(e) => drag(e,i)} onDragOver={(e) => dragover(e)} onDrop={(e) => dropGroup(e,i)} draggable={(i === data[0].groups.length - 1) ? "false" : "true"}>
							{(i !== data[0].groups.length - 1) && <i className="fas fa-grip-lines lines"></i>}
							{group.inputs.map((input, j) => {
								return (
									<div className='input' key={input.id} data-id={input.id} data-type={input.type} data-label={input.label} data-required={input.required} data-placeholder={input.placeholder} data-options={input.options} data-payment-value={input.paymentValue} data-payment-value-link={input.paymentValueLink} data-text={input.text} style={{width: 'calc(' + (100 / group.inputs.length) + '% - ' + ((group.inputs.length > 1) ? '10px' : '0px)')}}>
										{input.hasOwnProperty('label') && 
											<React.Fragment>
												<input className='label-input' defaultValue={input.label} onChange={handleChange} />
												{ input.hasOwnProperty('required') && input.type !== 'checkbox' &&
													<label className='required-label'>Required
														<input className='required-input' type='checkbox' defaultChecked={(input.required === 'true') ? true : false} onChange={handleChange} />
													</label>
												}
											</React.Fragment>
										}
										{input.type === 'input' &&
											<input className='placeholder-input' type='text' defaultValue={input.placeholder} onChange={handleChange} />
										}
										{input.type === 'textarea' &&
											<textarea className='placeholder-input' type='text' defaultValue={input.placeholder} onChange={handleChange} />
										}
										{input.type === 'checkbox' &&
											<React.Fragment>
												<input type='checkbox' />
												{ input.hasOwnProperty('required') &&
													<label className='required-label'>Required
														<input className='required-input' type='checkbox' defaultChecked={(input.required === 'true') ? true : false} onChange={handleChange} />
													</label>
												}
											</React.Fragment>
										}
										{input.type === 'select' &&
											<input className='options-input' type='text' defaultValue={input.options} onChange={handleChange} />
										}
										{input.type === 'text-block' &&
											<textarea className='text-input' type='text' defaultValue={input.text} onChange={handleChange} placeholder="Text/HTML Block" />
										}
										{input.type === 'payment' &&
											<React.Fragment>
												<p>Payment Form</p>
												<label>Fixed Value:
													<select value={paymentFixed} onChange={() => togglePaymentFixed()}>
														<option value={true}>Yes</option>
														<option value={false}>No</option>
													</select>
												</label>
												{paymentFixed &&
													<label>Amount Due:
														<input type='number' defaultValue={input.paymentValue} placeholder='Value' className='payment-value-input' onChange={handleChange} />
													</label>
												}
												{!paymentFixed &&
													<label>Get Amount from Input:
														<select value={input.paymentValueLink} className='payment-value-link-input' onChange={handleChange}>
															{inputList.map((item, j) => {
																return <option value={item}>{item}</option>
															})}
														</select>
													</label>
												}
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