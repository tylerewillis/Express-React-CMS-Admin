// Get API paths
var MAIN_SITE = ''
if (process.env.NODE_ENV === 'production') {
	var matches = window.location.href.match(/^http?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i) //eslint-disable-line
	MAIN_SITE = matches && 'http://' + matches[1]
} else MAIN_SITE = 'http://localhost:4000'

const API_PATH = MAIN_SITE + '/admin'
const API_IMAGE_PATH = MAIN_SITE + '/static/images/'

export { MAIN_SITE, API_PATH, API_IMAGE_PATH }