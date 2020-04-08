import React from 'react';

export default () => {

	function openMobileNav() {
		const mobileNav = document.querySelector('.mobile-nav-container')
		mobileNav.classList.toggle('mobile-nav-container-open')

		const mobileLink = document.querySelector('.mn-button')
		mobileLink.classList.toggle('mn-button-rvs')
	}

  return (
    <div className='mn-button' onClick={openMobileNav}>
    	<span></span>
    	<span></span>
    	<span></span>
    </div>
  )
}