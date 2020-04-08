import React from 'react';
import { Helmet } from "react-helmet";

export default () => {
  return (
    <Helmet>
      <link href='https://fonts.googleapis.com/css?family=Work+Sans:400,500,700' rel='stylesheet' />
      <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css' integrity='sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay' crossOrigin='anonymous' />
      <link rel="icon" href="/media/favicon.ico" type="image/x-icon" />
      <link rel="shortcut icon" href="/static/media/favicon.ico" type="image/x-icon" />
    </Helmet>
  )
}