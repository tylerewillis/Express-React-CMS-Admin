import React, { useState } from 'react'

export default () => {

	const [ display, setDisplay ] = useState('none')

	const handleClick = () => {
		setDisplay((display === 'none') ? 'block' : 'none')
	}

	return (
		<div className='acb-shortcodes'>
			<p className='acbs-header' onClick={handleClick}>Shortcodes can be inserted for additional formatting.
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"/></svg>
			</p>
			<div className='acb-sc-list' style={{'display': display}}>
				{/********************/}
				<div className='sc'>
					<p className='sc-label'>Image</p>
					<input type='text' readOnly value='[image source="" alt="" caption="" width="" position=""]' />
					<p className='sc-desc'>Add an image to a post with the following options:</p>
					<hr />
					<div className='options'>
						<p><strong>Source</strong>: <em>(required)</em> The path of the image. Go to <a href='/media' target='_blank'>Media</a> and click on an image to copy its path.</p>
						<p><strong>Alt</strong>: <em>(optional)</em> Add an alternative description tag of the image for the visually impaired. Only seen by screen reader software, not displayed visually on page.</p>
						<p><strong>Caption</strong> <em>(optional)</em> Add a caption to the image. Typically seen in small text beneath the image.</p>
						<p><strong>Width</strong> <em>(optional)</em> Set the width percentage of the image. If not set, the width will be the maximum width of the original image.</p>
						<p><strong>Position</strong> <em>(optional)</em> Adjust the position of the image - left, center, or right. If not set, the image will be centered.</p>
					</div>
				</div>
				{/********************/}
				<div className='sc'>
					<p className='sc-label'>Image Grid</p>
					<input type='text' readOnly value='[image-grid source="" width="" margin=""]' />
					<p className='sc-desc'>Create a grid of images to a post with the following options:</p>
					<hr />
					<div className='options'>
						<p><strong>Source</strong>: <em>(required)</em> The path of the image. Each additional source="" will input an additional image. Go to <a href='/media' target='_blank'>Media</a> and click on an image to copy its path.</p>
						<p><strong>Width</strong>: <em>(optional)</em> The width of the grid in terms of images. Input 1, 2, 3, or 4. If not set, the grid will be 2 images wide.</p>
						<p><strong>Margin</strong>: <em>(optional)</em> The margin or space between each image in terms of pixels. Input 0 through 100. 0 would mean no margin. If not set, the margin will default to 5.</p>
					</div>
				</div>
				{/********************/}
				<div className='sc'>
					<p className='sc-label'>Image with Text</p>
					<input type='text' readOnly value='[image-text source="" text="" width="" sub="" link=""]' />
					<p className='sc-desc'>Add an image next to text with the following options:</p>
					<hr />
					<div className='options'>
						<p><strong>Source</strong>: <em>(required)</em> The path of the image. Go to <a href='/media' target='_blank'>Media</a> and click on an image to copy its path.</p>
						<p><strong>Text</strong>: <em>(required)</em> The text to appear next to the image.</p>
						<p><strong>Width</strong>: <em>(optional)</em> The width of the image in the container. Input percentage (25-75 recommended). If not set, the image width will be 50.</p>
						<p><strong>Sub</strong>: <em>(optional)</em> The sub-text to appear next to the image below the larger main text.</p>
						<p><strong>Link</strong>: <em>(optional)</em> Insert a URL to link the main next to another webpage.</p>
					</div>
				</div>
				{/********************/}
				<div className='sc'>
					<p className='sc-label'>Image Slideshow</p>
					<input type='text' readOnly value='[image-slideshow source="" source=""]' />
					<p className='sc-desc'>Add an image slideshow with the following options:</p>
					<hr />
					<div className='options'>
						<p><strong>Source</strong>: <em>(required)</em> The paths of each image. Go to <a href='/media' target='_blank'>Media</a> and click on an image to copy its path. Add additional sources for additional images.</p>
					</div>
				</div>
				{/********************/}
				<div className='sc'>
					<p className='sc-label'>Quote</p>
					<input type='text' readOnly value='[quote text="" author="" link=""]' />
					<p className='sc-desc'>Add a quote with the following options:</p>
					<hr />
					<div className='options'>
						<p><strong>Text</strong>: <em>(required)</em> The quote text.</p>
						<p><strong>Author</strong>: <em>(optional)</em> The name of the author. If not set, only the quote text will be displayed.</p>
						<p><strong>Link</strong> <em>(optional)</em> The link for the author/quote. If not set, the author's name will be plain text.</p>
					</div>
				</div>
				{/********************/}
				<div className='sc'>
					<p className='sc-label'>Featured Text</p>
					<input type='text' readOnly value='[featured-text text=""]' />
					<p className='sc-desc'>Add a featured text callout with the following options:</p>
					<hr />
					<div className='options'>
						<p><strong>Text</strong>: <em>(required)</em> The featured text.</p>
					</div>
				</div>
				{/********************/}
				<div className='sc'>
					<p className='sc-label'>Question-Answer</p>
					<input type='text' readOnly value='[question-answer question="" answer=""]' />
					<p className='sc-desc'>Add a question and answer block with the following options:</p>
					<hr />
					<div className='options'>
						<p><strong>Question</strong>: <em>(required)</em> The question text.</p>
						<p><strong>Answer</strong>: <em>(required)</em> The answer text.</p>
					</div>
				</div>
			</div>
			<p className='acbs-rules' style={{'display': display}}>Rules: Only the required options need to be present in the shortcode - the others can be removed entirely. 1 space should be present between the shortcode name and each option. Double-quotes need to be used to contain the values inside of the options.</p>
		</div>
	)
}