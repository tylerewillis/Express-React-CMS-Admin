import React from 'react';
import { API_IMAGE_PATH } from './_Config'
import { useCookies } from 'react-cookie'

const Footer = React.memo(({ page }) => {

	const [ cookies, setCookie ] = useCookies(['signedIn']) // eslint-disable-line

  return (
    <div className='admin-footer'>
			<img src={API_IMAGE_PATH + 'ma-vertical-logo-blue-peach.png'} alt='Mullin/Ashley logo' />
		</div>
  )
})

export default Footer