import React from 'react';
import { MAIN_SITE } from './_Config'
import { useCookies } from 'react-cookie'

const Header = React.memo(({ page }) => {

	const [ cookies, setCookie ] = useCookies(['signedIn']) // eslint-disable-line

  return (
    <div className='admin-header'>
  		<div className='container'>
      	<div className='section'>
      		<p className='main-site'>
		      	<a href={MAIN_SITE}>
		      		<i class="fas fa-reply"></i>
		      		<span>Go to Website</span>
		      	</a>
	      	</p>
	      	<span className='divider'>|</span>
	      	{cookies.name &&
	      		<React.Fragment>
	      			<p>Hi, {cookies.name} 🙂</p>
	      			<span className='divider'>|</span>
	      		</React.Fragment>
	      	}
	      	<p className='breadcrumbs' dangerouslySetInnerHTML={{ __html: page.breadcrumbs }} />
		    </div>
		    <div className='section'>
		    	<a href='/resources'>
		    		<i className="far fa-file-alt"></i>
		    		<span>Resources</span>
		    	</a>
		    	<a href='mailto:web@mullinashley.com'>
		    		<i className="far fa-comment"></i>
		    		<span>Support</span>
		    	</a>
		    	<a href='/signout'>
		    		<i className="fas fa-sign-out-alt"></i>
		    		<span>Sign Out</span>
		    	</a>
		    </div>
		  </div>
    </div>
  )
})

export default Header