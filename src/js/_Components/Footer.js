import React from 'react';
import { useCookies } from 'react-cookie'
import Img from '../../img/ma_vertical_logo_blue_peach.png'

const Footer = React.memo(({ page }) => {

	const [ cookies, setCookie ] = useCookies(['signedIn']) // eslint-disable-line

  return (
    <div className='admin-footer'>
			<img src={Img} alt='Mullin/Ashley logo' />
		</div>
  )
})

export default Footer