const MAIN_SITE = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_API : process.env.REACT_APP_API_DEV
const API_PATH = MAIN_SITE + '/admin'
const API_IMAGE_PATH = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_API + '/static/images/' : process.env.REACT_APP_API_DEV + '/static/images/'

export { MAIN_SITE, API_PATH, API_IMAGE_PATH }