import React, { useState } from 'react'

export default () => {

	const [ display, setDisplay ] = useState('none')

	const handleClick = () => {
		setDisplay((display === 'none') ? 'block' : 'none')
	}

	return (
		<div className='acb-shortcodes'>
			<p className='acbs-header' onClick={handleClick}>Shortcodes can be inserted for advanced functionality.
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"/></svg>
			</p>
			<div className='acb-sc-list' style={{'display': display}}>
				{/********************/}
				<div className='sc'>
					<p className='sc-label'>Image</p>
					<input type='text' readOnly value='[image source="" alt="" width="" shadow="" position=""]' />
					<p className='sc-desc'>Add an image to a post with the following options:</p>
					<hr />
					<div className='options'>
						<p><strong>Source</strong>: <em>(required)</em> The path of the image. Go to <a href='/media' target='_blank'>Media</a> and click on an image to copy its path.</p>
						<p><strong>Alt</strong>: <em>(optional)</em> Add an alternative description tag of the image for the visually impaired.</p>
						<p><strong>Width</strong> <em>(optional)</em> Set the width percentage of the image. If not set, the width will be the maximum width of the original image.</p>
						<p><strong>Shadow</strong> <em>(optional)</em> Add a drop shadow to the image by inputting "yes". If not set, there will be no drop shadow added.</p>
						<p><strong>Position</strong> <em>(optional)</em> Adjust the position of the image - left, center, or right. If not set, the image will be centered.</p>
					</div>
				</div>
			</div>
			<p className='acbs-rules' style={{'display': display}}>Rules: Only the required options need to be present in the shortcode - the others can be removed entirely. 1 space should be present between the shortcode name and each option. Double-quotes need to be used to contain the values inside of the options.</p>
		</div>
	)
}