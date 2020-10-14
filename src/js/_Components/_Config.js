// Get API paths
var MAIN_SITE = ''
if (process.env.NODE_ENV === 'production') MAIN_SITE = 'http://api.mullinashley.com'
else MAIN_SITE = 'http://localhost:5000'

const API_PATH = MAIN_SITE + '/admin'
const API_IMAGE_PATH = MAIN_SITE + '/static/images/'

export { MAIN_SITE, API_PATH, API_IMAGE_PATH }