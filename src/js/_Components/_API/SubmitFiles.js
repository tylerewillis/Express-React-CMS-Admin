export default async (url, data, method='POST') => {
	const api = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API : process.env.REACT_APP_API_DEV
  const response = await fetch(api + url, {
    method: method,
    body: data
  });
  const body = await response.json();
  return body
}