import React from 'react';
import { MAIN_SITE } from './_Config'
import { useCookies } from 'react-cookie'

const Header = React.memo(({ page, darkMode, setDarkMode }) => {

	const [ cookies, setCookie ] = useCookies(['signedIn','darkMode']) // eslint-disable-line

	const toggleDarkMode = () => {
		let expiresDate = new Date()
		expiresDate.setFullYear(expiresDate.getFullYear() + 1)
		if (darkMode && darkMode === 'yes') {
			setCookie('darkMode', 'no', { path: '/', expires: expiresDate })
			setDarkMode('no')
		} else {
			setCookie('darkMode', 'yes', { path: '/', expires: expiresDate })
			setDarkMode('yes')
		}
	}

  return (
    <div className='admin-header'>
  		<div className='container'>
      	<div className='section'>
      		<p className='main-site'>
		      	<a href={MAIN_SITE}>
		      		<i className="fas fa-reply"></i>
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
		    	<div className='dark-mode'>
		    		<p className={(!darkMode || (darkMode && darkMode === 'no')) ? 'active' : '' } onClick={() => toggleDarkMode()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"/></svg></p>
		    		<p className={(darkMode && darkMode === 'yes') ? 'active' : '' } onClick={() => toggleDarkMode()}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"/></svg></p>
		    	</div>
		    </div>
		  </div>
    </div>
  )
})

export default Header