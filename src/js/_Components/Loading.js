import React from 'react';
import { API_IMAGE_PATH } from './_Config'

export default () => {
  return (
    <div className='loading'>
      <img src={API_IMAGE_PATH + 'spinner.gif'} alt='Loading spinner' />
    </div>
  )
}