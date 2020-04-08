const API_PATH = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_API : process.env.REACT_APP_API_DEV
const API_IMAGE_PATH = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_API + '/static/images/' : process.env.REACT_APP_API_DEV + '/static/images/'

export { API_PATH, API_IMAGE_PATH }