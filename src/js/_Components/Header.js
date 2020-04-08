import React from 'react';
import Logo from '../_Components/Logo'
import NavLinks from '../_Components/NavLinks'

import MobileNavToggle from '../_Components/MobileNavToggle'
import MobileNav from '../_Components/MobileNav'

export default () => (
	<header>
		<div className='header-container'>
			<Logo />
			<NavLinks />
			<MobileNavToggle />
			<MobileNav />
		</div>
	</header>
)