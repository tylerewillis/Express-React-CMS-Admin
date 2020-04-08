# React-CMS

React-CMS is a client content management system and front-end website template for building websites with React.

This is purely the client-facing package and expects to be coupled with [React-CMS-API](https://github.com/tylerewillis/React-CMS-API) which is an Express API for data- and asset-management.

The following technologies and libraries are included in this repository:
* Webpack
* Redux
* React Router
* Cookies
* Dropzone
* Quill

## Get Started

Clone this repository along with the [React-CMS-API](https://github.com/tylerewillis/React-CMS-API) repository to your local machine and open 2 terminal windows.

In the first, launch the React application by navigating to your project folder and entering -

```
npm start // or yarn start
```

This will launch your React application in port 3000.

In the second terminal window, launch the Express API by navigating to your project folder and entering -

```
nodemon // or npm start
```

This will launch your Express API in port 4000.

Now make and save changes in your client- and server-files and refresh your project in the browser.

## Deployment Checklist

Before launching the application in a production environment, be sure to update/commit the following:

* Export the local database and update to the server. Capture the new credentials and update the API's config file.
* In the React package, update the .env file with the url of the production API.
* In the Express API package, update the middleware 'Headers' file with the url of the React production application for CORS.
* Create and place an .htaccess file in the build folder of the React application and insert the following (needed for routing):

```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

## New Project To-Dos

When building a new application using this repository, be sure to do/update the following:

* Update the favicon in the /public directory
* Update the meta details in /public/manifest.json
* Update the meta details in /public/index.html

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).