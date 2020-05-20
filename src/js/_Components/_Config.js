// Get API paths
var MAIN_SITE = ''
if (process.env.NODE_ENV === 'production') {
	var matches = window.location.href.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i) //eslint-disable-line
	MAIN_SITE = matches && 'https://' + matches[1].substr(6)
} else MAIN_SITE = 'http://localhost:4000'

const API_PATH = MAIN_SITE + '/admin'
const API_IMAGE_PATH = MAIN_SITE + '/static/images/'

export { MAIN_SITE, API_PATH, API_IMAGE_PATH }